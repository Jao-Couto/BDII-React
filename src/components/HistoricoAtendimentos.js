import moment from "moment";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from 'react-icons/fa'
import atendimentosService from "../services/atendimentosService";
import Modal from "./Modal";
import DetalheHistorico from "./DetalheHistorico";
import { log } from "@craco/craco/lib/logger";

export default function HistoricoAtendimentos() {
    const [atendimentos, setAtendimentos] = useState([]);
    const [columnAtendimentos, setColumnAtendimentos] = useState([]);
    const [atendimentosSorted, setAtendimentosSorted] = useState([]);
    const [isSearchAtendimentos, setIsSearchAtendimentos] = useState(false);
    const [dataIni, setDataIni] = useState('')
    const [dataFim, setDataFim] = useState('')
    const [nomeMedico, setNomeMedico] = useState('')
    const [nomePaciente, setNomePaciente] = useState('')
    const [modalDetalhes, setModalDetalhes] = useState(false);
    const [atendimentoSelected, setAtendimentoSelected] = useState('')
    const [codigoMa, setCodigoMa] = useState('')

    useEffect(() => {
        atendimentosService.listarAtendimentosHistorico()
            .then((result) => {
                setAtendimentos(result.data)
            })
            .catch((error) => console.log(error))

        setColumnAtendimentos([
            {
                name: 'Codigo',
                selector: (row) => row.cod_atendimento
            },
            {
                name: 'Nome Paciente',
                selector: (row) => row.nome_paciente
            },
            {
                name: 'Nome Médico',
                selector: (row) => row.nome_medico
            },
            {
                name: 'Diagnóstico',
                selector: (row) => row.diagnostico
            },
            {
                name: 'Data',
                selector: (row) => row.data_hora
            },


        ])

        let date = moment().format('YYYY-MM-DD');
        setDataIni(date);
        setDataFim(date);
    }, [])

    useEffect(() => {
        setIsSearchAtendimentos(true)
        let searchResult = atendimentos.reduce((aux, data) => {
            let format = data.data_hora.substring(6, 10) + '-' + data.data_hora.substring(3, 5) + '-' + data.data_hora.substring(0, 2)
            let ifMedico = ''
            let ifPaciente = ''
            if (nomeMedico != '')
                ifMedico = data.nome_medico.toLowerCase().includes(nomeMedico.toLowerCase())
            else
                ifMedico = true;
            if (nomePaciente != '')
                ifPaciente = data.nome_paciente.toLowerCase().includes(nomePaciente.toLowerCase())
            else
                ifPaciente = true;
            if (format >= dataIni && format <= dataFim && ifMedico && ifPaciente)
                aux.push(data);
            return aux;
        }, [])
        setAtendimentosSorted(searchResult)
    }, [dataIni, dataFim, nomeMedico, nomePaciente, atendimentos])

    const handleChange = (rowData) => {
        setAtendimentoSelected(rowData.cod_atendimento)
        setCodigoMa(atendimentos.find((atend) => atend.cod_atendimento == rowData.cod_atendimento).codigo_ma)
        setModalDetalhes(true)

    };

    function handleChangeMedico(e) {
        setNomeMedico(e.target.value)
    }

    function handleChangePaciente(e) {
        setNomePaciente(e.target.value)
    }

    function handleChangeDataIni(e) {
        setDataIni(e.target.value)
    }

    function handleChangeDataFim(e) {
        setDataFim(e.target.value)
    }

    return (
        <div className="flex h-full w-11/12 justify-start text-xl max-w-7xl mt-5">
            <div className="flex flex-col w-full col-span-2">
                <div className="text-4xl m-2 font-thin mb-5">Histórico de Atendimentos</div>

                <div className="grid grid-cols-2 items-center ">
                    <div className='w-full relative justify-center'>
                        <input type='search' className='w-full p-2 pl-12 border outline-none' onChange={handleChangeMedico} placeholder='Nome do Médico' />
                        <FaSearch className='absolute top-3 left-3' size='24px' />
                    </div>

                    <div className='w-full relative justify-center'>
                        <input type='search' className='w-full p-2 pl-12 border  outline-none' onChange={handleChangePaciente} placeholder='Nome do Paciente' />
                        <FaSearch className='absolute top-3 left-3' size='24px' />
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center mt-2">
                    <div className='w-full relative justify-center'>
                        <input
                            type="date"
                            className="w-full p-2 pl-12 border  outline-none"
                            value={dataIni}
                            onChange={handleChangeDataIni}
                            required
                        ></input >
                        <FaSearch className='absolute top-3 left-3' size='24px' />
                    </div>

                    <div className='w-full relative justify-center'>
                        <input
                            type="date"
                            className="w-full p-2 pl-12 border  outline-none"
                            value={dataFim}
                            onChange={handleChangeDataFim}
                            required
                        ></input >
                        <FaSearch className='absolute top-3 left-3' size='24px' />
                    </div>
                </div>
                <DataTable
                    columns={columnAtendimentos}
                    data={(isSearchAtendimentos ? atendimentosSorted : atendimentos)}
                    pagination
                    onRowClicked={handleChange}
                    highlightOnHover
                    striped />

            </div>

            {(modalDetalhes) ?
                <Modal isOpen={modalDetalhes} handleModal={setModalDetalhes}>
                    <DetalheHistorico atendimento={atendimentoSelected} cod_ma={codigoMa}></DetalheHistorico>
                </Modal> : <></>}

        </div >
    );
}