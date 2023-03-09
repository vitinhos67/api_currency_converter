export const schemaTransactions = {
    query: {
        type: 'object',
        description: 'ok',
        properties: {
            id_user: { type: 'string', nullable: true },
            to: { type: 'string', nullable: true },
            from: { type: 'string', nullable: true },
            amount: { type: 'string', nullable: true },
        },
    },
    response: {
        200: {
            type: 'array',
            items: {
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
    },
};
