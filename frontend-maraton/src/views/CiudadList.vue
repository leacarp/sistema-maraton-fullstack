<template>
  <div class="max-w-4xl mx-auto p-6">
    <div class="bg-white rounded-xl shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          Ciudades Registradas
        </h2>
        <RouterLink 
          to="/nueva-ciudad"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          + Nueva Ciudad
        </RouterLink>
      </div>

      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Cargando ciudades...</p>
      </div>

      <div v-else-if="ciudades.length === 0" class="text-center py-8">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay ciudades registradas</h3>
        <p class="text-gray-500 mb-4">Comienza agregando la primera ciudad al sistema.</p>
        <RouterLink 
          to="/nueva-ciudad"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Agregar Ciudad
        </RouterLink>
      </div>

      <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div 
          v-for="ciudad in ciudades" 
          :key="ciudad.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="bg-blue-100 rounded-full p-2 mr-3">
                <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">{{ ciudad.nombre }}</h3>
              </div>
            </div>
            <div class="flex space-x-2">
              <button 
                @click="editCiudad(ciudad)"
                class="text-blue-600 hover:text-blue-800 p-1"
                title="Editar ciudad"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                @click="handleDeleteCiudad(ciudad.id)"
                class="text-red-600 hover:text-red-800 p-1"
                title="Eliminar ciudad"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCiudades } from '../composables/useCiudades'

const { ciudades, loading, fetchCiudades, deleteCiudad } = useCiudades()


const editCiudad = (ciudad) => {
  // Aquí implementaremos la edición cuando creemos los composables
  console.log('Editar ciudad:', ciudad)
}

const handleDeleteCiudad = async (ciudadId) => {
  if (!confirm('¿Está seguro que desea eliminar la ciudad ' + ciudades.value.find(c => c.id === ciudadId).nombre + '?')) {
    return
  }
  try {
    await deleteCiudad(ciudadId)
  } catch (error) {
    throw error
  }
}

onMounted(() => {
  fetchCiudades()
})
</script>
