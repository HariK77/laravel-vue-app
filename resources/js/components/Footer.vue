<template>
    <footer class="footer mt-auto py-3 bg-body-tertiary">
        <div class="container">
            <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <a href="javascript:void(0)"
                        class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                        {{ appName }}
                    </a>
                    <span class="mb-3 mb-md-0 text-body-secondary">
                        © {{ new Date().getFullYear() }} {{ appName }}, Inc
                    </span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3">
                        <a class="text-body-secondary">
                            <i class="bi-twitter"></i>
                        </a>
                    </li>
                    <li class="ms-3">
                        <a class="text-body-secondary">
                            <i class="bi-instagram"></i>
                        </a>
                    </li>
                    <li class="ms-3">
                        <a class="text-body-secondary">
                            <i class="bi-facebook"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'Footer',
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME,
            appUrl: import.meta.env.VITE_APP_URL,
        };
    },
};
</script>
