export const state = () => ({
    authToken: ""
})

export const getters = {
    getToken(state) {
        return state.token
    }
}

export const mutations = {
    setToken(state, token) {
        state.authToken = token;
    }
}

export const actions = {
    async authenticateUser(vuexContext, authData) {
        debugger;
        let authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + process.env.fbAPIKey;
        if (!authData.isLogin) {
            authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + process.env.fbAPIKey;
        }
        return this.$axios.$post(authUrl, { email: authData.login, password: authData.password, returnSecureToken: true })
            .then((result) => {
                vuexContext.commit("setToken", result.idToken);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}