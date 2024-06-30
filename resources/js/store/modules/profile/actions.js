import { BaseApi } from '../../../api';
import { getCookie } from '../../../helpers/cookie';
import { defaultProfile } from './states';

export const actions = {
    async getProfile({ commit }) {
        if (getCookie) {
            BaseApi.getAuthenticatedUser().then(({ data }) => {
                if (data?.data?.name) {
                    commit('setProfile', { ...data.data, isLoggedIn: true });
                } else {
                    commit('setProfile', { ...defaultProfile });
                }
            }).catch((error) => {
                commit('setProfile', { ...defaultProfile });
            })
        }
    }
};
