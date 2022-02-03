import React, { useState } from "react";
import Button from "./Button";
import CadastroExames from "./CadastroExames";
import Modal from "./Modal";
import SolclitarExames from "./SolicitarExames";

export default function Atendendo(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    console.log(props.location.state.linha);
    return (
        <div className="flex items-center flex-col justify-center h-2/4 w-1/2 bg-white border-2 rounded-md">
            <Button
                name="Solicitar exame"
                backdrop="bg-white w-10/12 m-2"
                styles="mr-0 ml-auto text-white"
                color="bg-blue-600 cursor-pointer"
                onClick={() => setModalIsOpen(true)}
            />
            <Button
                name="Adicionar diagnóstico"
                backdrop="bg-white w-10/12 m-2"
                styles="mr-0 ml-auto text-white"
                color="bg-blue-600 cursor-pointer"
            />
            <Button
                name="Adicionar receita"
                backdrop="bg-white w-10/12 m-2"
                styles="mr-0 ml-auto text-white"
                color="bg-blue-600 cursor-pointer"
            />
            <Button
                name="Finalizar"
                backdrop="bg-white w-10/12 m-2"
                styles="mr-0 ml-auto text-white"
                color="bg-red-600 cursor-pointer"
            />

            <Modal isOpen={modalIsOpen} handleModal={setModalIsOpen}>
                <SolclitarExames atendimento={props.location.state.linha.codigo} />
            </Modal>
        </div>


    );
};