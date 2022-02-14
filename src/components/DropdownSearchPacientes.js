import "./select-search.css";
import Select from 'react-select'
import { useEffect } from "react";
import pacienteService from "../services/pacienteService";
import { useState } from "react/cjs/react.development";

export default function DropdownSearchPacientes(props) {
    const [options, setOptions] = useState([])
    

    useEffect(() => {
        pacienteService.listarPacientes()
            .then((response) => {
                console.log(response.data.map((elem)=> elem.cpf));
                setOptions([...response.data.map((elem) => {
                    return {
                        value: elem.cpf,
                        label: elem.nome,
                    }
                })])
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <Select
            options={options}
            defaultValue={options[0]}
            isClearable={true}
            isSearchable={true}
            className="w-full m-1"
        />
    );
}
