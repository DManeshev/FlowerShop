import { EnumDeliveryMethod, EnumOrderStatus } from "./enum/orderStatus.enum"

interface IOrderItem {
    quantity: number
    price: number
    productId: number
}
export interface IOrder {
    id?: number
    createdAt?: string
    status?: EnumOrderStatus
    name: string
    phone: string
    commentary?: string
    deliveryDate: string
    deliveryTime: string
    deliveryMethod: EnumDeliveryMethod
    city: string
    street: string
    houseNumber: string
    apartment: string
    items: IOrderItem[]
}