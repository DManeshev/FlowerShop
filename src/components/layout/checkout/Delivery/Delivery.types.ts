import { SelectType } from '@/types';
import { EnumDeliveryMethod } from "@/types/enum/orderStatus.enum";

export interface DeliveryType {
    label: string;
    value: EnumDeliveryMethod;
}

export interface DeliveryCity extends SelectType {
    coords: Array<string>;
}