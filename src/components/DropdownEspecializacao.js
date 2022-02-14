import "./select-search.css";
import Select from 'react-select'
import { useEffect } from "react";
import medicoService from "../services/medicoService";
import { useState } from "react/cjs/react.development";

export default function DropdownSearchEspecializacao(props) {
    const [options, setOptions] = useState([])
    

    useEffect(() => {
        medicoService.listarEspecializacao()
            .then((response) => {
                setOptions([...response.data.map((elem) => {
                    return {
                        value: elem.value,
                        label: elem.name,
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
            className="w-1/2 m-1"
        />
    );
}
