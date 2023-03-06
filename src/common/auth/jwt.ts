import * as jwt from 'jsonwebtoken';
import { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

interface idUser extends JwtPayload {
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

    decrypt(token: string): string | JwtPayload | null | JsonWebTokenError {
        try {
            const data = jwt.decode(token);

            return data;
        } catch (err) {
            return err as JsonWebTokenError;
        }
    }

    verify(token: string): idUser {
        return jwt.verify(token, String(process.env.SECRET)) as idUser;
    }
}

export default new JWT();
