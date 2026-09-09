import { OrderForm } from '@/services'

export interface InitialOrderState {
    order: OrderForm;
    isOpenCheckoutDrawer: boolean;
}