import mongoose, { model, Schema } from 'mongoose';
import catchErrorsFunctions from '../common/utils/catchErrorsFunction';

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

    async allTransactions() {
        try {
            return await this.Transactions.find();
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
    async findTransactionsFromUser(id: string) {
        try {
            return await this.Transactions.find({
                id_user: id,
            });
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new TransactionsModel();
