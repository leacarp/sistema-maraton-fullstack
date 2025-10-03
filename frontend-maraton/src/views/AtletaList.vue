<template>
  <div class="max-w-6xl mx-auto p-6">
    <div class="bg-white rounded-xl shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">
          Podio de Atletas
        </h2>
        <RouterLink 
          to="/nuevo-atleta"
          class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          + Nuevo Atleta
        </RouterLink>
      </div>

      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Cargando atletas...</p>
      </div>

      <div v-else-if="atletas.length === 0" class="text-center py-8">
        <div class="text-gray-400 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No hay atletas registrados</h3>
        <p class="text-gray-500 mb-4">Comienza agregando el primer atleta al sistema.</p>
        <RouterLink 
          to="/nuevo-atleta"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Agregar Atleta
        </RouterLink>
      </div>

      <div v-else>
        <div v-if="atletas.length >= 3" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center">🏆 Podio</h3>
          <div class="flex justify-center items-end space-x-4">
            <div class="text-center">
              <div class="bg-gray-300 rounded-t-lg p-4 mb-2 h-20 flex items-center justify-center">
                <span class="text-2xl font-bold text-gray-700">2°</span>
              </div>
              <div class="text-center">
                <p class="font-semibold">{{ atletas[1]?.nombre }}</p>
                <p class="text-sm text-gray-600">{{ atletas[1]?.tiempo }}</p>
                <p class="text-xs text-gray-500">{{ atletas[1]?.ciudad }}</p>
              </div>
            </div>

            <div class="text-center">
              <div class="bg-yellow-400 rounded-t-lg p-4 mb-2 h-24 flex items-center justify-center">
                <span class="text-3xl font-bold text-yellow-800">1°</span>
              </div>
              <div class="text-center">
                <p class="font-semibold">{{ atletas[0]?.nombre }}</p>
                <p class="text-sm text-gray-600">{{ atletas[0]?.tiempo }}</p>
                <p class="text-xs text-gray-500">{{ atletas[0]?.ciudad }}</p>
              </div>
            </div>

            <div class="text-center">
              <div class="bg-amber-600 rounded-t-lg p-4 mb-2 h-16 flex items-center justify-center">
                <span class="text-xl font-bold text-amber-100">3°</span>
              </div>
              <div class="text-center">
                <p class="font-semibold">{{ atletas[2]?.nombre }}</p>
                <p class="text-sm text-gray-600">{{ atletas[2]?.tiempo }}</p>
                <p class="text-xs text-gray-500">{{ atletas[2]?.ciudad }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posición
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DNI
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tiempo
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ciudad
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="(atleta, index) in atletas" 
                :key="atleta.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-yellow-100 text-yellow-800': atleta.posicion === 1,
                        'bg-gray-100 text-gray-800': atleta.posicion === 2,
                        'bg-amber-100 text-amber-800': atleta.posicion === 3,
                        'bg-blue-100 text-blue-800': atleta.posicion > 3
                      }"
                    >
                      {{ atleta.posicion }}°
                    </span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ atleta.nombre }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ atleta.dni }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ atleta.tiempo }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ atleta.ciudad }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="editAtleta(atleta)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <button 
                    @click="handleDeleteAtleta(atleta.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAtletas } from '../composables/useAtletas'
import { useRouter } from 'vue-router'

const router = useRouter()

const { atletas, loading, fetchAtletas, deleteAtleta } = useAtletas()

const editAtleta = (atleta) => {
  router.push(`/editar-atleta/${atleta.id}`)
}

const handleDeleteAtleta = async (atletaId) => {
  if (!confirm('¿Está seguro que desea eliminar el atleta ' + atletas.value.find(a => a.id === atletaId).nombre + '?')) {
    return
  }
  
  try {
    await deleteAtleta(atletaId)
  } catch (error) {
    throw error
  }
}

onMounted(() => {
  fetchAtletas()
})
</script>
