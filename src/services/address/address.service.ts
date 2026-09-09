import axios from "axios"

import { SearchAddressParams, SearchAddressResponse } from "./address.interface"

export const AddressService = {
    async searchAddress(params: SearchAddressParams) {
        const { data } = await axios.get<SearchAddressResponse>('https://suggest-maps.yandex.ru/v1/suggest', {
            params: {
                apikey: 'beefb397-21cb-401f-9560-23e0a245ba6b',
                strict_bounds: '1',
                countries: 'ru',
                ...params,
            },
        });

        return data;
    }
}