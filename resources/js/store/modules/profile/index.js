import { getters } from './getters';
import { mutations } from './mutations';
import { actions } from './actions';
import { states } from './states';

export const profile = {
    namespaced: true,
    state() {
        return states;
    },
    getters,
    mutations,
    actions,
};
