import axios from "axios"

class PacienteService {

    async cadastrarPaciente(data) {
        return axios({
            url: "http://192.168.1.240:3000/paciente/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
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
            url: "http://localhost:5000/pacientes/listar",
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

    async listarPacientesSelect() {
        return axios({
            url: "http://localhost:5000/pacientes/listarToSelect",
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

    async deletarPaciente(data) {
        return axios({
            url: "http://192.168.1.240:3000/atendimentos/delete/" + data,
            method: "DELETE",
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

const pacienteService = new PacienteService()
export default pacienteService