import mongoose, { model, Schema } from 'mongoose';
import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { ParamsDTOInterface } from '../dto/transactions/paramsSearch.interface';

export interface TransactionsInterface {
    id_user: string;
    from: string;
    to: string;
    amount_from: number;
    result: number;
    rate: number;
    created_at: string;
}

export const TransactionsSchema = new Schema({
    id_user: {
        type: mongoose.Types.ObjectId,
    },
    from: String,
    amount_from: Number,
    result: Number,
    to: String,
    rate: Number,
    created_at: String,
});

class TransactionsModel {
    private readonly Transactions = model('transactions', TransactionsSchema);

    async store(data: TransactionsInterface) {
        try {
            return await this.Transactions.create(data);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    async allTransactions(params: ParamsDTOInterface) {
        try {
            return await this.Transactions.find(params);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
    async findTransactionsFromUser(params: ParamsDTOInterface) {
        try {
            return await this.Transactions.find(params);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new TransactionsModel();
