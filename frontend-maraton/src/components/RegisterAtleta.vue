<template>
  <div class="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
      Registrar Nuevo Atleta
    </h2>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="dni" class="block text-sm font-medium text-gray-700 mb-1">
          DNI *
        </label>
        <input
          type="number"
          id="dni"
          v-model.number="atleta.dni"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingrese el DNI del atleta"
          required
          minlength="8"
          maxlength="8"
          pattern="[0-9]{8}"
        />
      </div>

      <div>
        <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">
          Nombre Completo *
        </label>
        <input
          type="text"
          id="nombre"
          v-model="atleta.nombre"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingrese el nombre completo del atleta"
          required
          minlength="2"
        />
      </div>

      <div>
        <label for="tiempo" class="block text-sm font-medium text-gray-700 mb-1">
          Tiempo de Carrera *
        </label>
        <input
          type="text"
          id="tiempo"
          v-model="atleta.tiempo"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ej: 02:30:45"
          required
        />
        <p class="text-xs text-gray-500 mt-1">Formato: HH:MM:SS</p>
      </div>

      <div>
        <label for="posicion" class="block text-sm font-medium text-gray-700 mb-1">
          Posición *
        </label>
        <input
          type="number"
          id="posicion"
          v-model.number="atleta.posicion"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Ingrese la posición del atleta"
          required
          min="1"
        />
      </div>

      <div>
        <label for="ciudad" class="block text-sm font-medium text-gray-700 mb-1">
          Ciudad *
        </label>
        <select
          id="ciudad"
          v-model="atleta.ciudadId"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Seleccione una ciudad</option>
          <option 
            v-for="ciudad in ciudades" 
            :key="ciudad.id" 
            :value="ciudad.id"
          >
            {{ ciudad.nombre }}
          </option>
        </select>
        
        <div v-if="ciudades.length === 0" class="mt-2 text-sm text-amber-600">
          No hay ciudades registradas. 
          <RouterLink to="/nueva-ciudad" class="text-blue-600 hover:underline">
            Crear una ciudad primero
          </RouterLink>
        </div>
      </div>
      
      <div class="flex gap-3">
        <button
          type="submit"
          :disabled="loading || ciudades.length === 0"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Guardando...' : 'Guardar Atleta' }}
        </button>
        
        <button
          type="button"
          @click="resetForm"
          class="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Limpiar
        </button>
      </div>

      <div v-if="errorMessage" class="mt-4 p-3 bg-red-100 text-red-800 rounded-md">
        {{ errorMessage }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCiudades } from '../composables/useCiudades'
import { useAtletas } from '../composables/useAtletas'
import { useRouter } from 'vue-router'

const props = defineProps(['atletaId'])

const { fetchCiudades, ciudades, loading } = useCiudades()
const { createAtleta, loading: loadingAtleta, fetchAtletaById, updateAtleta } = useAtletas()

const router = useRouter()
const atleta = ref({
  dni: null,
  nombre: '',
  tiempo: '',
  posicion: null,
  ciudadId: ''
})
const errorMessage = ref('')

const ciudadesCargadas = ref([])

const loadCiudades = async () => {
  try {
    await fetchCiudades()
    ciudadesCargadas.value = ciudades.value
  } catch (error) {
    throw error
  } 
}

const submitForm = async () => {
  errorMessage.value = ''
  try {
    if (props.atletaId) {
      await updateAtleta(props.atletaId, atleta.value)
    } else {
      await createAtleta(atleta.value)
    }
    resetForm()
    router.push('/atletas')
  } catch (error) {     
    errorMessage.value = error.response.data.message
  }
}

const resetForm = () => {
  atleta.value = {
    dni: null,
    nombre: '',
    tiempo: '',
    posicion: null,
    ciudadId: ''
  }
}

onMounted(async () => {
  loadCiudades()

  if (props.atletaId) {
    const atletaData = await fetchAtletaById(props.atletaId)
    const ciudadEncontrada = ciudades.value.find(c => c.nombre === atletaData.ciudad)
  
  atleta.value = {
    dni: atletaData.dni,
    nombre: atletaData.nombre,
    tiempo: atletaData.tiempo,
    posicion: atletaData.posicion,
    ciudadId: ciudadEncontrada?.id || ''
  }
  }

})
</script>
