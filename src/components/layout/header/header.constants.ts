import { SocialMedia } from "@/types";

import vk from '@/assets/images/vk-icon.svg.webp';
import max from '@/assets/images/max-icon.webp';
import telegram from '@/assets/images/telegram-icon.svg.webp';

export const listSocialMedia: Array<SocialMedia> = [
    { 
        link: 'https://max.ru/join/qjlp2slhu-A5CQlt1N5HghS-_o_Z6sQ3MP1cm7z_ipo',
        imageLink: max,
        alt: 'Макс (Max) канал магазина Твои цветы 21'
    },
    { 
        link: 'https://t.me/your_flowers_21',
        imageLink: telegram,
        alt: 'Телеграм канал магазина Твои цветы 21'
    },
    { 
        link: 'https://vk.com/your_flowers_21',
        imageLink: vk,
        alt: 'Страничка Вконтакте магазина Твои цветы 21'
    },
]