import axios from "axios"

class PlanoDeSaude {


    async cadastrarPlano(data) {

        return axios({
            url: "http://localhost:5000/planosDeSaude/cadastrar",
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

    async getPlanos() {
        return axios({
            url: "http://localhost:5000/planosDeSaude/listar/",
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

const planoDeSaudeService = new PlanoDeSaude()
export default planoDeSaudeService