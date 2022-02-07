
import "./select-search.css";
import SelectSearch, { fuzzySearch } from "react-select-search";
import { useEffect, useRef } from "react";
import pacienteService from "../services/pacienteService";
import { useState } from "react/cjs/react.development";

export default function DropdownSearchPacientes(props) {
    const searchInput = useRef();
    const [items, setItems] = useState([])
    const options = items

    useEffect(() => {
        pacienteService.listarPacientesSelect()
            .then((response) => {
                setItems(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    const handleChange = (...args) => {
        // searchInput.current.querySelector("input").value = "";
        props.setCpfPaciente(args[0])
    };


    return (
        <SelectSearch
            ref={searchInput}
            options={options}
            filterOptions={fuzzySearch}
            value=""
            name="cpf_paciente"
            id="cpf_paciente"
            placeholder="Selecione um paciente"
            search
            className="select-search p-2 h-full"
            onChange={handleChange}
        />
    );
}
