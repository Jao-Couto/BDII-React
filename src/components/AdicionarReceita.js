import React, { useEffect, useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import receitaService from '../services/receitaService';
import remediosService from '../services/remediosService';
import ListarReceitas from './ListarReceitas';
//import SelectSearch from 'react-select-search';

export default function AdicionarReceita(props) {
    //const searchInput = useRef();
    const [remedios, setRemedios] = useState([]);
    const [remedio, setRemedio] = useState(null);
    const [duracao, setDuracao] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [intervalo, setIntervalo] = useState('');
    const [att, setAtt] = useState(0);


    useEffect(() => {
        remediosService.listarRemedios().then((res) => {
            console.log(res.data);
            setRemedios(res.data)
        });
    }, [props.atendimento])

    async function handleSubmitForm(e) {
        e.preventDefault()
        if (!remedio || !duracao || !dosagem || !intervalo || !localStorage.getItem('token') || !localStorage.getItem('crm')) {
            alert("Receita não cadastrada\nDados inválidos")
            return
        }

        let data = {
            "cod_atendimento": props.atendimento,
            "cod_remedio": remedio,
            "crm": localStorage.getItem('crm'),
            "duracao": duracao,
            "dosagem": dosagem,
            "intervalo": intervalo,
            "token": localStorage.getItem('token')
        }

        receitaService.cadastrarReceita(data)
            .then(response => {
                alert("Receita cadastrada com sucesso!")
                setRemedio(0)
                setDuracao("")
                setDosagem("")
                setIntervalo("")
                setAtt(att + 1)
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='flex flex-col w-3/4  px-auto h-full md:w-5/6 sm:w-full'>
            <h1 className='text-start text-xl font-bold mb-2'>Remédios Cadastrados Anteriormente</h1>
            <ListarReceitas atendimento={props.atendimento} att={att}></ListarReceitas>
            <form className="container flex flex-col w-full h-auto  bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data" id="prescrever-remedio-form">
                <h1 className='text-start text-xl font-bold'>Preescrever Remédio</h1>

                <div className="flex flex-row w-full justify-evenly pt-2">
                    <select id='remedio' name='remedio' value={remedio} onChange={elem => setRemedio(elem.target.value)} className="p-2 rounded-sm w-full m-1 border border-gray-200" required>
                        <option value={0}> - </option>
                        {remedios.map((opt) => {
                            return <option value={opt.value} key={opt.value}>
                                {opt.name}
                            </option>
                        })}
                    </select>
                </div>

                <div className="flex flex-row w-full justify-evenly pt-2">
                    <input id='duracao' name='duracao' type='text' className="p-2 rounded-sm w-full m-1 border border-gray-200" value={duracao} onChange={elem => setDuracao(elem.target.value)} placeholder="Duração" required></input>
                </div>

                <div className="flex flex-row w-full justify-evenly pt-2">
                    <input id='dosagem' name='dosagem' type='text' className="p-2 rounded-sm w-full m-1 border border-gray-200" value={dosagem} onChange={elem => setDosagem(elem.target.value)} placeholder="Dosagem" required></input>
                </div>

                <div className="flex flex-row w-full justify-evenly pt-2">
                    <input id='intervalo' name='intervalo' type='text' className="p-2 rounded-sm w-full m-1 border border-gray-200" value={intervalo} onChange={elem => setIntervalo(elem.target.value)} placeholder="Intervalo" required></input>
                </div>

                <input type='submit' value='Cadastrar' className='p-3 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide self-end' />
            </form>
        </div>
    );
}