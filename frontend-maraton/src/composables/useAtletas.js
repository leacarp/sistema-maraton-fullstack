import { ref, readonly } from 'vue'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000'

const atletas = ref([])
const loading = ref(false)

export function useAtletas() {

    const fetchAtletas = async () => {
        loading.value = true
        try {
            const response = await axios.get(`${API_BASE_URL}/atletas`)
            if (response.status !== 200) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
            const data = response.data
            atletas.value = data
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }

    const fetchAtletaById = async (id) => {
        loading.value = true
        try {
            const response = await axios.get(`${API_BASE_URL}/atletas/${id}`)
            if (response.status !== 200) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
            const data = response.data
            return data
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }

    const createAtleta = async (atleta) => {
        loading.value = true
        try {
            const response = await axios.post(`${API_BASE_URL}/atletas`, atleta)
            if (response.status !== 201) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
            const nuevoAtleta = response.data
            atletas.value.push(nuevoAtleta)
            return nuevoAtleta
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }

    const updateAtleta = async (id, atleta) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/atletas/${id}`, atleta)
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
            const atletaActualizado = response.data
            const index = atletas.value.findIndex(a => a.id === id)
            if (index !== -1) {
                atletas.value[index] = atletaActualizado
            }
            return atletaActualizado
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }

    const deleteAtleta = async (id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/atletas/${id}`)
            if (response.status !== 200) {
                throw new Error(`Error ${response.status}: ${response.statusText}`)
            }
            const atletaEliminado = response.data
            atletas.value = atletas.value.filter(a => a.id !== id)
            return atletaEliminado
        } catch (error) {
            throw error
        } finally {
            loading.value = false
        }
    }

    return {
        atletas: readonly(atletas),
        loading: readonly(loading),

        fetchAtletas,
        fetchAtletaById,
        createAtleta,
        updateAtleta,
        deleteAtleta,
    }
}