import "./select-search.css";
import Select from 'react-select'
import { useEffect } from "react";
import planoDeSaudeService from "../services/planoDeSaudeService";
import { useState } from "react/cjs/react.development";

export default function DropdownPlanoSaude(props) {
    const [options, setOptions] = useState([])

    const handleChange = e => {
        props.setPlanoSaude(e.value);
    }


    useEffect(() => {
        planoDeSaudeService.getPlanos()
            .then((response) => {
                setOptions([...response.data.map((elem) => {
                    return {
                        value: elem.codigo,
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
            isClearable={true}
            isSearchable={true}
            className="w-1/2 m-1"
            onChange={handleChange}
        />
    );
}
