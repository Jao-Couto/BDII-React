import axios from "axios"

class ExamesService {


    async cadastrarExames(data) {

        return axios({
            url: "http://localhost:5000/exames/cadastrar",
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

    async solicitarExame(data) {

        return axios({
            url: "http://localhost:5000/exames/solicitar",
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

    async listarExamesSolicitados(data) {
        console.log("entrou" + data);
        return axios({
            url: "http://localhost:5000/exames/listarExamesSolicitados/" + data,
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

    async listarAllExamesSolicitados() {
        return axios({
            url: "http://localhost:5000/exames/listarAllExamesSolicitados",
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

    async listarTiposDeExames() {
        return axios({
            url: "http://localhost:5000/exames/listarTiposDeExames",
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

const examesService = new ExamesService()
export default examesService