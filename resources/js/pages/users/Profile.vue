<template>
    <div class="container">
        <div class="my-4">
            <h2>Welcome {{ profile.name }}</h2>
        </div>
        <div class="card">
            <div class="card-body p-4">
                <form @submit.prevent="handleSubmit">
                    <div class="row">
                        <div class="col-6 mb-4">
                            <label for="name" class="form-label">
                                Name
                            </label>
                            <input type="text" v-model="form.name" class="form-control"
                                :class="[v$.form.name.$error ? 'is-invalid' : '']" id="name" placeholder="Enter name" />
                            <validation-error :isError="v$.form.name.$error" field="name" :errors="v$.$errors"
                                key="name"></validation-error>
                        </div>
                        <div class="col-6 mb-4">
                            <label for="email" class="form-label">
                                Email address
                            </label>
                            <input type="email" v-model="form.email" class="form-control"
                                :class="[v$.form.email.$error ? 'is-invalid' : '']" id="email"
                                placeholder="Enter email" />
                            <validation-error :isError="v$.form.email.$error" field="email"
                                :errors="v$.$errors"></validation-error>
                        </div>
                        <div class="col-6 mb-4">
                            <label for="gender" class="form-label">
                                Gender
                            </label>
                            <div>
                                <div v-for="(gender, index) in genders" class="form-check form-check-inline"
                                    :key="index">
                                    <input type="radio" v-model="form.gender" :id="gender" name="gender" :value="gender"
                                        class="form-check-input" />
                                    <label class="form-check-label" :for="gender">
                                        {{ gender }}
                                    </label>
                                </div>
                            </div>
                            <custom-validation-error :isError="v$.form.gender.$error" field="gender"
                                :errors="v$.$errors"></custom-validation-error>
                        </div>
                        <div class="col-6 mb-4">
                            <div class="row">
                                <div class="col-8">
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
                                <div class="col-4">
                                    <img :src="profile.profileImage" alt="current profile image" class="img-fluid"
                                        width="80" height="80" />
                                </div>
                            </div>
                        </div>
                        <div class="col-6 mb-4">
                            <label for="speaking_languages" class="form-label">
                                Speaking Languages
                            </label>
                            <v-select v-model="form.speaking_languages" class="form-control p-0 border-0"
                                :class="[v$.form.speaking_languages.$error ? 'is-invalid' : '']" multiple
                                :options="languages" placeholder="Select.."></v-select>
                            <validation-error :isError="v$.form.speaking_languages.$error" field="speaking_languages"
                                :errors="v$.$errors"></validation-error>
                        </div>
                        <div class="col-6"></div>
                        <div class="col-3">
                            <button type="submit" class="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core';
import { customRequired, customEmail, customOptional } from '@Utils/validationRules';
import { mapGetters } from 'vuex';
import { BaseApi } from '@Api';
import ValidationError from '@Components/ValidationError.vue';
import CustomValidationError from '../../components/CustomValidationError.vue';

export default {
    name: 'Profile',
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
                    ...customOptional(this.form.profile_image), $autoDirty: true
                },
                speaking_languages: {
                    ...customRequired, $autoDirty: true
                }
            }
        }
    },
    computed: {
        ...mapGetters('profile', ['profile']),
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
            BaseApi.profileUpdate(formData).then(({ data }) => {
                console.log('dta', data);
                this.$store.commit('profile/setProfile', { ...data.data });
                this.successToast(data.message);
                // this.$router.push({ name: 'Login' });
            }).catch(error => {
                if (error?.errors) {
                    (Object.keys(error.errors)).forEach((key) => {
                        Object.assign(this.vuelidateExternalResults.form, { [key]: error.errors[key] })
                    });
                }
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
                    if (this.form[key]) {
                        formData.append(key, this.form[key]);
                    }
                }
            });
            formData.append('id', this.profile.id);
            return formData;
        },
        setProfileData() {
            this.form.name = this.profile.name;
            this.form.email = this.profile.email;
            this.form.gender = this.profile.gender;
            this.form.speaking_languages = this.profile.speakingLanguages;
        }
    },
    mounted() {
        this.setProfileData();
    },
    watch: {
        profile(newVal) {
            if (newVal.name) {
                this.setProfileData()
            }
        }
    }
};
</script>
