<template>
    <RegisterAtleta :atletaId="route.params.id" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import RegisterAtleta from '../components/RegisterAtleta.vue';

const route = useRoute();
</script>
