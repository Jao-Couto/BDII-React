import axios from "axios"

class AtendimentosService {

    async CadastrarAtendimentos(data) {
        return axios({
            url: "http://localhost:5000/atendimentos/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: { "content-type": "multipart/form-data" }
        }).then((response) => {
            return Promise.resolve(response)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async listarAtendimentosAtendente() {
        return axios({
            url: "http://localhost:5000/atendimentos/listarAtendente",
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

    async listarAtendimentosMedico() {
        return axios({
            url: "http://localhost:5000/atendimentos/listarMedico",
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

const atendimentosService = new AtendimentosService()
export default atendimentosService