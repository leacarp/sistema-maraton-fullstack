<template>
    <RegisterCiudad :ciudadId="route.params.id" />
</template>

<script setup>
import { useRoute } from 'vue-router';
import RegisterCiudad from '../components/RegisterCiudad.vue';

const route = useRoute()
</script>