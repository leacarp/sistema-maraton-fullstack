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

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Cargando atletas...</p>
      </div>

      <!-- Empty state -->
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

      <!-- Atletas list -->
      <div v-else>
        <!-- Podio visual para los primeros 3 -->
        <div v-if="atletas.length >= 3" class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4 text-center">🏆 Podio</h3>
          <div class="flex justify-center items-end space-x-4">
            <!-- 2do lugar -->
            <div class="text-center">
              <div class="bg-gray-300 rounded-t-lg p-4 mb-2 h-20 flex items-center justify-center">
                <span class="text-2xl font-bold text-gray-700">2°</span>
              </div>
              <div class="text-center">
                <p class="font-semibold">{{ atletas[1]?.nombre }}</p>
                <p class="text-sm text-gray-600">{{ atletas[1]?.tiempo }}</p>
                <p class="text-xs text-gray-500">{{ getCiudadNombre(atletas[1]?.ciudadId) }}</p>
              </div>
            </div>

            <!-- 1er lugar -->
            <div class="text-center">
              <div class="bg-yellow-400 rounded-t-lg p-4 mb-2 h-24 flex items-center justify-center">
                <span class="text-3xl font-bold text-yellow-800">1°</span>
              </div>
              <div class="text-center">
                <p class="font-semibold">{{ atletas[0]?.nombre }}</p>
                <p class="text-sm text-gray-600">{{ atletas[0]?.tiempo }}</p>
                <p class="text-xs text-gray-500">{{ getCiudadNombre(atletas[0]?.ciudadId) }}</p>
              </div>
            </div>

            <!-- 3er lugar -->
            <div class="text-center">
              <div class="bg-amber-600 rounded-t-lg p-4 mb-2 h-16 flex items-center justify-center">
                <span class="text-xl font-bold text-amber-100">3°</span>
              </div>
              <div class="text-center">
                <p class="font-semibold">{{ atletas[2]?.nombre }}</p>
                <p class="text-sm text-gray-600">{{ atletas[2]?.tiempo }}</p>
                <p class="text-xs text-gray-500">{{ getCiudadNombre(atletas[2]?.ciudadId) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabla completa de atletas -->
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
                :key="atleta._id"
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
                  <div class="text-sm text-gray-900">{{ getCiudadNombre(atleta.ciudadId) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    @click="editAtleta(atleta)"
                    class="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    Editar
                  </button>
                  <button 
                    @click="deleteAtleta(atleta._id)"
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

      <!-- Error message -->
      <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Estado reactivo
const atletas = ref([])
const ciudades = ref([])
const loading = ref(false)
const error = ref('')

// Métodos
const loadAtletas = async () => {
  loading.value = true
  error.value = ''
  
  try {
    // Aquí irá la llamada al API cuando creemos los composables
    console.log('Cargando atletas...')
    
    // Simulación de datos
    setTimeout(() => {
      atletas.value = [
        { _id: '1', dni: 12345678, nombre: 'Juan Pérez', tiempo: '02:30:45', posicion: 1, ciudadId: '1' },
        { _id: '2', dni: 23456789, nombre: 'María García', tiempo: '02:32:12', posicion: 2, ciudadId: '2' },
        { _id: '3', dni: 34567890, nombre: 'Carlos López', tiempo: '02:35:30', posicion: 3, ciudadId: '1' },
        { _id: '4', dni: 45678901, nombre: 'Ana Martínez', tiempo: '02:38:15', posicion: 4, ciudadId: '3' },
        { _id: '5', dni: 56789012, nombre: 'Pedro Rodríguez', tiempo: '02:40:22', posicion: 5, ciudadId: '2' }
      ]
      
      ciudades.value = [
        { _id: '1', nombre: 'Buenos Aires' },
        { _id: '2', nombre: 'Córdoba' },
        { _id: '3', nombre: 'Rosario' },
        { _id: '4', nombre: 'Mendoza' }
      ]
      
      loading.value = false
    }, 1000)
    
  } catch (err) {
    console.error('Error al cargar atletas:', err)
    error.value = 'Error al cargar los atletas. Intente nuevamente.'
    loading.value = false
  }
}

const getCiudadNombre = (ciudadId) => {
  const ciudad = ciudades.value.find(c => c._id === ciudadId)
  return ciudad ? ciudad.nombre : 'Ciudad no encontrada'
}

const editAtleta = (atleta) => {
  // Aquí implementaremos la edición cuando creemos los composables
  console.log('Editar atleta:', atleta)
}

const deleteAtleta = async (atletaId) => {
  if (!confirm('¿Está seguro que desea eliminar este atleta?')) {
    return
  }
  
  try {
    // Aquí irá la llamada al API cuando creemos los composables
    console.log('Eliminar atleta:', atletaId)
    
    // Simulación de eliminación
    atletas.value = atletas.value.filter(a => a._id !== atletaId)
    
  } catch (err) {
    console.error('Error al eliminar atleta:', err)
    error.value = 'Error al eliminar el atleta.'
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  loadAtletas()
})
</script>
