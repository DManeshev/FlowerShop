import { EnumDeliveryMethod, EnumOrderStatus } from "@/types";

export interface OrderForm {
    name: string;
    phone: string;
    deliveryMethod: EnumDeliveryMethod;
    deliveryDate: string;
    deliveryTime: string;
    city: string;
    street: string;
    apartment: string;

    houseNumber?: string;
    commentary?: string;
    entrance?: string;
}

export interface IOrderItem {
    quantity: number
    price: number
    productId: number
}

export interface OrderRequest extends OrderForm {
    status: EnumOrderStatus;
    items: Array<IOrderItem>;
}

export interface IOrder extends OrderRequest {
    id: number;
    createdAt: string;
}