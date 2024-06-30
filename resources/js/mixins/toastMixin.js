import { useToast } from "vue-toastification";

export default {
    methods: {
        successToast(message, options = {}) {
            const toast = useToast();
            toast.success(message, {
                timeout: 2000,
                icon: "bi-check-circle",
                ...options
            });
        },
        errorToast(message, options = {}) {
            const toast = useToast();
            toast.error(message, {
                timeout: 2000,
                icon: "bi-exclamation-triangle",
                ...options
            });
        },
        warningToast(message, options = {}) {
            const toast = useToast();
            toast.warning(message, {
                timeout: 2000,
                icon: "bi-exclamation-circle",
                ...options
            });
        }
    }
};
