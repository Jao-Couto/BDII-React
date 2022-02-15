import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaSearch } from 'react-icons/fa'
import atendimentosService from "../services/atendimentosService";

export default function HistoricoAtendimentos() {
    const [atendimentos, setAtendimentos] = useState([]);
    const [columnAtendimentos, setColumnAtendimentos] = useState([]);
    const [atendimentosSorted, setAtendimentosSorted] = useState([]);
    const [isSearchAtendimentos, setIsSearchAtendimentos] = useState(false);
    const [dataIni, setDataIni] = useState('')
    const [dataFim, setDataFim] = useState('')

    useEffect(() => {
        let date = moment().format('YYYY-MM-DD');
        setDataIni(date);
        setDataFim(date);
        atendimentosService.listarAtendimentosHistorico()
            .then((result) => setAtendimentos(result.data))
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

    }, [])

    useEffect(() => {
        setIsSearchAtendimentos(true)
        let searchResult = atendimentos.reduce((aux, data) => {
            let format = data.data_hora.substring(6, 10) + '-' + data.data_hora.substring(3, 5) + '-' + data.data_hora.substring(0, 2)
            if (format >= dataIni && format <= dataFim)
                aux.push(data);
            return aux;
        }, [])
        setAtendimentosSorted(searchResult)
    }, [dataIni, dataFim])

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        //console.log("Selected Rows: ", selectedRows);
    };

    function handleSearch(e, type) {

        let content = e.target.value;
        if (content.length !== 0) {
            setIsSearchAtendimentos(true)
            let searchResult = atendimentos.reduce((aux, data) => {
                if (data[type].toLowerCase().includes(content.toLowerCase()))
                    aux.push(data);
                return aux;
            }, [])
            setAtendimentosSorted(searchResult)
        } else {
            setIsSearchAtendimentos(false)
        }
    }

    function handleChangeDataIni(e) {
        setDataIni(e.target.value)
    }

    function handleChangeDataFim(e) {
        setDataFim(e.target.value)
    }



    const btnStyle = "p-3 cursor-pointer rounded-md bg-green-500 text-white text-base justify-self-end"

    return (
        <div className="flex h-full w-11/12 justify-start text-xl max-w-7xl mt-5">
            <div className="flex flex-col w-full col-span-2">
                <div className="text-4xl m-2 font-thin mb-5">Histórico de Atendimentos</div>

                <div className="grid grid-cols-2 items-center ">
                    <div className='w-full relative justify-center'>
                        <input type='search' className='w-full p-2 pl-12 border outline-none' onChange={(e)=> handleSearch(e, 'nome_medico')} placeholder='Nome do Médico' />
                        <FaSearch className='absolute top-3 left-3' size='24px' />
                    </div>

                    <div className='w-full relative justify-center'>
                        <input type='search' className='w-full p-2 pl-12 border  outline-none' onChange={(e)=> handleSearch(e, 'nome_paciente')} placeholder='Nome do Paciente' />
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
        </div >
    );
}