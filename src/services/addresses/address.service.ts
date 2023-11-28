import axios from "axios"

export const AddressService = {
    async getAddresses(query: { query: string }) {
        const { data } = await axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', query, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${process.env.DADATA_ACCESS_KEY}`,
                'X-Secret': process.env.DADATA_SECRET_KEY
            },
        })

        if (data) return data.suggestions
    }
}