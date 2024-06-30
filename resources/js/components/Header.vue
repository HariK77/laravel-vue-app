<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                {{ appName }}
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dropdown"
                aria-controls="dropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="dropdown">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/">
                            Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">
                            About
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact">
                            Contact
                        </router-link>
                    </li>
                </ul>
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li v-if="profile?.isLoggedIn" class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="javascript:void(0)" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="profile.profileImage" class="img-fluid rounded me-2" alt="..." width="25"
                                height="25"></img>
                            {{ profile.name }}
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <router-link class="dropdown-item" to="/profile">
                                    Profile
                                </router-link>
                            </li>
                            <li>
                                <a class="dropdown-item" @click="handleLogout">
                                    logout
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li v-else class="nav-item">
                        <router-link class="nav-link" to="/login">
                            Login
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { BaseApi } from "@Api";
import { deleteCookie } from "@Helpers/cookie";
import { mapGetters } from 'vuex';
import { defaultProfile } from "../store/modules/profile/states";

export default {
    name: 'Header',
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME,
            appUrl: import.meta.env.VITE_APP_URL,
        };
    },
    computed: {
        ...mapGetters('profile', ['profile']),
    },
    methods: {
        handleLogout() {
            BaseApi.logout().then(({ data }) => {
                deleteCookie('authToken');
                this.$store.commit('profile/setProfile', defaultProfile);
                this.$router.push({ name: 'Home' });
            }).catch((error) => {
                console.error('Logout Error');
            });
        }
    },
};
</script>
