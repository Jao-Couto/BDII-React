import { useEffect, useState } from "react";
import urgenciaService from "../services/urgenciaServices";

export default function DropdownUrgencias(props) {

    const [urgencias, setUrgencias] = useState([]);
    const [color, setColor] = useState("");

    useEffect(() => {
        urgenciaService.listarUrgencias()
            .then((response) => {
                setUrgencias(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const changeColor = ((event) => {
        setColor(event.target[event.target.selectedIndex].style.backgroundColor);
    })

    return (
        <select
            id="urgencia"
            name="cod_urgencia"
            type="text"
            className={"p-2 rounded-sm m-1 border border-gray-200 " + props.size}
            style={{ backgroundColor: color }}
            onChange={changeColor}
        >
            <option disabled selected style={{ backgroundColor: "white" }}>
                Selecione a Urgência
            </option>
            {urgencias.map((item) => {
                return (
                    <option value={item.codigo} key={item.codigo} style={{ backgroundColor: item.cor }}>
                        {item.nome}
                    </option>
                );
            })}
        </select>
    )
}