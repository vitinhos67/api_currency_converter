export const userSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        created_at: { type: 'string' },
    },
};

export const loginUserSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        created_at: { type: 'string' },
        access_key: { type: 'string' },
        reflesh_token: { type: 'string' },
    },
};

export const schemaUser = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
            },
        },
        response: {
            200: userSchema,
        },
    },
};

export const schemaAllUsers = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: userSchema,
            },
        },
    },
};

export const schemaCreateUser = {
    schema: {
        body: {
            type: 'object',
            properties: {
                username: { type: 'string' },
                email: { type: 'string' },
                password: { type: 'string' },
            },
        },
        response: {
            204: userSchema,
        },
    },
};

export const schemaLoginUser = {
    schema: {
        body: {
            type: 'object',
            properties: {
                email: { type: 'string' },
                password: { type: 'string' },
            },
        },

        response: {
            200: loginUserSchema,
        },
    },
};
