import { User } from '../../interfaces/users/User.interface';
import TransactionsModel, { TransactionsInterface } from '../../model/Transactions.model';
import HttpRequestAPI from '../../api/request.api';
import catchErrorsFunctions from '../../common/utils/catchErrorsFunction';
import { ParamsDTOInterface } from '../../dto/transactions/paramsSearch.interface';
export interface TransactionsDTO<T> {
    data: {
        from: string;
        to: string;
        amount: string;
    };
    user: T;
}

class TransactionsService {
    async addTransaction(transactions: TransactionsDTO<User>) {
        try {
            const data = await HttpRequestAPI.convert(transactions);

            const values: TransactionsInterface = {
                rate: data.info.rate,
                from: data.query.from,
                to: data.query.to,
                id_user: transactions.user.id || '',
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

    async allTransactions(params: ParamsDTOInterface) {
        try {
            return await TransactionsModel.allTransactions(params);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    async findTransactionsFromUser(params: ParamsDTOInterface) {
        try {
            return await TransactionsModel.findTransactionsFromUser(params);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new TransactionsService();
