import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link, Redirect } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import atendimentosService from "../services/atendimentosService";
import medicoAtendeService from "../services/medicoAtendeService";
import Atendendo from "./Atendento";

export default function Atendimentos(props) {
  const [column, setColumn] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);
  const [atendendo, setAtendendo] = useState([])
  const [codigoMA, setCodigoMA] = useState('')

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

          setAtendimentos(dados);

          console.log("Atendimentos listados com sucesso");
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

          setAtendimentos(dados);
          console.log("Atendimentos listados com sucesso");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.isAtendente]);

  const handleChange = (rowData) => {
    console.log("Selected Rows: ", rowData);
    let data = {
      "cod_atendimento": rowData.codigo,
      "crm": localStorage.getItem('crm')
    }
    medicoAtendeService.cadastrarMedicoAtende(data)
      .then(response => {
        console.log('Medico atendendo');
        console.log(response.data);
        setCodigoMA(response.data)
        setAtendendo(rowData)
      })
      .catch(error => {
        console.log('Error medico atender: ' + error);
      })

    data = {
      "codigo": rowData.codigo,
      "status": 2
    }
    atendimentosService.UpdateStatus(data)
      .then(response => {
        console.log('Status atendendo');
      })
      .catch(error => {
        console.log('Status error: ' + error);
      })
  };


  if (atendendo.length == 0)
    return (
      <div className="flex items-center flex-col justify-center h-full w-10/12 bg-white">
        <h1 className="text-5xl text-center mb-5">Fila de atendimento</h1>
        <DataTable
          columns={column}
          data={atendimentos}
          pagination
          onRowClicked={handleChange}
          highlightOnHover
          striped
        />
      </div>
    );
  else {
    console.log(atendendo);

    return (<Redirect to={{ pathname: '/medico/atendendo', state: { linha: atendendo, ma: codigoMA } }} ></Redirect>)
  }
}
