import { User } from '../../interfaces/users/User.interface';
import TransactionsModel, { TransactionsInterface } from '../../model/Transactions.model';
import HttpRequestAPI from '../../api/request.api';
import catchErrorsFunctions from '../../common/utils/catchErrorsFunction';
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

    async allTransactions() {
        try {
            return await TransactionsModel.allTransactions();
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    async findTransactionsFromUser(id: string) {
        try {
            return await TransactionsModel.findTransactionsFromUser(id);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new TransactionsService();
