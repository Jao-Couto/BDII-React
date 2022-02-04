import axios from "axios"

class RemediosService {


    async cadastrarRemedios(data) {

        return axios({
            url: "http://localhost:5000/remedios/cadastrar",
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

    async listarRemedios() {
        return axios({
            url: "http://localhost:5000/remedios/listar",
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

    async atualizarRemedio(cod, data) {
        return axios({
            url: `http://localhost:5000/remedios/atualizar/${cod}`,
            method: "PATCH",
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


}

const remediosService = new RemediosService()
export default remediosService