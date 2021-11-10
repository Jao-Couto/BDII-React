import axios from "axios"

class AtendimentosService {


    async CadastrarAtendimentos(e, url) {
        e.preventDefault();
        let data = new FormData(e.target);
        console.log(data.get("cpf_atendente"));
        await axios
            .post(`http://localhost:5000/${url}`, data, {
                headers: { "content-type": "multipart/form-data" },
            })
            .then((response) => {
                if (response.data === "1") console.log("Cadastrado com sucesso");
                else console.log(response.data);
            })
            .catch((err) => console.log(err));
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