import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from './Modal'
import remediosService from "../services/remediosService";
import { FaSearch } from 'react-icons/fa'
import CadastroRemedio from "./CadastroRemedio";
import planoDeSaudeService from "../services/planoDeSaudeService";
import CadastroPlano from "./CadastroPlano";

export default function ExamesERemedios(){
    const [planos, setPlanos] = useState([]);
    const [columnPlanos, setColumnPlanos] = useState([]);
    const [planosSorted, setPlanosSorted] = useState([]);
    const [isSearchPlanos, setIsSearchPlanos] = useState(false);
    const [modalPlanosIsOpen, setModalPlanosIsOpen] = useState(false);


    useEffect(()=>{
        planoDeSaudeService.getPlanos().then((result) => setPlanos(result.data))

        setColumnPlanos([
            {
                name: 'Codigo',
                selector: (row) => row.codigo
            },
            {
                name: 'Nome',
                selector: (row) => row.nome
            }
        ])

    }, [])

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        //console.log("Selected Rows: ", selectedRows);
    };

    function handleSearchRemedios(e){
        let content = e.target.value;
        if(content.length !== 0){
            setIsSearchPlanos(true)
            let searchResult = planos.reduce((aux, data)=>{
                if(data.name.toLowerCase().includes(content.toLowerCase()))
                    aux.push(data);
                return aux;
            }, [])
            setPlanosSorted(searchResult)
        }else{
            setIsSearchPlanos(false)
        }
    }

    const btnStyle = "p-3 cursor-pointer rounded-md bg-green-500 text-white text-base justify-self-end"

    return (
        <div className="flex h-full w-11/12 items-center justify-center text-xl max-w-7xl">
            <div className="flex flex-col w-full col-span-2">
                <div className="grid grid-cols-2 items-center mb-10">
                    <div className="text-4xl m-2 font-thin">Planos de Saude</div>
                    <div className={btnStyle} onClick={() => setModalPlanosIsOpen(true)}>Adicionar Plano</div>
                </div>
                
                <div className='w-full relative justify-center'>
                    <input type='search' className='w-full p-2 pl-12 border my-5 outline-none' onChange={handleSearchRemedios} placeholder='Nome do Remédio'/>
                    <FaSearch className='absolute top-7 left-3' size='24px'/>
                </div>
                <DataTable
                    columns={columnPlanos}
                    data={(isSearchPlanos ? planosSorted : planos)}
                    pagination
                    onRowClicked={handleChange}
                    highlightOnHover
                    striped />
                
            </div>
            <Modal isOpen={modalPlanosIsOpen} handleModal={setModalPlanosIsOpen}>
                <CadastroPlano finally={()=> window.location.reload()} />
            </Modal>
        </div>
    );
}