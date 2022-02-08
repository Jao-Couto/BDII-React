import React, { useEffect } from "react";
import $ from "jquery";
import "jquery-mask-plugin/dist/jquery.mask.min";
import FormInput from "./FormInput";
import DropdownUrgencias from "./DropdownUrgencias";
import atendimentosService from "../services/atendimentosService";
import atendenteService from "../services/atendenteService";
import { useState } from "react/cjs/react.development";
import DropdownSearchPacientes from "./DropdownSearchPacientes";
//import DropdownSearchPacientes from "./DropdownSearchPacientes";

export default function CadastroAtendimentos(props) {

    const [cpfAtentende, setCpfAtendente] = useState('');
    const [cpfPaciente, setCpfPaciente] = useState('');


    useEffect(() => {
        let email = localStorage.getItem('email')
        atendenteService.getAtendente(email)
            .then((response) => {
                setCpfAtendente(response.data[0]['cpf']);
            })
            .catch((error) => {
                console.log(error);
            })


        $("#cpf_atendente").mask("000.000.000-00", { reverse: true });
        $("#cpf_paciente").mask("000.000.000-00", { reverse: true });

        $("#cpf_paciente").keyup(function () {
            $("#cpf_paciente").removeClass("border-red-800")
        })

    }, []);



    const submit = ((e) => {
        e.preventDefault();
        let data = new FormData(e.target);
        atendimentosService.CadastrarAtendimentos(data)
            .then((response) => {
                if (response.data.affectedRows == "1") {
                    alert("Cadastrado com sucesso");
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);

            })

    })

    var title = "Adicionar Atendimento";

    return (
        <form
            className="container flex flex-col h-auto lg:w-8/12 sm:w-full bg-white rounded-md p-5"
            onSubmit={(e) => {
                submit(e)
            }}
            encType="multipart/form-data"
        >
            <h1 className="text-start text-xl font-bold">{title}</h1>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <FormInput name='cpf_atendente' placeholder='CPF Atendente' type='text' size='w-1/2' value={cpfAtentende} readonly={true} />
                <DropdownSearchPacientes setCpfPaciente={setCpfPaciente}></DropdownSearchPacientes>
                <FormInput name='cpf_paciente' type='hidden' value={cpfPaciente} />
            </div>

            <div className="flex flex-row w-full justify-evenly">
                <FormInput name='sintomas' placeholder='Sintomas' type='text' size='w-full' />
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <FormInput name='temperatura' type='text' placeholder='Temperatura' size="w-2/5" />
                <FormInput name='pressao' type='text' placeholder='Pressao' size="w-2/5" />
                <DropdownUrgencias size="w-2/5" />
            </div>

            <div className="flex flex-row w-full justify-evenly">
                <textarea name='observacao' placeholder='Observações' className="resize-none p-2 rounded-sm m-1 border border-gray-200 w-full" rows={4} required={true}></textarea>
            </div>

            <input
                type="submit"
                value="Cadastrar"
                className="px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide"
            />
        </form>
    );
}
