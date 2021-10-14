import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import $ from 'jquery';
import 'jquery-mask-plugin/dist/jquery.mask.min'; 

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
        
    }, [])

    async function handleSubmitForm(e){
        e.preventDefault()
        let data = new FormData(e.target)
        console.log(data.get('email'));

        await axios.post(`http://localhost:5000/${url}`, data, {headers:{'content-type': 'multipart/form-data'}})
            .then(response => response.text())
            .then(text => console.log(text))
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

    var title = '';
    var inputsPerType = null;
    var url = '';

    switch (props.type) {
        case 'medico':
            title = 'Cadastro Médico';
            inputsPerType = (<div className="flex flex-row w-full justify-evenly pt-2">
                                <input id='crm' name='crm' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={crm} onChange={elem =>setCRM(elem.target.value)} placeholder="CRM"></input>
                                <input id='spec' name='spec' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={spec} onChange={elem =>setSpec(elem.target.value)} placeholder="Especialização"></input>
                            </div>);
            url = 'medicos/cadastrar';
            break;

        case 'atendente':
            title = 'Cadastro Atendente';
            break;

        case 'paciente':
            title = 'Cadastro Paciente';
            inputsPerType = (<div className="flex flex-row w-full justify-start pt-2">
                            <input id='rg' name='rg' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={rg} onChange={elem =>setRG(elem.target.value)} placeholder="RG"></input>
                            <select id='planoDeSaude' name='planoDeSaude' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={plano} onChange={elem =>setPlano(elem.target.value)} placeholder="Plano">
                                <option value='...'>...</option>
                            </select>
                          </div>);
            url = 'pacientes/cadastrar';
            break; 

        default:
            break;
    }

    return(
        <form className="container flex flex-col h-auto lg:w-5/12 sm:w-full bg-white rounded-md p-5" onSubmit={handleSubmitForm} enctype="multipart/form-data">
            <h1 className='text-start text-xl font-bold'>{title}</h1>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='email' name='email' type='text' className="p-2 rounded-sm w-3/5 m-1 border border-gray-200" value={email} onChange={elem =>setEmail(elem.target.value)} placeholder="Email"></input>
                <input id='senha' name='senha' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={senha} onChange={elem =>setSenha(elem.target.value)} placeholder="Senha"></input>
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='nome' name='nome' type='text' className="p-2 rounded-sm w-3/5 m-1 border border-gray-200" value={nome} onChange={elem =>setNome(elem.target.value)} placeholder="Nome completo"></input>
                <input id='cpf' name='cpf' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={cpf} onChange={elem =>setCPF(elem.target.value)} placeholder="CPF"></input>
            </div>

            {inputsPerType}

            <div className="flex flex-row w-full justify-evenly">
                <div className="flex flex-col w-1/2 justify-evenly pt-2 m-1">
                    <input id='data_nasc' name='data_nasc' type='text' className="p-2 rounded-sm w-full border border-gray-200" style={{height:'39px'}} value={data_nasc} onChange={elem =>setNasc(elem.target.value)} placeholder='Data de Nascimento' onFocus={(elem)=>{elem.target.type = 'date'}}></input>
                </div>

                <div className="flex flex-row w-1/2 justify-evenly items-end pt-2 m-1">
                    <input id='cep' name='cep' type='text' className="p-2 rounded-sm w-full border border-gray-200" style={{height:'39px'}} value={cep} onChange={elem =>{setCEP(elem.target.value); getCEPFromForm(elem.target.value)}} placeholder="CEP"></input>
                </div>
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='bairro' name='bairro' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={bairro} onChange={elem =>setBairro(elem.target.value)} placeholder="Bairro"></input>
                <input id='cidade' name='cidade' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={cidade} onChange={elem =>setCidade(elem.target.value)} placeholder="Cidade"></input>
                <input id='estado' name='estado' type='text' className="p-2 rounded-sm w-2/5 m-1 border border-gray-200" value={estado} onChange={elem =>setEstado(elem.target.value)} placeholder="Estado"></input>
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='rua' name='rua' type='text' className="p-2 rounded-sm w-1/2 m-1 border border-gray-200" value={rua} onChange={elem =>setRua(elem.target.value)} placeholder="Rua"></input>
                <input id='numero' name='numero' type='text' className="p-2 rounded-sm w-1/4 m-1 border border-gray-200" value={numero} onChange={elem =>setNumero(elem.target.value)} placeholder="Numero"></input>
                <select id='pais' name='pais' type='text' className="p-2 rounded-sm w-1/4 m-1 border border-gray-200" value={pais} onChange={elem =>setPais(elem.target.value)}>
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