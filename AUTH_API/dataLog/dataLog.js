module.exports = {
    dataAuthLog: (id, tokens) => {
        return {
            success: true,
            data: {
                id,
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken
            },
        };
    },
    dataUserLog: (user) => {
        return {
            success: true,
            data: {
                id: user.id,
                email: user.email
            },
        };
    },
};