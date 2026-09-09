export * from './enum/orderStatus.enum';
export * from './enum/productStatus.enum';

export type SelectType = {
	value: string;
	label: string;
}

export type ListType = {
	id: string
	name: string
}

export type CheckoutStepType = 'delivery' | 'payment'