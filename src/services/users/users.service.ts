import catchErrorsFunctions from '../../common/utils/catchErrorsFunction';
import UserModel from '../../model/User.model';
import { UserModelInterface, UserServiceInterface } from '../../interfaces/users/userModel.interface';
import { User, UserAuthResponse, UserLoginInterface } from '../../interfaces/users/User.interface';
import { InvalidArgumentError } from '../err/Errors';
import * as bcrypt from 'bcrypt';
import jwt from '../../common/auth/jwt';

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

    async store(user: User): Promise<UserAuthResponse | void> {
        try {
            const errors = [];

            const emailAlreadyInUse = await this.findEmail(user.email);

            if (emailAlreadyInUse) {
                errors.push('Error: Email Already in use');
            }

            if (errors.length) {
                throw new InvalidArgumentError(JSON.stringify(errors));
            }

            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);

            const cryptPassword = await bcrypt.hash(user.password, salt);
            user.password = cryptPassword;

            const userdb = await this.userModel.store(user);

            if (userdb.id) {
                const access_token = jwt.access_token(userdb.id);
                const reflesh_token = jwt.reflesh_token(userdb.id);

                return {
                    id: userdb.id,
                    username: userdb.username,
                    email: userdb.email,
                    created_at: userdb.created_at,
                    access_token,
                    reflesh_token,
                };
            }

            return;
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    async login(user: UserLoginInterface): Promise<UserAuthResponse | void> {
        try {
            const userdb = await this.userModel.findByEmail(user.email);

            if (!userdb) {
                throw new InvalidArgumentError('Error: User not found');
            }

            const comparePassword = await bcrypt.compare(user.password, userdb.password);

            if (!comparePassword) {
                throw new InvalidArgumentError('Password invalid;');
            }

            if (userdb.id) {
                const access_token = jwt.access_token(userdb.id);
                const reflesh_token = jwt.reflesh_token(userdb.id);
                return {
                    id: userdb.id,
                    username: userdb.username,
                    email: userdb.email,
                    created_at: userdb.created_at,
                    access_token,
                    reflesh_token,
                };
            }
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }

    private async findEmail(email: string): Promise<User | void | null> {
        try {
            return await this.userModel.findByEmail(email);
        } catch (error) {
            catchErrorsFunctions(error);
        }
    }
}

export default new UserService(UserModel);
