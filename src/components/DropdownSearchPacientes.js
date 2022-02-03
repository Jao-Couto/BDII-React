
import "./styles.css"
import SelectSearch from "react-select-search";
import { useEffect, useRef } from "react";
import pacienteService from "../services/pacienteService";
import { useState } from "react/cjs/react.development";

export default function DropdownSearchPacientes() {
    const searchInput = useRef();
    const [items, setItems] = useState([])
    const options = [
        {
            type: "group",
            name: "Pacientes",
            items: items
        },
    ];

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
        console.log("ARGS:", args[0]);
    };

    const handleFilter = (items) => {
        return (searchValue) => {
            if (searchValue.length === 0) {
                return options;
            }
            const updatedItems = items.map((list) => {
                const newItems = list.items.filter((item) => {
                    return item.name.toLowerCase().includes(searchValue.toLowerCase());
                });
                return { ...list, items: newItems };
            });
            return updatedItems;
        };
    };

    return (
        <SelectSearch
            ref={searchInput}
            options={options}
            filterOptions={handleFilter}
            value=""
            name="cpf_paciente"
            placeholder="Selecione um paciente"
            search
            onChange={handleChange}
            className="select-search rounded-sm m-1 h-form-input"
        />
    );
}
