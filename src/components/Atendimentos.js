import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, Redirect } from "react-router-dom";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react/cjs/react.development";
import atendimentosService from "../services/atendimentosService";
import Atendendo from "./Atendento";

export default function Atendimentos(props) {
  const [column, setColumn] = useState([]);
  const [filaAtendimentos, setFilaAtendimentos] = useState([]);
  const [EmAtendimento, setEmAtendimento] = useState([]);
  const [atendimentosConcluidos, setAtendimentosConcluidos] = useState([]);
  const [atendendo, setAtendendo] = useState([])

  useEffect(() => {

    if (props.isAtendente) {

      setColumn([
        {
          name: "Senha",
          selector: (row) => row.codigo,
          sortable: true,
        },
        {
          name: "Nome",
          selector: (row) => row.nome,
          sortable: true,
        },
        {
          name: "Urgência",
          selector: (row) => row.urgencia,
          sortable: true,
        },
        {
          name: "Data",
          selector: (row) => row.data_hora,
          sortable: true,
        },
      ]);
      atendimentosService
        .listarAtendimentosAtendente()
        .then((response) => {
          let dados = response.data;
          console.log(dados);
          dados.forEach((elem, ind) => {
            let data = new Date(elem["data_hora"]);
            let dataFormat = data.toLocaleString('pt-BR', { timeZone: 'UTC' });
            dados[ind]["data_hora"] = dataFormat;
          });

          setFilaAtendimentos(dados.filter((e)=>{return e.status === 1}))
          setEmAtendimento(dados.filter((e)=>{return e.status === 2}))
          setAtendimentosConcluidos(dados.filter((e)=>{return e.status === 3}))

        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setColumn([
        {
          name: "Nome",
          selector: (row) => row.nome,
          sortable: true,
        },
        {
          name: "Temperatura °C",
          selector: (row) => row.temperatura,
        },
        {
          name: "Pressão mmHg	",
          selector: (row) => row.pressao,
        },
        {
          name: "Sintomas",
          selector: (row) => row.sintomas,
        },
        {
          name: "Urgência",
          selector: (row) => row.urgencia,
          sortable: true,
        },
        {
          name: "Data",
          selector: (row) => row.data_hora,
          sortable: true,
        },
      ]);

      atendimentosService
        .listarAtendimentosMedico()
        .then((response) => {
          let dados = response.data;

          dados.forEach((elem, ind) => {
            let data = new Date(elem["data_hora"]);
            let dataFormat = data.toLocaleString('pt-BR', { timeZone: 'UTC' });
            dados[ind]["data_hora"] = dataFormat;
          });

          setFilaAtendimentos(dados.filter((e)=>{return e.status === 1}))
          setEmAtendimento(dados.filter((e)=>{return e.status === 2}))
          setAtendimentosConcluidos(dados.filter((e)=>{return e.status === 3}))

          console.log(dados);

          console.log("Atendimentos listados com sucesso");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.isAtendente]);

  const handleChange = (rowData) => {
    console.log("Selected Rows: ", rowData);
    setAtendendo(rowData)
  };


  if (atendendo.length === 0)
    return (

      <Tabs className="flex flex-col h-full w-10/12 bg-white text-xl">
        <TabList className="flex pb-3">
          <Tab className="px-3 rounded-sm" selectedClassName="border-b-2 bg-gray-100">Fila de Atendimento</Tab>
          <Tab className="px-3 rounded-sm" selectedClassName="border-b-2 bg-gray-100">Em Atendimento</Tab>
          <Tab className="px-3 rounded-sm" selectedClassName="border-b-2 bg-gray-100">Concluidos</Tab>
        </TabList>
  
        <TabPanel className="w-full justify-center items-center">
          <DataTable
            columns={column}
            data={filaAtendimentos}
            pagination
            onRowClicked={handleChange}
            highlightOnHover
            striped
          />
        </TabPanel>
        <TabPanel className="w-full justify-center items-center">
          <DataTable
            columns={column}
            data={EmAtendimento}
            pagination
            onRowClicked={handleChange}
            highlightOnHover
            striped
          />
        </TabPanel>
        <TabPanel className="w-full justify-center items-center">
          <DataTable
            columns={column}
            data={atendimentosConcluidos}
            pagination
            onRowClicked={handleChange}
            highlightOnHover
            striped
          />
        </TabPanel>
      
    </Tabs>

    );
  else {
    console.log(atendendo);

    return (<Redirect to={{ pathname: '/medico/atendendo', state: { linha: atendendo } }} ></Redirect>)
  }
}
