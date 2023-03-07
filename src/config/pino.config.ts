const pinoSettings = {
    level: 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
        },
    },
};

export default pinoSettings;
