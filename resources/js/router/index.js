import { createWebHistory, createRouter } from 'vue-router';

import Home from '@Pages/Home.vue';
import About from '@Pages/About.vue';
import Contact from '@Pages/Contact.vue';

import Login from '@Pages/auth/Login.vue';
import Register from '@Pages/auth/Register.vue';
import Profile from '@Pages/users/Profile.vue'

import { getCookie } from '@Helpers/cookie';

const routes = [
    {
        path: '/',
        children: [
            {
                path: '',
                name: 'Home',
                component: Home,
                meta: {
                    title: 'Home'
                }
            },
            {
                path: 'about',
                name: 'About',
                component: About,
                meta: {
                    title: 'About'
                }
            },
            {
                path: 'contact',
                name: 'Contact',
                component: Contact,
                meta: {
                    title: 'Contact'
                }
            },
        ],
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Login'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: 'Register'
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            title: 'Profile',
            requiresAuth: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const guestOnlyRouteList = [
    'Login', 'Register'
];

const defaultTitle = import.meta.env.VITE_APP_NAME;

const handleMeta = (to, from) => {
    if (to?.meta?.title) {
        return to.meta.title;
    } else if (to?.params?.postSlug) {
        return to.params.postSlug.replaceAll('-', ' ');
    }
    return defaultTitle;
}

router.beforeEach((to, from) => {

    document.title = handleMeta(to, from);

    if (to?.meta?.requiresAuth && !getCookie('authToken')) {
        return {
            name: 'Login',
            query: { redirect: to.name },
        }
    }

    if (getCookie('authToken') && guestOnlyRouteList.includes(to.name)) {
        return { name: 'Home' };
    }
});

export default router;
