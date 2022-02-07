import axios from "axios"

class UsuariosService {

    async listarAtendentes() {
        return axios({
            url: "http://localhost:5000/usuarios/atendentes",
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async listarMedicos() {
        return axios({
            url: "http://localhost:5000/usuarios/medicos",
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async listarPacientes() {
        return axios({
            url: "http://localhost:5000/usuarios/pacientes",
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

}

const usuariosService = new UsuariosService()
export default usuariosService