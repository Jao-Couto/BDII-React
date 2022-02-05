import axios from "axios"

class ReceitaService {


    async cadastrarReceita(data) {

        return axios({
            url: "http://localhost:5000/receitas/add",
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

    async listarRemedios(cod) {
        return axios({
            url: "http://localhost:5000/receitas/listar/" + cod,
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

const receitaService = new ReceitaService()
export default receitaService