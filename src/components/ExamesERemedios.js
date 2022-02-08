import { useEffect, useState } from "react";
import examesService from "../services/examesService";
import DataTable from "react-data-table-component";
import Button from "./Button";
import Modal from './Modal'
import CadastroExames from "./CadastroExames";

import remediosService from "../services/remediosService";

import { FaSearch } from 'react-icons/fa'
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";

export default function ExamesERemedios(){
    //Exames
    const [columnTiposExames, setColumnTiposExames] = useState([]);
    const [columnExamesSolicitados, setColumnExamesSolicitados] = useState([]);
    const [tiposExames, setTiposExames] = useState([]);
    const [examesSolicitados, setExamesSolicitados] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [examesSorted, setExamesSorted] = useState([{}]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    //Remedios
    const [remedios, setRemedios] = useState([]);
    const [columnRemedios, setColumnRemedios] = useState([]);


    useEffect(()=>{
        remediosService.listarRemedios().then((res) => {setRemedios(res.data)})

        setColumnRemedios([
            {
                name: 'Codigo',
                selector: (row) => row.codigo
            },
            {
                name: 'Nome',
                selector: (row) => row.nome
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

    },[])

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log("Selected Rows: ", selectedRows);
    };

    function handleSearch(e){
        let content = e.target.value;
        if(content.length !== 0){
            setIsSearch(true)
            let searchResult = tiposExames.reduce((aux, data)=>{
                if(data.name.toLowerCase().includes(content.toLowerCase()))
                    aux.push(data);
                return aux;
            }, [])
            setExamesSorted(searchResult)
        }else{
            setIsSearch(false)
        }
    }
    
    const TiposExamesComponent = 

      <>
        <div className="bg-white flex flex-col h-full justify-center items-centers w-10/12">

            <div className='w-full relative justify-center'>
                <input type='search' className='w-full p-2 pl-12 border my-5 outline-none' onChange={handleSearch} placeholder='Nome do Exame'/>
                <FaSearch className='absolute top-7 left-3' size='24px'/>
            </div>
            <DataTable
                columns={columnTiposExames}
                data={(isSearch ? examesSorted : tiposExames)}
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
                onClick={()=>setModalIsOpen(true)}
            />
            </div>
            <Modal isOpen={modalIsOpen} handleModal={setModalIsOpen}>
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
            
            <DataTable
                    columns={columnRemedios}
                    data={remedios}
                    pagination
                    onRowClicked={handleChange}
                    highlightOnHover
                    striped />
        </div>
        </>
    );
}