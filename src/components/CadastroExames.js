import { useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import examesService from '../services/examesService';

export default function CadastroExames(props) {

    async function handleSubmitForm(e) {
        e.preventDefault()
        let data = {
            "nome": nome
        }

        examesService.cadastrarExames(data)
            .then((response) => {
                console.log(response)
                setNome('')
                if (response.data.affectedRows === 1)
                    alert("Cadastrado com sucesso!!");
                else
                    alert("Erro ao cadastrar!!");


            })
            .catch((error) => {
                alert(error)
            })


    }

    const [nome, setNome] = useState('');

    var title = 'Cadastro de Exame';

    return (
        <form className="container flex flex-col h-auto w-full lg:w-8/12  bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data">
            <h1 className='text-start text-xl font-bold'>{title}</h1>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <input id='nome' name='nome' type='text' className="p-2 rounded-sm w-full m-1 border border-gray-200" value={nome} onChange={elem => setNome(elem.target.value)} placeholder="Nome" required></input>
            </div>

            <input type='submit' value='Cadastrar' className='px-3 py-2 m-1 rounded-sm bg-blue-600 text-white cursor-pointer font-bold tracking-wide self-end' />
        </form>
    );
}