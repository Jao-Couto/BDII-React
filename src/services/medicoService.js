import axios from "axios"

class MedicoService{
    

    async cadastrarMedico(data){
        
        return axios({
            url: "http://localhost:5000/medicos/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
            header:{
                Accept: 'application/json'
            }
        }).then((response)=>{
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async loginMedico(data){
        
        return axios({
            url: "http://localhost:5000/login",
            method: "POST",
            timeout: 5000,
            data: data,
            headers:{
                "Access-Control-Allow-Origin": "*"
            }
        }).then((response)=>{
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

    async listarMedicos(){
        return axios({
            url: "http://localhost:5000/medicos/listar",
            method: "GET",
            timeout: 5000,
            header:{
                Accept: 'application/json'
            }
        }).then((response)=>{
            return Promise.resolve(response)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    }

}

const medicoService = new MedicoService()
export default medicoService