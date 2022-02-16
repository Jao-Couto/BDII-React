import { useEffect, useState } from "react";
import cadastroUsuarioService from "../services/CadastroUsuarioService";

export default function DropdownPaises(props) {

  const [paises, setPaises] = useState([]);

  useEffect(() => {
    cadastroUsuarioService.getPaises(setPaises);
  }, [])

  let def = '';
  return (
    <select
      id="pais"
      name="pais"
      type="text"
      className={"p-2 rounded-sm m-1 border border-gray-200 " + props.size}
    >
      <option value="" disabled>
        País
      </option>
      {paises.map((item) => {

        if (item.name == "Brazil")
          return (
            <option value={item.name} selected def key={item.geonameId}>
              {item.name}
            </option>
          );
        else
          return (
            <option value={item.name} def key={item.geonameId}>
              {item.name}
            </option>
          );
      })}
    </select>
  )
}