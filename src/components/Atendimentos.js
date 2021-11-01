import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { useState } from "react/cjs/react.development";
import atendimentosService from "../services/atendimentosService";

export default function Atendimentos(props) {
  const [column, setColumn] = useState([]);
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    if (props.colunas === "atendente") {
      setColumn([
        {
          name: "Senha",
          selector: (row) => row.codigo,
        },
        {
          name: "Nome",
          selector: (row) => row.nome,
        },
        {
          name: "Urgência",
          selector: (row) => row.urgencia,
        },
        {
          name: "Data",
          selector: (row) => row.data_hora,
        },
      ]);
      atendimentosService
        .listarAtendimentosAtendente()
        .then((response) => {
          let dados = response.data;
          dados.foreach((elem, ind) => {
            let data = new Date(elem["data_hora"]);
            let dataFormat =
              data.getDate() +
              "/" +
              (data.getMonth() + 1) +
              "/" +
              data.getFullYear() +
              " " +
              data.getHours() +
              ":" +
              data.getMinutes() +
              ":" +
              data.getSeconds();
            dados[ind]["data_hora"] = dataFormat;
          });

          setAtendimentos(dados);
          console.log("Atendimentos listados com sucesso");
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (props.colunas === "medico") {
      setColumn([
        {
          name: "Nome",
          selector: (row) => row.nome,
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
        },
        {
          name: "Data",
          selector: (row) => row.data_hora,
        },
      ]);

      atendimentosService
        .listarAtendimentosMedico()
        .then((response) => {
          let dados = response.data;
          dados.foreach((elem, ind) => {
            let data = new Date(elem["data_hora"]);
            let dataFormat =
              data.getDate() +
              "/" +
              (data.getMonth() + 1) +
              "/" +
              data.getFullYear() +
              " " +
              data.getHours() +
              ":" +
              data.getMinutes() +
              ":" +
              data.getSeconds();
            dados[ind]["data_hora"] = dataFormat;
          });

          setAtendimentos(dados);
          console.log("Atendimentos listados com sucesso");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.colunas]);

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
  };

  return (
    <div class="flex items-center flex-col justify-center h-full w-10/12 bg-white">
      <h1 className="text-5xl text-center mb-5">Fila de atendimento</h1>
      <DataTable
        columns={column}
        data={atendimentos}
        selectableRows
        pagination
        onSelectedRowsChange={handleChange}
        highlightOnHover
        striped
      />
    </div>
  );
}
