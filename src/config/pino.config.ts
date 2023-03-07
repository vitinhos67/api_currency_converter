/**
 *  @type {Object}
 * @description used for set configs from the lib Pino, Colorize logs in terminal and add level
 */
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
