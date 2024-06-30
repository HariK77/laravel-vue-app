<template>
    <div class="container">
        <h1 class="text-center mb-3">Login</h1>
        <div class="row">
            <div class="col-6 offset-3">
                <div class="card p-3">
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="email" class="form-label">
                                    Email address
                                </label>
                                <input type="email" v-model="form.email" class="form-control"
                                    :class="[v$.form.email.$error ? 'is-invalid' : '']" id="email"
                                    placeholder="Enter email" />
                                <validation-error :isError="v$.form.email.$error" field="email"
                                    :errors="v$.$errors"></validation-error>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">
                                    Password
                                </label>
                                <input type="password" v-model="form.password" class="form-control"
                                    :class="[v$.form.password.$error ? 'is-invalid' : '']" id="password"
                                    placeholder="Enter password" />
                                <validation-error :isError="v$.form.password.$error" field="password"
                                    :errors="v$.$errors"></validation-error>
                                <div class="invalid-feedback">
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary" :disabled="isProcessing">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div class="my-4">
                    <p>
                        New to site? Register
                        <router-link to="/register">here</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core';
import { customRequired, customEmail } from '@Utils/validationRules';
import { BaseApi } from '@Api';
import { setCookie } from '@Helpers/cookie';
import ValidationError from '@Components/ValidationError.vue';

export default {
    name: 'Login',
    setup() {
        return { v$: useVuelidate() }
    },
    components: {
        ValidationError
    },
    data() {
        return {
            isProcessing: false,
            form: {
                email: '',
                password: '',
            },
            vuelidateExternalResults: {
                form: {
                    email: '',
                    password: '',
                }
            }
        };
    },
    validations() {
        return {
            form: {
                email: {
                    ...customRequired, ...customEmail, $autoDirty: true
                },
                password: {
                    ...customRequired, $autoDirty: true
                },
            }
        }
    },
    methods: {
        async handleSubmit() {
            const validationCheck = await this.v$.$validate();
            if (!validationCheck) {
                return;
            }
            this.handleLogin();
        },
        handleLogin() {
            this.isProcessing = true;
            BaseApi.login(this.form).then(({ data }) => {
                setCookie('authToken', data.data.token);
                this.$store.commit('profile/setProfile', { ...data.data.user, isLoggedIn: true });
                this.handleRedirection();
            }).catch(error => {
                if (error?.errors) {
                    (Object.keys(error.errors)).forEach((key) => {
                        Object.assign(this.vuelidateExternalResults.form, { [key]: error.errors[key] })
                    });
                }
                this.errorToast("Invalid credentials!");
            }).finally(() => {
                this.isProcessing = false;
            });
        },
        handleRedirection() {
            if (this.$route.query.redirect) {
                this.$router.push({ name: this.$route.query.redirect });
            }
            this.$router.push({ name: 'Home' });
        },
    }
};
</script>
