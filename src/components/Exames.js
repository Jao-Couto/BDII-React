import { useEffect, useState } from "react";
import examesService from "../services/examesService";
import DataTable from "react-data-table-component";
import Button from "./Button";
import Modal from './Modal'
import CadastroExames from "./CadastroExames";

import { FaSearch } from 'react-icons/fa'

export default function Exames(){

    const [column, setColumn] = useState([]);
    const [exames, setExames] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [examesSorted, setExamesSorted] = useState([{}]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(()=>{

        setColumn([
            {
                name: 'Codigo',
                selector: (row) => row.codigo
            },
            {
                name: 'Nome',
                selector: (row) => row.nome
            }
        ])

        examesService.listarExames().then((dados)=>{
            console.log(dados);
            setExames(dados.data);
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
            let searchResult = exames.reduce((aux, data)=>{
                if(data.nome.toLowerCase().includes(content.toLowerCase()))
                    aux.push(data);
                return aux;
            }, [])
            setExamesSorted(searchResult)
        }else{
            setIsSearch(false)
        }

    }

    return (
      <>
        <div className="bg-white flex flex-col h-full justify-center items-centers w-10/12">
            <h1 className="text-5xl text-center mb-5">Lista de Exames</h1>
            <div className='w-full relative justify-center'>
                <input type='search' className='w-full p-2 pl-12 border my-5 outline-none' onChange={handleSearch} placeholder='Nome do Paciente'/>
                <FaSearch className='absolute top-7 left-3' size='24px'/>
            </div>
            <DataTable
                columns={column}
                data={(isSearch ? examesSorted : exames)}
                selectableRows
                pagination
                onSelectedRowsChange={handleChange}
                highlightOnHover
                striped
            />
            <Button
                name="Adicionar exame"
                width="w-1/4"
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
    );
}