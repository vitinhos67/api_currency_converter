import { User } from '../interfaces/users/User.interface';
import axios from 'axios';

import { TransactionsDTO } from '../services/transactions/Transactions.service';
import catchErrorsFunctions from '../common/utils/catchErrorsFunction';

class HttpRequestAPI {
    private readonly base_url: string;
    private readonly access_key: string;
    constructor() {
        this.base_url = process.env.BASE_URL_API || '';
        this.access_key = process.env.ACCESS_KEY || '';
    }

    async convert(currencyConvert: TransactionsDTO<User>) {
        try {
            const options = {
                method: 'GET',
                url: 'https://api.apilayer.com/exchangerates_data/convert',
                params: {
                    to: currencyConvert.data.to,
                    from: currencyConvert.data.from,
                    amount: currencyConvert.data.amount,
                },
                headers: {
                    apikey: this.access_key,
                },
            };
            const data = await axios(options);

            return data.data;
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new HttpRequestAPI();
