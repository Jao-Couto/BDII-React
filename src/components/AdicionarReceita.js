import React, { useEffect, useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import receitaService from '../services/receitaService';
import remediosService from '../services/remediosService';
//import SelectSearch from 'react-select-search';

export default function AdicionarReceita(props) {
    //const searchInput = useRef();
    const [receitas, setReceitas] = useState([]);
    const [remedios, setRemedios] = useState([]);
    const [remedio, setRemedio] = useState('');
    const [duracao, setDuracao] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [intervalo, setIntervalo] = useState('');

    var nomesRemediosCadastrados  = receitas.map(
        (rec) => {
            return {
                key: rec.codigo,
                dosagem: rec.dosagem,
                duracao: rec.duracao,
                intervalo: rec.intervalo,
                nome: remedios.find((rem)=> rem.codigo === rec.cod_remedio)["nome"]
            }
        
        }
    )

    useEffect(() => {
        remediosService.listarRemedios().then((res) => { setRemedios(res.data) });
        receitaService.listarRemedios(props.atendimento).then((res)=>{
            setReceitas(res.data)
        })
    }, [props.atendimento])

    async function handleSubmitForm(e) {
        e.preventDefault()
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
                if(response.data.affectedRows === 1){
                    alert("Receita cadastrada com sucesso!")
                    setReceitas([...receitas, data])
                    console.log(receitas);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
/*

    const handleChange = (...args) => {
        setRemedio(args[0])
    };

    const handleFilter = (items) => {

        return (searchValue) => {
            return items.filter((item) => {
                return item.toLowerCase().includes(searchValue.toLowerCase());
            });
        };
    };
    <SelectSearch
        ref={searchInput}
        options={items.map((rem)=>{
            return rem.nome
        })}
        filterOptions={handleFilter}
        name="remedios"
        placeholder="Selecione um remédio"
        search
        onChange={handleChange}
        required
    />*/
    
    
    
    return (
        <div className='flex flex-col w-3/4 px-auto h-full'>
            {(receitas.length <= 0) ? <></> : 
            <div className='p-5 w-full'>
                <h1 className='text-start text-xl font-bold'>Remédios Cadastrados Anteriormente</h1>
                {nomesRemediosCadastrados.map((remCad) => {
                    return  <div> 
                        {remCad.nome}
                    </div>
                })}
                
            </div>}
            <form className="container flex flex-col w-full h-auto  bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data">
                <h1 className='text-start text-xl font-bold'>Preescrever Remédio</h1>

                <div className="flex flex-row w-full justify-evenly pt-2">
                    <select id='remedio' name='remedio' value={remedio} onChange={elem => setRemedio(elem.target.value)}className="p-2 rounded-sm w-full m-1 border border-gray-200">
                        {remedios.map((opt)=>{
                            return <option value={opt.codigo}>
                                {opt.nome}
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

                <input type='submit' value='Cadastrar' className='px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide self-end' />
            </form>
        </div>
    );
}