import { StaticImageData } from 'next/image';

export * from './enum/orderStatus.enum';
export * from './enum/productStatus.enum';

export type SelectType = {
	value: string;
	label: string;
};

export type CheckoutStepType = 'delivery' | 'payment';

export type SocialMedia = {
	link: string;
	imageLink: StaticImageData;
	alt: string;
}

export type DashboardTabType = {
	title: string;
	link: string;
}