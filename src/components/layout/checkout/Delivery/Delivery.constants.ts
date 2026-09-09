import { SelectType } from '@/types';
import { EnumDeliveryMethod } from "@/types/enum/orderStatus.enum";
import { DeliveryType, DeliveryCity } from './Delivery.types';

export const listDeliveryType: Array<DeliveryType> = [
    { label: 'Доставка', value: EnumDeliveryMethod.delivery },
    { label: 'Самовызов', value: EnumDeliveryMethod.pickup }
]

export const generateListTimeSlots = (): Array<SelectType> => {
    const listSlots: Array<SelectType> = [];

    for (let hour = 9; hour < 21; hour++) {
        const startTime = hour.toString().padStart(2, '0') + ':00';
        const endTime = (hour + 1).toString().padStart(2, '0') + ':00';

        listSlots.push({
            label: `${startTime} - ${endTime}`,
            value: `${startTime} - ${endTime}`
        })
    }

    return listSlots;
}

export const CHOOSE_DELIVERY_TYPE_TEXT = 'Выберите вариант доставки';
export const CREATE_ORDER_TEXT = 'Оформить заказ';

export const DELIVERY_PICKUP_TIME_TEXT = 'получения заказа в магазине';
export const DELIVERY_TIME_TEXT = 'доставки';

export const listDeliveryCity: Array<DeliveryCity> = [
    {
        label: 'Чебоксары',
        value: 'Чебоксары',
        coords: ['47.25', '56.14'],
    },
    {
        label: 'Новочебоксарск',
        value: 'Новочебоксарск',
        coords: ['47.48', '56.11'],
    }
]