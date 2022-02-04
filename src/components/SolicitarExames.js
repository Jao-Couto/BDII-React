import { useEffect, useRef, useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import examesService from '../services/examesService';
import SelectSearch from 'react-select-search';
import "./select-search.css";

export default function SolicitarExames(props) {
    const searchInput = useRef();
    const [items, setItems] = useState([])
    const options = items;
    const [exame, setExame] = useState('');
    const [descricao, setDescricao] = useState('');

    useEffect(() => {
        examesService.listarTiposDeExames()
            .then(response => {
                console.log(response.data)
                setItems(response.data)
            })
            .catch(error => {
                alert(error)
            })
    }, [])


    async function handleSubmitForm(e) {
        e.preventDefault()
        let data = {
            "cod_exame": exame,
            "cod_atendimento": props.atendimento,
            "descricao": descricao
        }

        examesService.solicitarExame(data)
            .then((response) => {
                console.log(response)
                if (response.data.affectedRows === 1)
                    alert("Solicitado com sucesso!!");
                else
                    alert("Erro ao solicitar!!");
            })
            .catch((error) => {
                alert(error)
            })
    }



    const handleChange = (...args) => {
        setExame(args[0])
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



    var title = 'Solicitar Exame';

    return (
        <form className="container flex flex-col h-auto w-full lg:w-8/12  bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data">
            <h1 className='text-start text-xl font-bold'>{title}</h1>


            <div className="flex flex-row w-full justify-evenly pt-2">
                <SelectSearch
                    ref={searchInput}
                    options={options}
                    filterOptions={handleFilter}
                    value=""
                    name="exames"
                    placeholder="Selecione um exame"
                    search
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='descricao' name='descricao' type='text' className="p-2 rounded-sm w-full m-1 border border-gray-200" value={descricao} onChange={elem => setDescricao(elem.target.value)} placeholder="Descrição" required></input>
            </div>

            <input type='submit' value='Cadastrar' className='px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide self-end' />
        </form>
    );
}