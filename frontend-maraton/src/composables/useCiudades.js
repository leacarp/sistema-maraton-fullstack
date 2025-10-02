import { ref, readonly } from 'vue'

// Base URL del backend
const API_BASE_URL = 'http://localhost:3000'

// Estado reactivo
const ciudades = ref([])
const loading = ref(false)
const error = ref('')

export function useCiudades() {
  
  // Función para obtener todas las ciudades
  const fetchCiudades = async () => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(`${API_BASE_URL}/ciudades`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      ciudades.value = data
      
    } catch (err) {
      console.error('Error al cargar ciudades:', err)
      error.value = err.message || 'Error al cargar las ciudades'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Función para obtener una ciudad por ID
  const fetchCiudadById = async (id) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(`${API_BASE_URL}/ciudades/${id}`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      return data
      
    } catch (err) {
      console.error('Error al cargar ciudad:', err)
      error.value = err.message || 'Error al cargar la ciudad'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Función para crear una nueva ciudad
  const createCiudad = async (nombre) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(`${API_BASE_URL}/ciudades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }
      
      const nuevaCiudad = await response.json()
      
      // Agregar la nueva ciudad al estado local
      ciudades.value.push(nuevaCiudad)
      
      return nuevaCiudad
      
    } catch (err) {
      console.error('Error al crear ciudad:', err)
      error.value = err.message || 'Error al crear la ciudad'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Función para actualizar una ciudad
  const updateCiudad = async (id, nombre) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(`${API_BASE_URL}/ciudades/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre })
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }
      
      const ciudadActualizada = await response.json()
      
      // Actualizar la ciudad en el estado local
      const index = ciudades.value.findIndex(c => c.id === id)
      if (index !== -1) {
        ciudades.value[index] = ciudadActualizada
      }
      
      return ciudadActualizada
      
    } catch (err) {
      console.error('Error al actualizar ciudad:', err)
      error.value = err.message || 'Error al actualizar la ciudad'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Función para eliminar una ciudad
  const deleteCiudad = async (id) => {
    loading.value = true
    error.value = ''
    
    try {
      const response = await fetch(`${API_BASE_URL}/ciudades/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }
      
      // Remover la ciudad del estado local
      ciudades.value = ciudades.value.filter(c => c.id !== id)
      
      return true
      
    } catch (err) {
      console.error('Error al eliminar ciudad:', err)
      error.value = err.message || 'Error al eliminar la ciudad'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Función para limpiar errores
  const clearError = () => {
    error.value = ''
  }

  return {
    // Estado
    ciudades: readonly(ciudades),
    loading: readonly(loading),
    error: readonly(error),
    
    // Métodos
    fetchCiudades,
    fetchCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad,
    clearError
  }
}