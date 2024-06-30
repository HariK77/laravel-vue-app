<template>
    <div class="container d-flex align-items-center justify-content-center vh-100">

        <div class="my-5">
            <h2>404</h2>
            <p>page not found</p>
            <Link class="btn btn-primary" to="/">
            Go To Home Page
            </Link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About',
    data() {
        return {
            page: "About",
        };
    },
};
</script>
