import { useEffect, useState } from "react";
import examesService from "../services/examesService";
import DataTable from "react-data-table-component";
import Button from "./Button";
import Modal from './Modal'
import CadastroExames from "./CadastroExames";

import remediosService from "../services/remediosService";

import { FaSearch } from 'react-icons/fa'
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";

export default function Exames(){

    //Exames
    const [columnTiposExames, setColumnTiposExames] = useState([]);
    const [columnExamesSolicitados, setColumnExamesSolicitados] = useState([]);
    const [tiposExames, setTiposExames] = useState([]);
    const [examesSolicitados, setExamesSolicitados] = useState([]);
    const [isSearchExames, setIsSearchExames] = useState(false);
    const [examesSorted, setExamesSorted] = useState([{}]);
    const [modalExamesIsOpen, setModalExamesIsOpen] = useState(false);

    useEffect(()=>{

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
    
    const TiposExamesComponent = 

      <>
        <div className="bg-white flex flex-col h-full justify-center items-centers w-full">
            
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
            </div>
            
        </>
    ;

    const btnStyle = "p-3 cursor-pointer rounded-md bg-green-500 text-white text-base justify-self-end"

    return (
        <div className="flex h-full w-11/12 place-content-evenly items-center justify-center text-xl max-w-7xl">
            <Tabs className="w-full col-span-3 justify-self-end">
                <div className="grid grid-cols-2 mb-10 items-center">
                    <div className="text-4xl m-2  font-thin">Exames</div>
                    <div className={btnStyle} onClick={() => setModalExamesIsOpen(true)}> Adicionar Exame</div>
                </div>
                
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
            <Modal isOpen={modalExamesIsOpen} handleModal={setModalExamesIsOpen}>
                <CadastroExames/>
            </Modal>
        </div>
    );
}