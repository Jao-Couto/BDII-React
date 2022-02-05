import React, { useEffect, useRef, useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import receitaService from '../services/receitaService';
import remediosService from '../services/remediosService';
import SelectSearch from 'react-select-search';

export default function AdicionarReceita(props) {
    const searchInput = useRef();
    const [items, setItems] = useState([])
    const options = items;
    const [remedio, setRemedio] = useState('');
    const [duracao, setDuracao] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [intervalo, setIntervalo] = useState('');

    useEffect(() => {
        remediosService.listarRemedios().then((res) => { setItems(res.data) })

    }, [])

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
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            })

    }


    const handleChange = (...args) => {
        setRemedio(args[0])
    };

    const handleFilter = (items) => {

        return (searchValue) => {
            if (searchValue.length === 0) {
                return options;
            }
            const updatedItems = items.map((list) => {
                const newItems = list.items.filter((item) => {
                    return item.name.toLowerCase().includes(searchValue.toLowerCase());
                });
                return { ...list, items: newItems };
            });
            return updatedItems;
        };
    };

    var title = 'Preescrever Remédio';

    return (
        <form className="container flex flex-col h-auto w-full lg:w-8/12  bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data">
            <h1 className='text-start text-xl font-bold'>{title}</h1>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <SelectSearch
                    ref={searchInput}
                    options={options}
                    filterOptions={handleFilter}
                    value=""
                    name="remedios"
                    placeholder="Selecione um remédio"
                    search
                    onChange={handleChange}
                    required
                />
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
    );
}