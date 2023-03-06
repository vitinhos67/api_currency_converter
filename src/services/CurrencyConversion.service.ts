import { User } from '../interfaces/users/User.interface';
import TransactionsModel, { TransactionsInterface } from '../model/Transactions.model';
import HttpRequestAPI from '../api/request.api';
import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
export interface ConvertInterface<T> {
    data: {
        from: string;
        to: string;
        amount: string;
    };
    user: T;
}

class TransactionsService {
    async addTransaction(currencyConvert: ConvertInterface<User>) {
        try {
            const data = await HttpRequestAPI.convert(currencyConvert);

            const values: TransactionsInterface = {
                rate: data.info.rate,
                from: data.query.from,
                to: data.query.to,
                id_user: currencyConvert.user.id || '',
                result: data.result,
                created_at: data.date,
                amount_from: data.query.amount,
            };

            const saveTransaction = await TransactionsModel.store(values);

            return saveTransaction;
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new TransactionsService();
