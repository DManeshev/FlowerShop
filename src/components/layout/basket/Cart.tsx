'use client'

import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";
import { useMemo, useState } from "react";

import { ICart } from "@/types/cart.interface";
import { formatPrice } from "@/lib/utils";
import { useActions } from "@/hooks/useAction";
import { useTypedSelector } from "@/hooks/useTypedSelector";

import { 
    Drawer,
    DrawerClose,
    DrawerHeader,
    DrawerFooter,
    DrawerTrigger,
    DrawerContent,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import CartCard from '@/components/ui/cards/cartCard/Card'
import EmptyBasket from "./ui/EmptyBasket";

import styles from './Cart.module.scss';

export const Cart = () => {
    const router = useRouter();
    
    const [open, setOpen] = useState<boolean>(false);

    const isDesktop: boolean = useMediaQuery('(min-width: 991px)')

	const { cart } = useTypedSelector(state => state.cart);
	const { clearCart } = useActions()

    const totalProducts: number = cart.length;

    const total: number = useMemo(() => {
        return cart.reduce((result: number, item: ICart) =>
            result + (item.product.price * item.quantity), 0)
    }, [cart]);

    const navigateToCheckout = () => {
        setOpen(false);

        router.push('/checkout');
    }

    return (
        <Drawer 
            open={open}
            onOpenChange={setOpen}
            swipeDirection={isDesktop ? 'right' : 'down'}
        >
            <DrawerTrigger
                render={
                    <button className={styles.cart__btn}>
                        <span>Корзина</span>
                        {!!totalProducts ? 
                            <Badge className={styles.cart__btn_badge}>{totalProducts}</Badge>
                            : null 
                        }
                    </button>
                }
            />

            <DrawerContent className={styles.drawer}>
                <DrawerHeader className={styles.drawer__header}>
                    <div className={styles.header}>
                        <div className="w-5 h-5 opacity-0" />
                        <h2 className={styles.header__title}>Корзина</h2>
                        <DrawerClose
                            render={
                                <button className={styles.header__close}>
                                    <span>
                                        <IoClose size={16} />
                                    </span>
                                </button>
                            }
                        />
                    </div>

                    {!!cart.length ? (
                        <button onClick={() => clearCart()} className={styles.clear}>
                            <span>Удалить все</span>
                        </button>
                    ) : null}
                </DrawerHeader>

                <div className={styles.content}>
					{!!cart.length ? (
                        <div className={styles.cards}>
                            {cart.map((item: ICart) => (
								<CartCard
                                    key={item.product.id}
                                    productCart={item}
                                    setOpen={setOpen}
                                />
                            ))}
                        </div>
                    ) : <EmptyBasket />}
                </div>

                {!!cart.length ? (
                    <DrawerFooter className={styles.drawer__footer}>
                        <div className={styles.total}>
                            <span>{formatPrice(total)}</span>
                        </div>

                        <Button
                            size="xl"
                            onClick={navigateToCheckout}
                        >
                            <span>Оформить заказ</span>    
                        </Button>
                    </DrawerFooter>
                ) : null}
            </DrawerContent>
        </Drawer>
    )
}