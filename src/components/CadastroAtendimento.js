import React, { useEffect } from "react";
import $ from "jquery";
import "jquery-mask-plugin/dist/jquery.mask.min";
import FormInput from "./FormInput";
import DropdownUrgencias from "./DropdownUrgencias";
import atendimentosService from "../services/atendimentosService";
import atendenteService from "../services/atendenteService";
import { useState } from "react/cjs/react.development";
import DropdownSearchPacientes from "./DropdownSearchPacientes";

export default function CadastroAtendimentos(props) {

    const [cpfAtentende, setCpfAtendente] = useState('');

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
                if (response.data == "1") alert("Cadastrado com sucesso");
                else if (response.data == "2") {
                    $("#cpf_paciente").addClass("border-red-800")
                }
                else
                    console.log(response.data);
            })
            .catch((error) => {
                console.log(error);

            })
    })

    var title = "Adicionar Atendimento";
    var data = new Date();
    var minutos = (data.getMinutes() < 10) ? '0' + data.getMinutes() : data.getMinutes();
    var dataFormatada = data.getFullYear() + "-" + (data.getMonth() + 1) + '-' + data.getDate() + 'T' + data.getHours() + ':' + minutos
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
                <FormInput name='cpf_paciente' placeholder='CPF Paciente' type='text' size='w-1/2' />
            </div>

            <div className="flex flex-row w-full justify-evenly">
                <FormInput name='sintomas' placeholder='Sintomas' type='text' size='w-full' />
            </div>

            <div className="flex flex-row w-full justify-evenly">
                <FormInput name='observacao' placeholder='Observações' type='text' size='w-3/4' required={true} />
                <FormInput name='data' type='datetime-local' value={dataFormatada} size='w-1/4' readonly={true} />
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <FormInput name='temperatura' type='text' placeholder='Temperatura' size="w-2/5" />
                <FormInput name='pressao' type='text' placeholder='Pressao' size="w-2/5" />
                <DropdownUrgencias size="w-2/5" />
            </div>

            <input
                type="submit"
                value="Cadastrar"
                className="px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide"
            />
        </form>
    );
}
