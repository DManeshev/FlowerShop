'use client';

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { ICategory } from "@/types/category.interface";
import { CategoryService } from "@/services/category/category.service";

import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoClose, IoArrowBack  } from "react-icons/io5";

import styles from './Header.module.scss'

export const HeaderMenuBtn = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [titleCategory, setTitleCategory] = useState<string | null>(null);
    const [listSubcategory, setListSubcategory] = useState<Array<ICategory> | null>(null);

    const { data: listCategory } = useQuery(
		['category'],
		() => CategoryService.getAll(),
		{
			select: (data) => data.sort((a, b) => a.order - b.order)
		}
	);

    function setSubcategory(category: ICategory): void {
        setTitleCategory(category.name);
        setListSubcategory(category.subCategories);
    }

    function resetSubcategory(): void {
        setTitleCategory(null);
        setListSubcategory(null);
    }

    function openDrawer(open: boolean): void {
        if (!open && listSubcategory) resetSubcategory()

        setOpen(open)
    }
    
    return (
        <Drawer
            open={open}
            onOpenChange={openDrawer}
            showSwipeHandle
        >
            <DrawerTrigger
                nativeButton={false}
                render={
                    <div className={styles.menu}>
                        <button className={styles.menu__btn}>
                            <span><HiMenuAlt4 size={22} /></span>
                        </button>
                    </div>
                }
            />

            <DrawerContent className={styles.drawer}>
                {listSubcategory ? (
                    <DrawerHeader>
                        <div className={styles.drawer__header}>
                            <button
                                onClick={resetSubcategory}
                                className={styles.drawer__btn}
                            >
                                <span>
                                    <IoArrowBack size={16} />
                                </span>
                            </button>

                            { titleCategory && <div className={styles.drawer__title}>{titleCategory}</div> }

                            <DrawerClose
                                onClick={resetSubcategory}
                                render={
                                    <button className={styles.drawer__btn}>
                                        <span>
                                            <IoClose size={16} />
                                        </span>
                                    </button>
                                }
                            />
                        </div>
                    </DrawerHeader>
                ) : null}

                <div className={styles.drawer__content}>
                    <ul className={styles.drawer__list}>
                        {listSubcategory ? (
                            <>
                                {listSubcategory.map((item: ICategory) => (
                                    <li key={item.id} className={styles.drawer__item}>
                                        <Link href={`/category/${item.slug}`} onClick={() => openDrawer(false)}>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </>
                        ) : (
                            <>
                                {listCategory && listCategory.map((item: ICategory) => (
                                    <li
                                        key={item.id}
                                        onClick={() => setSubcategory(item)}
                                        className={styles.drawer__item}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </>
                        )}

                    </ul>
                </div>

                {/* TODO: add footer link social */}
                {/* <DrawerFooter className={styles.drawer__footer}>
                    link
                </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    )
}