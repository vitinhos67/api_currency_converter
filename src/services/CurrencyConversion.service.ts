import axios, { AxiosInstance } from 'axios';

export interface ConvertInterface {
    from: string;
    to: string;
    amount: string;
}

class CurrentyConversionService {
    private readonly http: AxiosInstance;
    private readonly base_url: string;
    private readonly access_key: string;
    constructor(http: AxiosInstance) {
        this.http = http;
        this.base_url = process.env.BASE_URL_API || '';
        this.access_key = process.env.ACCESS_KEY || '';
    }

    async convertCurrenty(convertData: ConvertInterface) {
        const options = {
            method: 'GET',
            url: 'https://api.apilayer.com/exchangerates_data/convert',
            params: {
                to: convertData.to,
                from: convertData.from,
                amount: convertData.amount,
            },
            headers: {
                apikey: this.access_key,
            },
        };

        const data = this.http
            .request(options)
            .then((response: { data: any }) => response.data)
            .catch((error: any) => console.log(error));

        const resolvedata = await data;

        return resolvedata;
    }
}

export default new CurrentyConversionService(axios);
