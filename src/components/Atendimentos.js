import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useState } from 'react/cjs/react.development';

export default function Atendimentos(props) {
    const [column, setColumn] = useState([]);

    useEffect(() => {
        if (props.colunas === "atendente")
            setColumn([
                {
                    name: 'Senha',
                    selector: row => row.senha,
                },
                {
                    name: 'Nome',
                    selector: row => row.nome,
                },
                {
                    name: 'Urgência',
                    selector: row => row.urgencia,
                }
            ]);

        if (props.colunas === "medico")
            setColumn([
                {
                    name: 'Nome',
                    selector: row => row.nome,
                },
                {
                    name: 'CPF',
                    selector: row => row.cpf,
                },
                {
                    name: 'Temperatura °C',
                    selector: row => row.temperatura,
                },
                {
                    name: 'Pressão mmHg	',
                    selector: row => row.pressao,
                },
                {
                    name: 'Sintomas',
                    selector: row => row.sintomas,
                },
                {
                    name: 'Urgência',
                    selector: row => row.urgencia,
                }
            ]);
    }, [])


    const data = [
        {
            id: 1,
            nome: 'joao',
            cpf: '111.111.111-11',
            temperatura: '38',
            pressao: '18/10',
            sintomas: 'Dor de cabeça',
            urgencia: 'Urgênte',
        },
        {
            id: 2,
            nome: 'carlos',
            cpf: '111.111.111-22',
            temperatura: '37',
            pressao: '18/10',
            sintomas: 'Dor de barriga',
            urgencia: 'Não urgente',
        },
        {
            id: 3,
            nome: 'carlos',
            cpf: '111.111.111-22',
            temperatura: '37',
            pressao: '18/10',
            sintomas: 'Dor de barriga',
            urgencia: 'Não urgente',
        },
        {
            id: 4,
            nome: 'carlos',
            cpf: '111.111.111-22',
            temperatura: '37',
            pressao: '18/10',
            sintomas: 'Dor de barriga',
            urgencia: 'Não urgente',
        },
        {
            id: 5,
            nome: 'carlos',
            cpf: '111.111.111-22',
            temperatura: '37',
            pressao: '18/10',
            sintomas: 'Dor de barriga',
            urgencia: 'Não urgente',
        },
        {
            id: 6,
            nome: 'carlos',
            cpf: '111.111.111-22',
            temperatura: '37',
            pressao: '18/10',
            sintomas: 'Dor de barriga',
            urgencia: 'Não urgente',
        },
    ]

    const handleChange = ({ selectedRows }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows);
    };

    console.log(column);

    return (
        <div class="flex items-center flex-col justify-center h-full w-10/12 bg-white">
            <h1 className='text-5xl text-center mb-5'>Fila de atendimento</h1>
            <DataTable
                columns={column}
                data={data}
                selectableRows
                pagination
                onSelectedRowsChange={handleChange}
            />
        </div>
    );
}