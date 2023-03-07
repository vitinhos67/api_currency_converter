export const schemaAddTransactions = {
    querystring: {
        type: 'object',
        properties: {
            id_user: { type: 'string' },
            to: { type: 'string' },
            from: { type: 'string' },
            amount: { type: 'string' },
        },
    },
    headers: {
        type: 'object',
        properties: {
            access_token: { type: 'string' },
            reflesh_token: { type: 'string' },
        },
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                id_user: { type: 'string' },
                from: { type: 'string' },
                amount_from: { type: 'number' },
                result: { type: 'number' },
                to: { type: 'number' },
                rate: { type: 'number' },
                created_at: { type: 'string' },
            },
        },
    },
};
