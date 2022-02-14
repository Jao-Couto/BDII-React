import React, { useEffect } from "react";
import { useState } from "react";
import $ from "jquery";
import "jquery-mask-plugin/dist/jquery.mask.min";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import DateInput from "./DateInput";
import DropdownPaises from "./DropdownPaises";
import enderecoContext from "../services/enderecoContext";
import cadastroUsuarioService from "../services/CadastroUsuarioService";
import DropdownSearchEspecializacao from "./DropdownEspecializacao";
import CEPinput from "./CEPInput";

export default function CadastroUsuario(props) {

  useEffect(() => {
    $("#cpf").mask("000.000.000-00", { reverse: true });
    $("#cep").mask("00000-000");
    $("#salario").mask("000.000.000,00", { reverse: true });
    $("#rg").mask("00.000.000-0", { reverse: true });
  }, []);

  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  var title = "";
  var inputsPerType = null;
  var url = "";

  switch (props.type) {
    case "medico":
      title = "Cadastro Médico";
      inputsPerType = (
        <>
          <div className="flex flex-row w-full justify-start pt-2">
            <FormInput name="rg" type="text" placeholder="RG" size="w-1/2" />
          </div>
          <div className="flex flex-row w-full justify-evenly pt-2">
            <FormInput name="crm" type="text" placeholder="CRM" size="w-1/2" />
            <DropdownSearchEspecializacao />
          </div>
          <div className="flex flex-row w-full justify-evenly items-center pt-2">
            <FormInput name='salario' placeholder="Salário" type="text" size="w-1/4" />
            <div className="flex w-1/2 text-center">
              <FormInput name="hor_entrad" type="time" placeholder="Horario de Entrada" size="w-full" />
              <FormInput name="hor_saida" type="time" placeholder="Horario de Saida" size="w-full" />
            </div>
            <div className="relative m-1 w-1/4">
              <FormInput name='carga_hor_semana' placeholder='8' type="text" size='w-full ml-0' />
              <span className="absolute top-1/4 right-1 text-gray-400">
                hr por Semana
              </span>
            </div>
          </div>
        </>
      );
      url = "medicos/cadastrar";
      break;

    case "atendente":
      title = "Cadastro Atendente";
      inputsPerType = (
        <div className="flex flex-row w-full ">
          <div className="relative m-1 w-full">
            <FormInput name='carga_hor_semana' placeholder='8' type="text" size='w-full ml-0' />
            <span className="absolute top-1/4 right-1 text-gray-400">
              hr de Carga Semanal
            </span>
          </div>
          <div className="m-1 w-full">
            <FormInput name='salario' placeholder="Salário" type="text" size="w-full ml-0" />
          </div>
        </div>
      );
      url = "atendentes/cadastrar";
      break;

    case "paciente":
      title = "Cadastro Paciente";
      inputsPerType = (
        <div className="flex flex-row w-full justify-start pt-2">
          <FormInput name='rg' placeholder='RG' type='text' size="w-1/2" />
          <select
            id="planoDeSaude"
            name="planoDeSaude"
            type="text"
            className="p-2 rounded-sm w-1/2 m-1 border border-gray-200"
            placeholder="Plano"
            required
          >
            <option value="Unimed">Unimed</option>
          </select>
        </div>
      );
      url = "pacientes/cadastrar";
      break;

    default:
      break;
  }

  return (
    <enderecoContext.Provider value={{ setRua, setBairro, setCidade, setEstado }}>
      <form
        className="container flex flex-col h-auto lg:w-8/12 sm:w-full bg-white rounded-md p-5"
        onSubmit={(e) => { cadastroUsuarioService.CadastrarUsuarios(e, url) }}
        encType="multipart/form-data"
      >
        <h1 className="text-start text-xl font-bold">{title}</h1>

        <div className="flex flex-row w-full pt-2">
          <FormInput name='email' placeholder='Email' type='text' size={(props.type === 'paciente' ? 'w-full' : "w-3/5")} />
          {(props.type === 'paciente' ? '' : <PasswordInput size="w-2/5" />)}
        </div>

        <div className="flex flex-row w-full justify-evenly pt-2">
          <FormInput name='nome' placeholder='Nome completo' type='text' size='w-3/5' />
          <FormInput name='cpf' placeholder='CPF' type='text' size='w-2/5' />
        </div>

        {inputsPerType}

        <div className="flex flex-row w-full justify-evenly">

          <DateInput name='data_nasc' placeholder="Data de nascimento" />

          <CEPinput />

        </div>

        <div className="flex flex-row w-full justify-evenly pt-2">
          <FormInput name='bairro' type='text' placeholder='Bairro' size="w-2/5" value={bairro} />
          <FormInput name='cidade' type='text' placeholder='Cidade' size="w-2/5" value={cidade} />
          <FormInput name='estado' type='text' placeholder='Estado' size="w-2/5" value={estado} />
        </div>

        <div className="flex flex-row w-full justify-evenly pt-2">
          <FormInput name='rua' type='text' placeholder='Rua' size="w-1/2" value={rua} />
          <FormInput name='numero' type='text' placeholder='Numero' size="w-1/4" />

          <DropdownPaises size="w-1/4" />
        </div>

        <input
          type="submit"
          value="Cadastrar"
          className="px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide"
        />
      </form>
    </enderecoContext.Provider>
  );
}
