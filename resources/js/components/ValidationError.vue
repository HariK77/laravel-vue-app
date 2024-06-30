<template>
    <div v-if="isError" class="invalid-feedback">
        <template v-for="error in errors" :key="error.$uid">
            {{ error.$property === field ? error.$message : '' }}
        </template>
    </div>
</template>

<script>
export default {
    name: 'Validation Error',
    props: ['isError', 'errors', 'field'],
    data() {
        return {

        };
    },
};
</script>
