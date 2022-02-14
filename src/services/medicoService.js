import axios from "axios";

class MedicoService {
  async cadastrarMedico(data) {
    try {
      const cadastro = await axios({
        url: "http://localhost:5000/medicos/cadastrar",
        method: "POST",
        timeout: 5000,
        data: data,
        header: {
          Accept: "application/json",
        },
      });
      return cadastro;
    } catch (error) {
      throw error;
    }
  }

  async loginMedico(data) {
    try {
      const login = await axios({
        url: "http://localhost:5000/login",
        method: "POST",
        timeout: 5000,
        data: data,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      return login;
    } catch (error) {
      throw error;
    }
  }

  async listarMedicos() {
    try {
      const listarMed = await axios({
        url: "http://localhost:5000/medicos/listar",
        method: "GET",
        timeout: 5000,
        header: {
          Accept: "application/json",
        },
      });
      return listarMed;
    } catch (error) {
      throw error;
    }
  }

  async getMedico() {
    try {
      const token = await localStorage.getItem("token");
      const getMedico = await axios({
        url: `http://localhost:5000/medicos/get/${localStorage.getItem(
          "email"
        )}:${token}`,
        method: "GET",
        timeout: 5000,
        header: {
          Accept: "application/json",
        },
      });
      return getMedico;
    } catch (error) {
      throw error;
    }
  }

  async listarPlantao() {
    try {
      const crm = await (await this.getMedico()).data.crm;
      const token = await localStorage.getItem("token");
      const plantoes = await axios({
        url: `http://localhost:5000/plantao/listar/${crm}:${token}`,
        method: "GET",
        timeout: 5000,
        header: {
          Accept: "application/json",
        },
      });
      return plantoes;
    } catch (error) {
      throw error;
    }
  }

  async listarEspecializacao() {
    try {
      const especializacoes = await axios({
        url: `http://localhost:5000/espec/listar`,
        method: "GET",
        timeout: 5000,
        header: {
          Accept: "application/json",
        },
      });
      return especializacoes;
    } catch (error) {
      throw error;
    }
  }

  async adicionarPlantao(dataEntrada, dataSaida) {
    try {
      const crm = await (await this.getMedico()).data.crm;
      const token = await localStorage.getItem("token");
      const addPlantao = await axios({
        url: "http://localhost:5000/plantao/add",
        method: "POST",
        timeout: 5000,
        data: {
          crm: crm,
          token: token,
          dt_hr_ent: dataEntrada,
          dt_hr_sai: dataSaida,
        },
        header: {
          Accept: "application/json",
        },
      });
      return addPlantao;
    } catch (error) {
      throw error;
    }
  }
}

const medicoService = new MedicoService();
export default medicoService;
