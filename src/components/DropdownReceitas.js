import { useEffect, useState } from "react";
import remediosService from "../services/remediosService";

export default function DropdownRemedios(props){

    const [remedios, setRemedios] = useState([]);

    useEffect(() => {
        remediosService.listarRemedios().then((res) => {setRemedios(res.data)})
        
    }, [])

    return(
        <select
          name="remedios"
          type="text"
          className={"p-2 rounded-sm m-1 border border-gray-200 " + props.size}
        >
          {remedios.map((item) => {
            return (
              <option value={item.codigo} key={item.codigo}>
                {item.nome}
              </option>
            );
          })}
        </select>
    )
}