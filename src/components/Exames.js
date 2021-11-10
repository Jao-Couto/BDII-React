import { useEffect, useState } from "react";
import examesService from "../services/examesService";
import DataTable from "react-data-table-component";
import Button from "./Button";
import Modal from './Modal'
import CadastroExames from "./CadastroExames";

export default function Exames(){

    const [column, setColumn] = useState([]);
    const [exames, setExames] = useState([]);
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
    
    return (
      <>
        <div className="bg-white flex flex-col h-full justify-center items-centers w-10/12">
          <h1 className="text-5xl text-center mb-5">Lista de Exames</h1>
          <DataTable
            columns={column}
            data={exames}
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