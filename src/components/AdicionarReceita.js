import React, { useEffect, useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import receitaService from '../services/receitaService';
import remediosService from '../services/remediosService';
//import SelectSearch from 'react-select-search';

export default function AdicionarReceita(props) {
    //const searchInput = useRef();
    const [receitas, setReceitas] = useState([]);
    const [receitasListar, setReceitasListar] = useState([]);
    const [remedios, setRemedios] = useState([]);
    const [remedio, setRemedio] = useState(null);
    const [duracao, setDuracao] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [intervalo, setIntervalo] = useState('');


    useEffect(() => {
        remediosService.listarRemedios().then((res) => { setRemedios(res.data) });
        receitaService.listarRemedios(props.atendimento).then((res)=>{
            setReceitas(res.data)
        })
    }, [props.atendimento])

   useEffect(() =>{
        setReceitasListar(receitas.flatMap((rec => {
            return {
                key: rec.codigo,
                nome: remedios.find((reme)=> reme.value === rec.cod_remedio).name,
                duracao: rec.duracao,
                dosagem: rec.dosagem,
                intervalo: rec.intervalo
            }
        })))
   }, [receitas, remedios])

    async function handleSubmitForm(e) {
        e.preventDefault()
        if(!remedio || !duracao || !dosagem || !intervalo || !localStorage.getItem('token') || !localStorage.getItem('crm')){
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
                if(response.data.affectedRows === 1){
                    alert("Receita cadastrada com sucesso!")
                    setReceitasListar([...receitasListar, {
                        nome: remedios.find((reme) => reme.value === remedio).name,
                        duracao: duracao,
                        dosagem: dosagem,
                        intervalo: intervalo,
                    }])
                    console.log(receitasListar);
                    document.getElementById("prescrever-remedio-form").reset()
                    setRemedio(null)
                    setDuracao("")
                    setDosagem("")
                    setIntervalo("")
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
        <div className='flex flex-col w-3/4  px-auto h-full md:w-5/6 sm:w-full'>
            {(receitas.length <= 0) ? <></> : 
            <div className='p-5 pb-0 w-full'>
                <h1 className='text-start text-xl font-bold mb-2'>Remédios Cadastrados Anteriormente</h1>
                <div className='w-full h-full max-h-72 overflow-y-auto grid grid-cols-2 gap-4 pr-2'> 
                    {receitasListar.map((remCad) => {
                        return <div className=' p-2 bg-gray-200 rounded-md '> 
                            <div className='font-semibold'> 
                                {remCad.nome}
                            </div>
                            <div className='flex-row space-x-4 font-light text-gray-500'>
                                <div className="inline-block">{remCad.duracao}   </div>
                                <div className="inline-block">{remCad.dosagem}   </div>
                                <div className="inline-block">{remCad.intervalo} </div>
                            </div>
                        </div>
                    })}
                </div>
                
            </div>}
            <form className="container flex flex-col w-full h-auto  bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data" id="prescrever-remedio-form">
                <h1 className='text-start text-xl font-bold'>Preescrever Remédio</h1>

                <div className="flex flex-row w-full justify-evenly pt-2">
                    <select id='remedio' name='remedio' value={null} onChange={elem => setRemedio(elem.target.value)}className="p-2 rounded-sm w-full m-1 border border-gray-200" required>
                        <option value={null}> - </option>
                        {remedios.map((opt)=>{
                            return <option value={opt.value}>
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