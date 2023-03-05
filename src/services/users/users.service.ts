import catchErrorsFunctions from '../../common/utils/catchErrorsFunction';
import UserModel from '../../model/User.model';
import { UserModelInterface, UserServiceInterface } from '../../interfaces/users/userModel.interface';
import { User } from '../../interfaces/users/User.interface';
import { InvalidArgumentError } from '../err/Errors';

class UserService implements UserServiceInterface {
    private readonly userModel: UserModelInterface;
    constructor(userModel: UserModelInterface) {
        this.userModel = userModel;
    }

    async findAll() {
        try {
            return await this.userModel.findAll();
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    async findById(id: string) {
        try {
            return await this.userModel.findUserById(id);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    async store(user: User) {
        try {
            const errors = [];

            const emailAlreadyInUse = await this.findEmail(user.email);

            if (emailAlreadyInUse) {
                errors.push('Error: Email Already in use');
            }

            if (errors.length) {
                throw new InvalidArgumentError(JSON.stringify(errors));
            }

            const saveUserDb = await this.userModel.store(user);

            return saveUserDb;
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    private async findEmail(email: string) {
        try {
            return await this.userModel.findByEmail(email);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new UserService(UserModel);
