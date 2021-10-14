import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min'; 
import { RangeSlider, Button } from '@blueprintjs/core';

export default function Cadastro(props){

    async function getCEPFromForm(cep){
        if(cep.length === 9){
            let response = await getAddressByCEP(cep.replace('-',''));
            if(!response.erro){
                setBairro(response.bairro)
                setCidade(response.localidade)
                setEstado(response.uf)
                setRua(response.logradouro)
            }
        }
    }
    
    async function getAddressByCEP(cep){
        let address = await fetch(`https://viacep.com.br/ws/${cep}/json/`, {method: 'GET'}).then(response => response.json());
        return address;
    }

    const [paises, setPaises] = useState([]);

    async function getPaises(){
        let response = await fetch('http://www.geonames.org/childrenJSON?geonameId=6255150', {method: 'GET'}).then(response => response.json());
        setPaises(response.geonames);
    }

    useEffect(()=>{
        getPaises();
        $('#cpf').mask('000.000.000-00', {reverse: true});
        $('#cep').mask('00000-000');
        $('#salario').mask("#.##0,00", {reverse: true})
        $('#rg').mask('00.000.000-0', {reverse: true});
    }, [])

    async function handleSubmitForm(e){
        e.preventDefault()
        let data = new FormData(e.target)

        if(props.type === 'medico'){
            data.append('hor_entrad', range[0]*10000);
            data.append('hor_saida', range[1]*10000);
        }

        await axios.post(`http://localhost:5000/${url}`, data, {headers:{'content-type': 'multipart/form-data'}})
            .then(response => {
                if(response.data === "1")
                    console.log("Cadastrado com sucesso");
                else console.log(response.data);
                
            })
            .catch(err => console.log(err))

    }

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCPF] = useState('');
    const [rg, setRG] = useState('');
    const [crm, setCRM] = useState('');
    const [spec, setSpec] = useState('');
    const [plano, setPlano] = useState('');
    const [data_nasc, setNasc] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [cep, setCEP] = useState('');
    const [salario, setSalario] = useState('');
    const [carga_hor_semana, setCargaHRS] = useState('');
    const [mostraSenha, setMostraSenha] = useState(false);
    const [range, setRange] = useState([4, 10]);

    var title = '';
    var inputsPerType = null;
    var url = '';

    switch (props.type) {
        case 'medico':
            title = 'Cadastro Médico';
            inputsPerType = (<>
                                <div className="flex flex-row w-full justify-start pt-2">
                                    <input id='rg' name='rg' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={rg} onChange={elem =>setRG(elem.target.value)} placeholder="RG" required></input>
                                </div>
                                <div className="flex flex-row w-full justify-evenly pt-2">
                                    <input id='crm' name='crm' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={crm} onChange={elem =>setCRM(elem.target.value)} placeholder="CRM" required></input>
                                    <input id='especializacao' name='especializacao' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={spec} onChange={elem =>setSpec(elem.target.value)} placeholder="Especialização" required></input>
                                </div>
                                <div className="flex flex-row w-full justify-evenly items-center pt-2">
                                    <input id='salario' name='salario' type='text' className="p-2 rounded-sm w-1/4 m-1 border border-gray-200" style={{height:'39px'}} value={salario} onChange={elem =>setSalario(elem.target.value)} placeholder="Salário" required></input>
                                    <div className="flex flex-col w-1/2 text-center my-1 mx-2">
                                        <h1 className="text-gray-400">Horario de Entrada - Horario de Saida</h1>
                                        <RangeSlider
                                        min={0}
                                        max={24}
                                        stepSize={1}
                                        labelStepSize={6}
                                        onChange={(range)=>{setRange(range)}}
                                        value={range} required></RangeSlider>
                                    </div>
                                    <div className='relative m-1 w-1/4'>
                                        <input id='carga_hor_semana' name='carga_hor_semana' type='text' className="p-2 rounded-sm w-full m-1 border border-gray-200" style={{height:'39px'}} value={carga_hor_semana} onChange={elem =>setCargaHRS(elem.target.value)} placeholder="8" required></input>
                                        <span className='absolute top-1/4 right-1 text-gray-400'>hr de Carga Semanal</span>
                                    </div>
                                </div>
                            </>);
            url = 'medicos/cadastrar';
            break;

        case 'atendente':
            title = 'Cadastro Atendente';
            inputsPerType = (
                <div className='relative m-1 w-1/2'>
                    <input id='carga_hor_semana' name='carga_hor_semana' type='text' className="p-2 rounded-sm w-full m-1 border border-gray-200" style={{height:'39px'}} value={carga_hor_semana} onChange={elem =>setCargaHRS(elem.target.value)} placeholder="8" required></input>
                    <span className='absolute top-1/4 right-1 text-gray-400'>hr de Carga Semanal</span>
                </div>
            );
            url = 'atendentes/cadastrar';
            break;

        case 'paciente':
            title = 'Cadastro Paciente';
            inputsPerType = (<div className="flex flex-row w-full justify-start pt-2">
                            <input id='rg' name='rg' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={rg} onChange={elem =>setRG(elem.target.value)} placeholder="RG" required></input>
                            <select id='planoDeSaude' name='planoDeSaude' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={plano} onChange={elem =>setPlano(elem.target.value)} placeholder="Plano" required>
                                <option value='...'>...</option>
                            </select>
                          </div>);
            url = 'pacientes/cadastrar';
            break; 

        default:
            break;
    }

    return(
        <form className="container flex flex-col h-auto lg:w-5/12 sm:w-full bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data">
            <h1 className='text-start text-xl font-bold'>{title}</h1>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='email' name='email' type='text' className="p-2 rounded-sm w-3/5 m-1 border border-gray-200" value={email} onChange={elem =>setEmail(elem.target.value)} placeholder="Email" required></input>
                <div className='w-2/5 flex m-1 focus-within:outline-none focus-within:ring-2 focus-within:border-blue-300 rounded-sm' style={{height:'39px'}}>
                    <input id='senha' name='senha' type={mostraSenha ? 'text' : 'password'} className="p-2 w-4/5 rounded-l-sm border border-r-0 border-gray-200 outline-none" value={senha} onChange={elem =>setSenha(elem.target.value)} placeholder="Senha" ></input>
                    <Button icon={mostraSenha ? 'eye-off' : 'eye-open'} className='rounded-r-sm w-1/5 outline-none' id='showPSW' onClick={()=>{setMostraSenha(!mostraSenha)}}></Button>
                </div>
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='nome' name='nome' type='text' className="p-2 rounded-sm w-3/5 m-1 border border-gray-200" value={nome} onChange={elem =>setNome(elem.target.value)} placeholder="Nome completo" required></input>
                <input id='cpf' name='cpf' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={cpf} onChange={elem =>setCPF(elem.target.value)} placeholder="CPF" required></input>
            </div>

            {inputsPerType}

            <div className="flex flex-row w-full justify-evenly">
                <div className="flex flex-col w-1/2 justify-evenly pt-2 m-1">
                    <input id='data_nasc' name='data_nasc' type='text' className="p-2 rounded-sm w-full border border-gray-200" style={{height:'39px'}} value={data_nasc} onChange={elem =>setNasc(elem.target.value)} placeholder='Data de Nascimento' onFocus={(elem)=>{elem.target.type = 'date'}} required></input>
                </div>

                <div className="flex flex-row w-1/2 justify-evenly items-end pt-2 m-1">
                    <input id='cep' name='cep' type='text' className="p-2 rounded-sm w-full border border-gray-200" style={{height:'39px'}} value={cep} onChange={elem =>{setCEP(elem.target.value); getCEPFromForm(elem.target.value)}} placeholder="CEP" required></input>
                </div>
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='bairro' name='bairro' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={bairro} onChange={elem =>setBairro(elem.target.value)} placeholder="Bairro" required></input>
                <input id='cidade' name='cidade' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={cidade} onChange={elem =>setCidade(elem.target.value)} placeholder="Cidade" required></input>
                <input id='estado' name='estado' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={estado} onChange={elem =>setEstado(elem.target.value)} placeholder="Estado" required></input>
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='rua' name='rua' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={rua} onChange={elem =>setRua(elem.target.value)} placeholder="Rua" required></input>
                <input id='numero' name='numero' type='text' className="p-2 rounded-sm w-1/4 m-1 border border-gray-200" value={numero} onChange={elem =>setNumero(elem.target.value)} placeholder="Numero" required></input>
                <select id='pais' name='pais' type='text' className="p-2 rounded-sm w-1/4 m-1 border border-gray-200" value={pais} onChange={elem =>setPais(elem.target.value)} required>
                    <option value="" defaultValue disabled>Pais</option>
                    {paises.map(item =>{
                        return(<option value={item.name} key={item.geonameId}>{item.name}</option>);
                    })}
                </select>
            </div>

            <input type='submit' value='Cadastrar' className='px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide'/>
        </form>
    );
}