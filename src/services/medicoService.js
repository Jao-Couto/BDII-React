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
}

const medicoService = new MedicoService();
export default medicoService;
