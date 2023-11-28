import { IProduct } from "./product.interface";

export interface ICart {
    product: IProduct
    quantity: number
}