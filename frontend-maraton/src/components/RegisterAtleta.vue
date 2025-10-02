<template>
  <div class="max-w-lg mx-auto bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
      Registrar Nuevo Atleta
    </h2>
    
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- DNI -->
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
        />
      </div>

      <!-- Nombre -->
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

      <!-- Tiempo -->
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

      <!-- Posición -->
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

      <!-- Ciudad -->
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
            :key="ciudad._id" 
            :value="ciudad._id"
          >
            {{ ciudad.nombre }}
          </option>
        </select>
        
        <!-- Mensaje si no hay ciudades -->
        <div v-if="ciudades.length === 0" class="mt-2 text-sm text-amber-600">
          No hay ciudades registradas. 
          <RouterLink to="/nueva-ciudad" class="text-blue-600 hover:underline">
            Crear una ciudad primero
          </RouterLink>
        </div>
      </div>
      
      <!-- Botones -->
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
    </form>
    
    <!-- Mensaje de éxito o error -->
    <div v-if="message" class="mt-4 p-3 rounded-md" :class="messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Estado reactivo
const atleta = ref({
  dni: null,
  nombre: '',
  tiempo: '',
  posicion: null,
  ciudadId: ''
})

const ciudades = ref([])
const loading = ref(false)
const message = ref('')
const messageType = ref('')

// Métodos
const loadCiudades = async () => {
  try {
    // Aquí irá la llamada al API cuando creemos los composables
    console.log('Cargando ciudades para el formulario...')
    
    // Simulación de datos
    setTimeout(() => {
      ciudades.value = [
        { _id: '1', nombre: 'Buenos Aires' },
        { _id: '2', nombre: 'Córdoba' },
        { _id: '3', nombre: 'Rosario' },
        { _id: '4', nombre: 'Mendoza' }
      ]
    }, 500)
    
  } catch (error) {
    console.error('Error al cargar ciudades:', error)
    message.value = 'Error al cargar las ciudades.'
    messageType.value = 'error'
  }
}

const submitForm = async () => {
  loading.value = true
  message.value = ''
  
  try {
    // Validaciones adicionales
    if (!atleta.value.dni || !atleta.value.nombre || !atleta.value.tiempo || !atleta.value.posicion || !atleta.value.ciudadId) {
      throw new Error('Todos los campos son obligatorios')
    }
    
    // Aquí irá la llamada al API cuando creemos los composables
    console.log('Atleta a guardar:', atleta.value)
    
    // Simulación de guardado exitoso
    setTimeout(() => {
      message.value = 'Atleta registrado exitosamente!'
      messageType.value = 'success'
      resetForm()
      loading.value = false
    }, 1000)
    
  } catch (error) {
    console.error('Error al guardar atleta:', error)
    message.value = error.message || 'Error al guardar el atleta. Intente nuevamente.'
    messageType.value = 'error'
    loading.value = false
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
  message.value = ''
}

// Cargar ciudades al montar el componente
onMounted(() => {
  loadCiudades()
})
</script>
