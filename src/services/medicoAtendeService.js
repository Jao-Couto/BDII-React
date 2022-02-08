import axios from "axios";

class MedicoAtendeService {

  async cadastrarMedicoAtende(data) {
    try {
      const cadastro = await axios({
        url: "http://localhost:5000/medicoAtende/cadastrar",
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

  async cadastrarDiagnostico(data) {
    try {
      const cadastro = await axios({
        url: "http://localhost:5000/medicoAtende/cadastrarDiagnostico",
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

  async historicoDiagnostico(data) {
    try {
      const cadastro = await axios({
        url: "http://localhost:5000/medicoAtende/historicoDiagnostico",
        method: "GET",
        timeout: 5000,
        params:{
          codigo_ma: data
        },
        header: {
          Accept: "application/json",
        },
      });
      return cadastro;
    } catch (error) {
      throw error;
    }
  }



}

const medicoAtendeService = new MedicoAtendeService();
export default medicoAtendeService;
