import axios from "axios";

class UrgenciaService {

    async listarUrgencias() {
        return axios({
            url: "http://localhost:5000/urgencias/listar",
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

const urgenciaService = new UrgenciaService();
export default urgenciaService;
