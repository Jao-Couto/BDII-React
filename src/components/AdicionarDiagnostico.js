import { useEffect, useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import medicoAtendeService from '../services/medicoAtendeService';
import DataTable from 'react-data-table-component';

export default function AdicionarDiagnostico(props) {
    const [diagnostico, setDiagnostico] = useState('');
    const [dados, setDados] = useState([]);
    const [columns, setColumns] = useState([]);
    const [countCadastroDiagn, setCount] = useState(0);
    let codigoMa = props.codigoMa;

    async function handleSubmitForm(e) {

        e.preventDefault()
        let data = {
            "codigo_ma": props.codigoMa,
            "diagnostico": diagnostico
        }

        let aux = dados;
        aux.push({"diagnostico": diagnostico});
        setDados(aux);

        medicoAtendeService.cadastrarDiagnostico(data)
            .then(response => {
                console.log('Cadastrado diagnostico');
                setCount(countCadastroDiagn + 1)
                setDiagnostico('');
            })
            .catch(error => {
                console.log('Diagnostico ' + error);
            })
    }

    useEffect(()=>{
        setColumns([
            {
                name:'Historico',
                wrap: true,
                maxWidth: '350px',
                selector: row=> `${row.diagnostico}`
            }
        ])
        medicoAtendeService.historicoDiagnostico(codigoMa).then((res) => setDados(res.data))
    }, [codigoMa, countCadastroDiagn])



    var title = 'Diagnóstico';

    return (
        <form className="container flex flex-col h-auto w-full lg:w-8/12  bg-white rounded-md p-5" onSubmit={handleSubmitForm} encType="multipart/form-data">
            <h1 className='text-start text-xl font-bold'>{title}</h1>


            <div className="flex flex-row w-full justify-evenly pt-2">

            </div>

            <div className="h-48 overflow-auto">
                <DataTable
                    columns={columns}                    
                    data={dados}
                />
            </div>

            <div className="flex flex-row w-full justify-evenly pt-2">
                <textarea id='diagnostico' name='diagnostico' value={diagnostico} onChange={elem => setDiagnostico(elem.target.value)} className="p-2 rounded-sm w-full m-1 border border-gray-200" placeholder="Diagnóstico" required rows="8" />
            </div>

            <input type='submit' value='Cadastrar' className='px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide self-end' />
        </form>
    );
}