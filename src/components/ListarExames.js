import React, { useEffect, useRef, useState } from 'react';
import 'jquery-mask-plugin/dist/jquery.mask.min';
import examesService from '../services/examesService';
import "./select-search.css";

export default function ListarExames(props) {
    const [exames, setExames] = useState([])

    useEffect(() => {
        examesService.listarExamesSolicitados(props.atendimento)
            .then(response => {
                let dados = response.data;
                console.log(dados);
                dados.forEach((elem, ind) => {
                    let data = new Date(elem["data"]);
                    let dataFormat = data.toLocaleString('pt-BR', { timeZone: 'UTC' });
                    dados[ind]["data"] = dataFormat;
                });
                setExames(dados)
            })
            .catch(error => {
                alert(error)
            })
    }, [props.att])

    let i = 0;
    return (

        <div className="flex flex-col w-full pt-2 overflow-y-scroll relative" style={{ 'maxHeight': '300px' }}>

            {exames.map((item) => {
                i++;
                return <div className="flex flex-row w-full justify-evenly p-2 border-2" key={i}>
                    <p className='w-1/3 break-words' >{item.nome_exame}</p>
                    <p className='w-1/3 break-words'>{item.descricao} adjkdbhashjg dhjasgjdh gashjgdhas ghadgs</p>
                    <p className='w-1/3 break-words'>{item.data}</p>
                </div>
            })}
        </div>

    );
}