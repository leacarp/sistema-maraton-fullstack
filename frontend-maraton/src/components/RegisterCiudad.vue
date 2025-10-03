<template>
  <div class="max-w-md mx-auto bg-white rounded-xl shadow-md p-10">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
      Registrar Nueva Ciudad
    </h2>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">
          Nombre de la Ciudad
        </label>
        <input
          type="text"
          id="nombre"
          v-model="ciudad.nombre"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingrese el nombre de la ciudad"
          required
          minlength="2"
        />
      </div>
      
      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="loading"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Guardando...' : 'Guardar Ciudad' }}
        </button>
        
        <button
          type="button"
          @click="resetForm"
          class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Limpiar
        </button>
      </div>
    </form>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCiudades } from '../composables/useCiudades'
import { useRouter } from 'vue-router'

const { createCiudad, loading } = useCiudades()

const router = useRouter()
const ciudad = ref({
  nombre: ''
})

const submitForm = async () => {
  try {
    const nuevaCiudad = await createCiudad(ciudad.value.nombre)
    resetForm()
    router.push('/ciudades')
  } catch (error) {
    throw error
  } 
}

const resetForm = () => {
  ciudad.value = {
    nombre: ''
  }
}
</script>