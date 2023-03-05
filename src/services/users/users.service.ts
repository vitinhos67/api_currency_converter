import catchErrorsFunctions from '../../common/utils/catchErrorsFunction';

import UserModel from '../../model/User.model';
import { UserModelInterface } from '../../interfaces/users/userModel.interface';

class UserService {
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
}

export default new UserService(UserModel);
