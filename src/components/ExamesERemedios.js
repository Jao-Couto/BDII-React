import { useEffect, useState } from "react";
import examesService from "../services/examesService";
import DataTable from "react-data-table-component";
import Button from "./Button";
import Modal from './Modal'
import CadastroExames from "./CadastroExames";

import remediosService from "../services/remediosService";

import { FaSearch } from 'react-icons/fa'
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import CadastroRemedio from "./CadastroRemedio";

export default function ExamesERemedios(){
    //Exames
    const [columnTiposExames, setColumnTiposExames] = useState([]);
    const [columnExamesSolicitados, setColumnExamesSolicitados] = useState([]);
    const [tiposExames, setTiposExames] = useState([]);
    const [examesSolicitados, setExamesSolicitados] = useState([]);
    const [isSearchExames, setIsSearchExames] = useState(false);
    const [examesSorted, setExamesSorted] = useState([{}]);
    const [modalExamesIsOpen, setModalExamesIsOpen] = useState(false);
    //Remedios
    const [remedios, setRemedios] = useState([]);
    const [columnRemedios, setColumnRemedios] = useState([]);
    const [remediosSorted, setRemediosSorted] = useState([]);
    const [isSearchRemedios, setIsSearchRemedios] = useState(false);
    const [modalRemediosIsOpen, setModalRemediosIsOpen] = useState(false);


    useEffect(()=>{
        remediosService.listarRemedios().then((res) => {setRemedios(res.data)})

        setColumnRemedios([
            {
                name: 'Codigo',
                selector: (row) => row.value
            },
            {
                name: 'Nome',
                selector: (row) => row.name
            }
        ])

        setColumnTiposExames([
            {
                name: 'Codigo',
                selector: (row) => row.value
            },
            {
                name: 'Nome',
                selector: (row) => row.name
            }
        ])

        setColumnExamesSolicitados([
            {
                name: 'Codigo do Atendimento',
                selector: (row) => row.cod_atendimento
            },
            {
                name: 'Exame',
                selector: (row) => row.nome_exame
            },
            {
                name: 'Data',
                selector: (row) => row.data
            },
            {
                name: 'Descrição',
                selector: (row) => row.descricao
            }
        ])

        examesService.listarTiposDeExames().then((dados)=>{
            setTiposExames(dados.data);
        })

        examesService.listarExamesSolicitados().then((dados)=>{
            console.log(dados.data);

            dados.data.forEach((elem, ind) => {
                let data = new Date(elem.data);
                let dataFormat = data.toLocaleString('pt-BR', { timeZone: 'UTC' });
                elem.data = dataFormat;
            });

            setExamesSolicitados(dados.data);
        })

    }, [])

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        //console.log("Selected Rows: ", selectedRows);
    };


    function handleSearchExames(e){
        let content = e.target.value;
        if(content.length !== 0){
            setIsSearchExames(true)
            let searchResult = tiposExames.reduce((aux, data)=>{
                if(data.name.toLowerCase().includes(content.toLowerCase()))
                    aux.push(data);
                return aux;
            }, [])
            setExamesSorted(searchResult)
        }else{
            setIsSearchExames(false)
        }
    }

    function handleSearchRemedios(e){
        let content = e.target.value;
        if(content.length !== 0){
            setIsSearchRemedios(true)
            let searchResult = remedios.reduce((aux, data)=>{
                if(data.name.toLowerCase().includes(content.toLowerCase()))
                    aux.push(data);
                return aux;
            }, [])
            setRemediosSorted(searchResult)
        }else{
            setIsSearchRemedios(false)
        }
    }
    
    const TiposExamesComponent = 

      <>
        <div className="bg-white flex flex-col h-full justify-center items-centers w-10/12">

            <div className='w-full relative justify-center'>
                <input type='search' className='w-full p-2 pl-12 border my-5 outline-none' onChange={handleSearchExames} placeholder='Nome do Exame'/>
                <FaSearch className='absolute top-7 left-3' size='24px'/>
            </div>
            <DataTable
                columns={columnTiposExames}
                data={(isSearchExames ? examesSorted : tiposExames)}
                selectableRows
                pagination
                onSelectedRowsChange={handleChange}
                highlightOnHover
                striped
            />
            <Button
                name="Adicionar exame"
                width="w-1/2"
                backdrop="bg-white"
                styles="mr-0 ml-auto text-white"
                color="bg-green-600 cursor-pointer"
                onClick={()=>setModalExamesIsOpen(true)}
            />
            </div>
            <Modal isOpen={modalExamesIsOpen} handleModal={setModalExamesIsOpen}>
                <CadastroExames/>
            </Modal>
        </>
    ;

    return (
        <>
        <Tabs className="flex flex-col h-3/4 w-1/2 bg-white text-xl">
            <TabList className="flex pb-3">
                <Tab className="px-3 rounded-sm" selectedClassName="border-b-2 bg-gray-100">Tipos de Exames</Tab>
                <Tab className="px-3 rounded-sm" selectedClassName="border-b-2 bg-gray-100">Exames Solicitados</Tab>
            </TabList>
    
            <TabPanel className="w-full justify-center items-center">
                {TiposExamesComponent}
            </TabPanel>

            <TabPanel className="w-full justify-center items-center">
                <DataTable
                    columns={columnExamesSolicitados}
                    data={examesSolicitados}
                    pagination
                    onRowClicked={handleChange}
                    highlightOnHover
                    striped
                />
            </TabPanel>
        </Tabs>
        <div className="flex flex-col h-3/4 w-1/4">
            <div className='w-full relative justify-center'>
                <input type='search' className='w-full p-2 pl-12 border my-5 outline-none' onChange={handleSearchRemedios} placeholder='Nome do Remédio'/>
                <FaSearch className='absolute top-7 left-3' size='24px'/>
            </div>
            <DataTable
                columns={columnRemedios}
                data={(isSearchRemedios ? remediosSorted : remedios)}
                pagination
                onRowClicked={handleChange}
                highlightOnHover
                striped />
            <Button
                name="Adicionar remédio"
                width="w-1/2"
                backdrop="bg-white"
                styles="mr-0 ml-auto text-white"
                color="bg-green-600 cursor-pointer"
                onClick={()=>setModalRemediosIsOpen(true)}
            />
        </div>
        <Modal isOpen={modalRemediosIsOpen} handleModal={setModalRemediosIsOpen}>
            <CadastroRemedio finally={()=> window.location.reload()} />
        </Modal>
        </>
    );
}