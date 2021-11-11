import axios from "axios"

class AtendenteService {

    async getAtendente(data) {
        return axios({
            url: "http://localhost:5000/atendentes/getAtendente/" + data,
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

    async deletarAtendente(data) {
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

const atendenteService = new AtendenteService()
export default atendenteService