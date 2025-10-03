import { ref, readonly } from 'vue'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

const ciudades = ref([])
const loading = ref(false)

export function useCiudades() {
  
  const fetchCiudades = async () => {
    loading.value = true
    
    try {
      const response = await axios.get(`${API_BASE_URL}/ciudades`)
      
      if (response.status !== 200) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = response.data
      ciudades.value = data

    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchCiudadById = async (id) => {
    loading.value = true
    
    try {
      const response = await axios.get(`${API_BASE_URL}/ciudades/${id}`)
      
      if (response.status !== 200) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }
      
      const data = response.data
      return data
      
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  const createCiudad = async (nombre) => {
    loading.value = true
    
    try {
      const response = await axios.post(`${API_BASE_URL}/ciudades`, {
        nombre
      })
      
      if (response.status !== 201) {
        const errorData = response.data
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }
      
      const nuevaCiudad = response.data
      
      ciudades.value.push(nuevaCiudad)
      
      return nuevaCiudad
      
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCiudad = async (id, nombre) => {
    loading.value = true
    
    try {
      const response = await axios.put(`${API_BASE_URL}/ciudades/${id}`, {
        nombre
      })
      
      if (response.status !== 201) {
        const errorData = response.data
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }
      
      const ciudadActualizada = response.data
      
      const index = ciudades.value.findIndex(c => c.id === id)
      if (index !== -1) {
        ciudades.value[index] = ciudadActualizada
      }
      
      return ciudadActualizada
      
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCiudad = async (id) => {
    loading.value = true
    
    try {
      const response = await axios.delete(`${API_BASE_URL}/ciudades/${id}`, {
      })
      
      if (response.status !== 200) {
        const errorData = response.data
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }
      
      ciudades.value = ciudades.value.filter(c => c.id !== id)
      
      return true
      
    } catch (err) {
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    ciudades: readonly(ciudades),
    loading: readonly(loading),
    
    fetchCiudades,
    fetchCiudadById,
    createCiudad,
    updateCiudad,
    deleteCiudad,
  }
}