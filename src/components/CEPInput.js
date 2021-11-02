import { useContext, useState } from "react";
import enderecoContext from "../services/enderecoContext";
import cadastroUsuarioService from "../services/CadastroUsuarioService";

export default function CEPinput(){

    async function getCEPFromForm(cep) {
        if (cep.length === 9) {
          let response = await cadastroUsuarioService.getAddressByCEP(cep.replace("-", ""));
          if (!response.erro) {
            enderecos.setBairro(response.bairro);
            enderecos.setCidade(response.localidade);
            enderecos.setEstado(response.uf);
            enderecos.setRua(response.logradouro);
          }
        }
    }

    const enderecos = useContext(enderecoContext);
    const [cep, setCEP] = useState("");

    return(
     
        <input
            id="cep"
            name="cep"
            type="text"
            className="p-2 rounded-sm w-1/2 border border-gray-200 h-form-input m-1"
            value={cep}
            onChange={(elem) => {
              setCEP(elem.target.value);
              getCEPFromForm(elem.target.value);
            }}
            placeholder="CEP"
            required
          ></input>

    );

}