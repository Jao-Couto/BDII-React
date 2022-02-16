import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import medicoAtendeService from "../services/medicoAtendeService";
import ListarExames from "./ListarExames";
import ListarReceitas from "./ListarReceitas";


export default function DetalheHistorico(props) {
    const [dados, setDados] = useState([]);
    const [columns, setColumns] = useState([]);

    console.log("atedddd" + props.atendimento);
    useEffect(() => {
        setColumns([
            {
                name: 'Historico',
                wrap: true,
                maxWidth: '350px',
                selector: row => `${row.diagnostico}`
            }
        ])
        medicoAtendeService.historicoDiagnostico(props.cod_ma).then((res) => setDados(res.data))
    }, [])
    return (
        <div className="container flex flex-col bg-white rounded-md p-5">
            <h1 className='text-start text-xl font-bold mb-5'>Detalhes atendimento {props.atendimento}</h1>

            <h1 className='text-start text-xl font-bold mb-2'>Exames</h1>
            <ListarExames atendimento={props.atendimento} att={1}></ListarExames>

            <h1 className='text-start text-xl font-bold mb-2 mt-5'>Remédios</h1>
            <ListarReceitas atendimento={props.atendimento} att={1}></ListarReceitas>

            <h1 className='text-start text-xl font-bold mb-2 mt-5'>Diagnóstico</h1>
            <div className="h-auto overflow-auto">
                <DataTable
                    columns={columns}
                    data={dados}
                />
            </div>
        </div>
    );
}