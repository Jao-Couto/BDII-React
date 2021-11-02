import { useEffect, useState } from "react";
import cadastroUsuarioService from "../services/CadastroUsuarioService";

export default function DropdownPaises(props){

    const [paises, setPaises] = useState([]);

    useEffect(()=>{
        cadastroUsuarioService.getPaises(setPaises);
    },[])

    return(
        <select
          id="pais"
          name="pais"
          type="text"
          className={"p-2 rounded-sm m-1 border border-gray-200 " + props.size}
        >
          <option value="" defaultValue disabled>
            País
          </option>
          {paises.map((item) => {
            return (
              <option value={item.name} key={item.geonameId}>
                {item.name}
              </option>
            );
          })}
        </select>
    )
}