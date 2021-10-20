const state = {
    token: '',
    name: '',
    avatar: '',
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
};

const actions = {
    // user login
    login ({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            // todo;
            resolve();
        });
    },

    // get user info
    getInfo ({ commit, state }) {
        return new Promise((resolve, reject) => {
            // todo;
            resolve();
        });
    },

    // user logout
    logout ({ commit, state }) {
        return new Promise((resolve, reject) => {
            // todo
            resolve();
        });
    },

    // remove token
    resetToken ({ commit }) {
        return new Promise((resolve) => {
            commit('RESET_STATE');
            resolve();
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
