import { EnumOrderStatus } from "./enum/orderStatus.enum"

interface IOrderItem {
    quantity: number
    price: number
    productId: number
}

export interface IOrder {
    id: number
    createdAt: string
    status: EnumOrderStatus
    name: string
    phone: string
    commentary? : string
    delivery: string
    deliveryDate: string
    deliveryTime: string
    items: IOrderItem[]
}
