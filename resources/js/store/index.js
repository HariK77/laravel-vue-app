import { createStore } from 'vuex';
import { profile } from './modules/profile';


export default createStore({
    modules: {
        profile: profile
    }
});
