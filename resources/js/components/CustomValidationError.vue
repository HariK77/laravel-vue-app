<template>
    <div v-if="isError" class="text-danger" :style="{ fontSize: '0.875em' }">
        <template v-for="error in errors" :key="error.$uid">
            {{ error.$property === field ? error.$message : '' }}
        </template>
    </div>
</template>

<script>
export default {
    name: 'Custom Validation Error',
    props: ['isError', 'errors', 'field'],
    data() {
        return {

        };
    },
};
</script>
