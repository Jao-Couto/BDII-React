import { useEffect, } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import examesService from '../services/examesService';
import DropdownReceitas from './DropdownReceitas';

export default function AdicionarReceita(props) {

 


    async function handleSubmitForm(e) {
        e.preventDefault()
        let data = {
            "cod_atendimento": props.atendimento,
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


    var title = 'Adicionar Receita';

    return (
        <form className="container flex flex-col h-auto w-full lg:w-8/12  bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data">
            <h1 className='text-start text-xl font-bold'>{title}</h1>

            <DropdownReceitas  />

            <input type='submit' value='Cadastrar' className='px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide self-end' />
        </form>
    );
}