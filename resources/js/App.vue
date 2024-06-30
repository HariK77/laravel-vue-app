<template>
    <Header />
    <router-view />
    <Footer />

</template>

<script>
import Header from '@Components/Header.vue';
import Footer from '@Components/Footer.vue';
import { mapGetters } from 'vuex';
import { getCookie } from './helpers/cookie';
import { defaultProfile } from './store/modules/profile/states';

export default {
    name: 'App',
    components: { Header, Footer },
    data() {
        return {
            cookieName: import.meta.env.VITE_COOKIE_NAME
        }
    },
    computed: {
        ...mapGetters('profile', ['profile']),
    },
    mounted() {
        if (getCookie(this.cookieName) && !this.profile.isLoggedIn) {
            this.$store.dispatch('profile/getProfile');
        } else {
            this.$store.commit('profile/setProfile', defaultProfile);
        }
    }

}
</script>
