import React, { useState } from "react";
import AdicionarDiagnostico from "./AdicionarDiagnostico";
import Button from "./Button";
import Modal from "./Modal";
import SolicitarExames from "./SolicitarExames";
import AdicionarReceita from "./AdicionarReceita";
import atendimentosService from "../services/atendimentosService";
import { Redirect } from "react-router-dom";

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

    const defaultBackdrop = "bg-white w-10/12 m-2"
    const defaultStyles = "mr-0 ml-auto text-white rounded-sm"
    const defaultColor = "bg-blue-600 cursor-pointer"
    
    return props.location.state === undefined ? <Redirect to={'/'} /> : (
        <div className="flex items-center flex-col justify-center h-2/4 w-1/2 bg-white border-2 rounded-lg">
            <Button
                name="Exames"
                backdrop={defaultBackdrop}
                styles={defaultStyles}
                color={defaultColor}
                onClick={() => setModalExame(true)}
            />
            <Button
                name="Adicionar diagnóstico"
                backdrop={defaultBackdrop}
                styles={defaultStyles}
                color={defaultColor}
                onClick={() => setModalDiagnostico(true)}
            />
            <Button
                name="Preescrever remédio"
                backdrop={defaultBackdrop}
                styles={defaultStyles}
                color={defaultColor}
                onClick={() => setModalRemedio(true)}
            />
            <Button
                name="Finalizar"
                backdrop={defaultBackdrop}
                styles={defaultStyles}
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