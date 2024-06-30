<template>
    <div class="container">
        <h1 class="text-center mb-3">Register</h1>
        <div class="row">
            <div class="col-6 offset-3">
                <div class="card p-3">
                    <div class="card-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="name" class="form-label">
                                    Name
                                </label>
                                <input type="text" v-model="form.name" class="form-control"
                                    :class="[v$.form.name.$error ? 'is-invalid' : '']" id="name"
                                    placeholder="Enter name" />
                                <validation-error :isError="v$.form.name.$error" field="name" :errors="v$.$errors"
                                    key="name"></validation-error>
                            </div>
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
                                <label for="gender" class="form-label">
                                    Gender
                                </label>
                                <div>
                                    <div v-for="(gender, index) in genders" class="form-check form-check-inline"
                                        :key="index">
                                        <input type="radio" v-model="form.gender" :id="gender" name="gender"
                                            :value="gender" class="form-check-input" />
                                        <label class="form-check-label" :for="gender">
                                            {{ gender }}
                                        </label>
                                    </div>
                                </div>
                                <custom-validation-error :isError="v$.form.gender.$error" field="gender"
                                    :errors="v$.$errors"></custom-validation-error>
                            </div>
                            <div class="mb-3">
                                <label for="profile_image" class="form-label">
                                    Profile Image
                                </label>
                                <input type="file" class="form-control"
                                    :class="[v$.form.profile_image.$error ? 'is-invalid' : '']" id="profile_image"
                                    accept="image/png, image/jpeg"
                                    @change="form.profile_image = $event.target.files[0]" />
                                <validation-error :isError="v$.form.profile_image.$error" field="profile_image"
                                    :errors="v$.$errors"></validation-error>
                            </div>
                            <div class="mb-3">
                                <label for="speaking_languages" class="form-label">
                                    Speaking Languages
                                </label>
                                <v-select v-model="form.speaking_languages" class="form-control p-0 border-0"
                                    :class="[v$.form.speaking_languages.$error ? 'is-invalid' : '']" multiple
                                    :options="languages" placeholder="Select.."></v-select>
                                <validation-error :isError="v$.form.speaking_languages.$error"
                                    field="speaking_languages" :errors="v$.$errors"></validation-error>
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
                            <div class="mb-3">
                                <label for="password" class="form-label">
                                    Confirm Password
                                </label>
                                <input type="password" v-model="form.password_confirmation" class="form-control"
                                    :class="[v$.form.password_confirmation.$error ? 'is-invalid' : '']"
                                    id="password_confirmation" placeholder="Enter password confirmation" />
                                <validation-error :isError="v$.form.password_confirmation.$error"
                                    field="password_confirmation" :errors="v$.$errors"></validation-error>
                            </div>
                            <button type="submit" :disabled="isProcessing" class="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                <div class="my-4">
                    <p>
                        Already have an account? Login
                        <router-link to="/login">here</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core';
import { customRequired, customEmail, passwordConfirmation } from '@Utils/validationRules';
import { BaseApi } from '@Api';
import ValidationError from '@Components/ValidationError.vue';
import CustomValidationError from '../../components/CustomValidationError.vue';

export default {
    name: 'Register',
    setup() {
        return { v$: useVuelidate() }
    },
    components: {
        ValidationError, CustomValidationError
    },
    data() {
        return {
            form: {
                name: "",
                email: "",
                gender: "",
                profile_image: null,
                speaking_languages: "",
                password: "",
                password_confirmation: "",
            },
            genders: ["Male", "Female", "Others"],
            languages: ["Telugu", "Hindi", "English"],
            isProcessing: false,
            vuelidateExternalResults: {
                form: {
                    name: "",
                    email: "",
                    gender: "",
                    profile_image: null,
                    speaking_languages: "",
                    password: "",
                    password_confirmation: "",
                },
            }
        };
    },
    validations() {
        return {
            form: {
                name: {
                    ...customRequired, $autoDirty: true
                },
                email: {
                    ...customRequired, ...customEmail, $autoDirty: true
                },
                gender: {
                    ...customRequired, $autoDirty: true
                },
                profile_image: {
                    ...customRequired, $autoDirty: true
                },
                speaking_languages: {
                    ...customRequired, $autoDirty: true
                },
                password: {
                    ...customRequired, $autoDirty: true
                },
                password_confirmation: {
                    ...customRequired,
                    ...passwordConfirmation(this.form.password),
                    $autoDirty: true
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
            this.handleLogin(this.createFormObject());
        },
        handleLogin(formData) {
            this.isProcessing = true;
            BaseApi.register(formData).then(({ data }) => {
                this.successToast(data?.message);
                this.$router.push({ name: 'Login' });
            }).catch(error => {
                if (error?.errors) {
                    (Object.keys(error.errors)).forEach((key) => {
                        Object.assign(this.vuelidateExternalResults.form, { [key]: error.errors[key] })
                    });
                }
                this.errorToast("Failed to register, please check you inputs");
            }).finally(() => {
                this.isProcessing = false;
            });
        },
        createFormObject() {
            const formData = new FormData();

            Object.keys(this.form).forEach((key) => {
                if (key === "speaking_languages") {
                    this.form[key].forEach((selection) => {
                        formData.append(key + "[]", selection);
                    });
                } else {
                    formData.append(key, this.form[key]);
                }
            });

            return formData;
        }
    }
};
</script>
