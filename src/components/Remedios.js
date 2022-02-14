import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from './Modal'
import remediosService from "../services/remediosService";
import { FaSearch } from 'react-icons/fa'
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import CadastroRemedio from "./CadastroRemedio";

export default function Remedios(){
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

    }, [])

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        //console.log("Selected Rows: ", selectedRows);
    };

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

    const btnStyle = "p-3 cursor-pointer rounded-md bg-green-500 text-white text-base justify-self-end"

    return (
        <div className="flex h-full w-11/12 items-center justify-center text-xl max-w-7xl">
            <div className="flex flex-col w-full col-span-2">
                <div className="grid grid-cols-2 items-center mb-10">
                    <div className="text-4xl m-2 font-thin">Remédios</div>
                    <div className={btnStyle} onClick={() => setModalRemediosIsOpen(true)}>Adicionar Remédio</div>
                </div>
                
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
                
            </div>
            <Modal isOpen={modalRemediosIsOpen} handleModal={setModalRemediosIsOpen}>
                <CadastroRemedio finally={()=> window.location.reload()} />
            </Modal>
        </div>
    );
}