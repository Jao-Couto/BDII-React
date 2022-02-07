import React, { useState } from "react";
import AdicionarDiagnostico from "./AdicionarDiagnostico";
import Button from "./Button";
import Modal from "./Modal";
import SolicitarExames from "./SolicitarExames";
import AdicionarReceita from "./AdicionarReceita";
import atendimentosService from "../services/atendimentosService";

export default function Atendendo(props) {
    const [modalExame, setModalExame] = useState(false);
    const [modalRemedio, setModalRemedio] = useState(false);
    const [modalDiagnostico, setModalDiagnostico] = useState(false);

    const finalizar = () => {
        let data = {
            "codigo": props.location.state.linha.codigo,
            "status": 3
        }

        atendimentosService.UpdateStatus(data)
            .then(response => {
                console.log(response);
                window.location.href = "/medico/";
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="flex items-center flex-col justify-center h-2/4 w-1/2 bg-white border-2 rounded-md">
            <Button
                name="Exames"
                backdrop="bg-white w-10/12 m-2"
                styles="mr-0 ml-auto text-white"
                color="bg-blue-600 cursor-pointer"
                onClick={() => setModalExame(true)}
            />
            <Button
                name="Adicionar diagnóstico"
                backdrop="bg-white w-10/12 m-2"
                styles="mr-0 ml-auto text-white"
                color="bg-blue-600 cursor-pointer"
                onClick={() => setModalDiagnostico(true)}
            />
            <Button
                name="Preescrever remédio"
                backdrop="bg-white w-10/12 m-2"
                styles="mr-0 ml-auto text-white"
                color="bg-blue-600 cursor-pointer"
                onClick={() => setModalRemedio(true)}
            />
            <Button
                name="Finalizar"
                backdrop="bg-white w-10/12 m-2"
                styles="mr-0 ml-auto text-white"
                color="bg-red-600 cursor-pointer"
                onClick={() => finalizar()}
            />

            <Modal isOpen={modalExame} handleModal={setModalExame}>
                <SolicitarExames atendimento={props.location.state.linha.codigo} />
            </Modal>

            <Modal isOpen={modalDiagnostico} handleModal={setModalDiagnostico}>
                <AdicionarDiagnostico codigoMa={props.location.state.ma} />
            </Modal>

            <Modal isOpen={modalRemedio} handleModal={setModalRemedio}>
                <AdicionarReceita atendimento={props.location.state.linha.codigo} />
            </Modal>
        </div>


    );
};