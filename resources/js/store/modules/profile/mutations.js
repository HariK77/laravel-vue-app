export const mutations = {
    setProfile(state, payload) {
        state.profile = { ...state.profile, ...payload };
    },
};
