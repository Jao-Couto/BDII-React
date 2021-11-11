import { useEffect, useState } from "react";
import medicoService from "../services/medicoService";
import DataTable from "react-data-table-component";
import Button from "./Button";
import Modal from './Modal'
import CadastroPlantao from "./CadastroPlantao";


export default function Plantao(){

    const [column, setColumn] = useState([]);
    const [plantoes, setPlantoes] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(()=>{

        setColumn([
            {
                name: 'Codigo',
                selector: (row) => row.codigo
            },
            {
                name: 'Data/Hora de entrada',
                selector: (row) => new Date(row.DataHora_Entrada).toLocaleString('pt-BR', { timeZone: 'UTC' })
            },
            {
                name: 'Data/Hora de saída',
                selector: (row) => new Date(row.DataHora_Saida).toLocaleString('pt-BR', { timeZone: 'UTC' })
            }
        ])

        medicoService.listarPlantao().then((dados)=>{
            //console.log(dados.data);
            setPlantoes(dados.data);
        })

    },[])

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        //console.log("Selected Rows: ", selectedRows);
    };

    return (
      <>
        <div className="bg-white flex flex-col h-full justify-center items-centers w-10/12">
            <h1 className="text-5xl text-center mb-5">Seus Plantões</h1>
            <div className='w-full relative justify-center'>
                
            </div>
            <DataTable
                data={plantoes}
                columns={column}
                selectableRows
                pagination
                onSelectedRowsChange={handleChange}
                highlightOnHover
                striped
            />
            <Button
                name="Adicionar plantão"
                width="w-1/4"
                backdrop="bg-white"
                styles="mr-0 ml-auto text-white"
                color="bg-green-600 cursor-pointer"
                onClick={()=>setModalIsOpen(true)}
            />
            </div>
            <Modal isOpen={modalIsOpen} handleModal={setModalIsOpen}>
                <CadastroPlantao />
            </Modal>
        </>
    );
}