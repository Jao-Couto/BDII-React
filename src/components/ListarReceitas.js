import React, { useEffect, useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import receitaService from '../services/receitaService';
import remediosService from '../services/remediosService';
//import SelectSearch from 'react-select-search';

export default function ListarReceitas(props) {
    //const searchInput = useRef();
    const [receitas, setReceitas] = useState([]);
    const [remedios, setRemedios] = useState([]);


    useEffect(() => {
        remediosService.listarRemedios().then((res) => {
            console.log(res.data);
            setRemedios(res.data)
        });
        receitaService.listarRemedios(props.atendimento).then((res) => {
            console.log(res.data);
            setReceitas(res.data)
        })

    }, [props.att])



    let i = 0;
    return (
        <div className='w-full'>

            <div className='w-full h-full max-h-72 overflow-y-auto grid grid-cols-2 gap-4 pr-2'>
                {receitas.map((remCad) => {
                    return <div className=' p-2 bg-gray-200 rounded-md ' key={i++}>
                        <div className='font-semibold'>
                            {remedios.find((reme) => reme.value == remCad.cod_remedio).name}
                        </div>
                        <div className='flex-row space-x-4 font-light text-gray-500'>
                            <div className="inline-block">{remCad.duracao}   </div>
                            <div className="inline-block">{remCad.dosagem}   </div>
                            <div className="inline-block">{remCad.intervalo} </div>
                        </div>
                    </div>
                })}
            </div>

        </div>
    );
}