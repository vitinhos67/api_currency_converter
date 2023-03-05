import { model, Schema } from 'mongoose';
import catchErrorsFunctions from '../common/utils/catchErrorsFunction';
import { User, UserCreateInterface } from '../interfaces/users/User.interface';
import { UserModelInterface } from '../interfaces/users/userModel.interface';
export const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

class UserModel implements UserModelInterface {
    User = model('user', UserSchema);

    async store(user: UserCreateInterface): Promise<User | void> {
        try {
            return await this.User.create(user);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
    async findByEmail(email: string): Promise<User | void | null> {
        try {
            const data = await this.User.findOne({ email });

            return data;
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
    async findUserById(id: string): Promise<User | void | null> {
        try {
            const data = await this.User.findById(id);
            return data;
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    async findAll(): Promise<User[] | void> {
        try {
            const data = await this.User.find().select('-password');

            if (data) {
                return data;
            }
        } catch (error) {
            catchErrorsFunctions(error);
        }
        return;
    }

    async deleteMany(): Promise<void> {
        try {
            await this.User.deleteMany();
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new UserModel();
