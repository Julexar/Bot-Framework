import 'dotenv/config';

const config = {
    token: process.env.BOT_TOKEN,
    default_prefix: 'b!',
    owners: ['676518256282042393'],
    presence: {
        activities: [
            {
                name: 'Frameworks',
                type: 0,
            },
        ],
        status: 'online',
    },
};

export { config };
