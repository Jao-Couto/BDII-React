import axios from "axios";

class CadastroUsuarioService {

  async CadastrarUsuarios(e, url) {
    e.preventDefault();
    let data = new FormData(e.target);
    data.set('salario', parseFloat(data.get('salario')))
    console.log(data.get("salario"));
    await axios
      .post(`http://localhost:5000/${url}`, data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.affectedRows === 1) {
          console.log("Cadastrado com sucesso");
          window.location.href = "/";
        }
        else alert(response.data);
      })
      .catch((err) => console.log(err));
  }

  async getPaises(setPaises) {
    let response = await fetch(
      "http://www.geonames.org/childrenJSON?geonameId=6255150",
      { method: "GET" }
    ).then((response) => response.json());
    setPaises(response.geonames);
  }

  async getAddressByCEP(cep) {
    let address = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {
      method: "GET",
    }).then((response) => response.json());
    return address;
  }

}

const cadastroUsuarioService = new CadastroUsuarioService();

export default cadastroUsuarioService;