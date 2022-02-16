import axios from "axios";

class DashboardService {

    async dadosDosRemedios() {
        return axios({
            url: "http://localhost:5000/dash/remedios/",
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

    async dadosDosPlanosDeSaude() {
        return axios({
            url: "http://localhost:5000/dash/planos_de_saude/",
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

    async dadosDasUrgencias() {
        return axios({
            url: "http://localhost:5000/dash/urgencias/",
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

    async dadosDasEspecializacoes() {
        return axios({
            url: "http://localhost:5000/dash/espec/",
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

    async totalPacientes() {
        return axios({
            url: "http://localhost:5000/dash/total_pacientes/",
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response.data[0].total_pacientes)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async totalAtendimentosConcluidos() {
        return axios({
            url: "http://localhost:5000/dash/total_atendimentos_concluidos/",
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response.data[0].total_conclusao)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async totalAtendimentosAndamento() {
        return axios({
            url: "http://localhost:5000/dash/total_atendimentos_andamento/",
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response.data[0].total_andamento)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async totalAtendimentosEspera() {
        return axios({
            url: "http://localhost:5000/dash/total_atendimentos_espera/",
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response.data[0].total_espera)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

    async totalGastosSalario() {
        return axios({
            url: "http://localhost:5000/dash/total_salario/",
            method: "GET",
            timeout: 5000,
            header: {
                Accept: 'application/json'
            }
        }).then((response) => {
            return Promise.resolve(response.data[0].total_gasto)
        }).catch((error) => {
            return Promise.reject(error)
        })
    }

}

const dashboardService = new DashboardService();

export default dashboardService;