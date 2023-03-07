import app from './app';
import dbConnector from './config/database';



app.listen(
    {
        port: 3000,
        host: '0.0.0.0',
    },
    async () => {
        await dbConnector();
        app.log.info('listening port 3000');
    },
);
