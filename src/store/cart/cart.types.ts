import { IProduct } from '@/services'

export interface ICart {
    product: IProduct
    quantity: number
}

export interface InitialCartState {
	cart: Array<ICart>;
}