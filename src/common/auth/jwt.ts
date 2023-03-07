import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

export interface idUser extends JwtPayload {
    id: string;
}

class JWT {
    access_token(id: string): string {
        return jwt.sign(
            {
                id,
            },
            String(process.env.SECRET),
            {
                expiresIn: '1d',
            },
        );
    }

    reflesh_token(id: string): string {
        return jwt.sign({ id: id }, String(process.env.SECRET), {
            expiresIn: '7d',
        });
    }

    decrypt(token: string): idUser {
        const data = jwt.decode(token) as idUser;
        return data;
    }

    verify(token: string): idUser {
        return jwt.verify(token, String(process.env.SECRET)) as idUser;
    }
}

export default new JWT();
