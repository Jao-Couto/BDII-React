import React, { useEffect } from "react";
import { useState } from "react";
import $ from "jquery";
import "jquery-mask-plugin/dist/jquery.mask.min";
import FormInput from "./FormInput";
import DropdownUrgencias from "./DropdownUrgencias";
import DropdownSearchPacientes from "./DropdownSearchPacientes";
import atendimentosService from "../services/atendimentosService";

export default function CadastroAtendimentos(props) {

    useEffect(() => {
        $("#cpf_atendente").mask("000.000.000-00", { reverse: true });
    }, []);

    var title = "Adicionar Atendimento";
    var data = new Date();
    var dataFormatada = data.getFullYear() + "-" + data.getMonth() + '-' + data.getDate()
    console.log(dataFormatada);
    return (
        <form
            className="container flex flex-col h-auto lg:w-8/12 sm:w-full bg-white rounded-md p-5"
            onSubmit={(e) => { atendimentosService.CadastrarAtendimentos(e, "atendimentos/cadastrar") }}
            encType="multipart/form-data"
        >
            <h1 className="text-start text-xl font-bold">{title}</h1>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <FormInput name='cpf_atendente' placeholder='CPF Atendente' type='text' size='w-1/2' />
                <DropdownSearchPacientes />
            </div>

            <div className="flex flex-row w-full justify-evenly">
                <FormInput name='sintomas' placeholder='Sintomas' type='text' size='w-full' />
            </div>

            <div className="flex flex-row w-full justify-evenly">
                <FormInput name='observacao' placeholder='Observações' type='text' size='w-3/4' />
                <FormInput name='data' type='date' value={dataFormatada} size='w-1/4' readonly={true} />
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
