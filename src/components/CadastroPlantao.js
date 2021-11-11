import "jquery-mask-plugin/dist/jquery.mask.min";
import { useState } from "react";
import medicoService from "../services/medicoService";
import FormInput from "./FormInput";

export default function CadastroExames() {
  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      let res = await medicoService.adicionarPlantao(cadastraPlantao["dt_hr_ent"], cadastraPlantao["dt_hr_sai"]);
      if (res.data === "OK") {
        alert("Plantão cadastrado com sucesso!!");
      } else {
        alert("Erro ao cadastrar plantão!!");
      }
    } catch (error) {
      alert(error);
    }
  }

  var data = new Date();
  var minutos =
    data.getMinutes() < 10 ? "0" + data.getMinutes() : data.getMinutes();

  const [cadastraPlantao, setCadastraPlantao] = useState({
    dt_hr_ent:
      data.getFullYear() +
      "-" +
      (data.getMonth() + 1) +
      "-" +
      data.getDate() +
      "T" +
      data.getHours() +
      ":" +
      minutos,
    dt_hr_sai:
      data.getFullYear() +
      "-" +
      (data.getMonth() + 1) +
      "-" +
      data.getDate() +
      "T" +
      data.getHours() +
      ":" +
      minutos,
  });

  var title = "Cadastro de Plantão";

  return (
    <form
      className="container flex flex-col bg-white rounded-md p-5"
      onSubmit={handleSubmitForm}
      encType="multipart/form-data"
    >
      <h1 className="text-start text-xl font-bold">{title}</h1>

      <div className="flex justify-evenly py-5">
        <div className="flex flex-col w-1/2 mr-2 h-full">
          <p className="ml-2">Data/Hora de Entrada</p>
          <FormInput
            name="data"
            type="datetime-local"
            size="w-full"
            onChange={(e) =>
              setCadastraPlantao((prevData) => {
                  console.log(e);
                return {
                  dt_hr_ent: e.target.value,
                  dt_hr_sai: prevData["dt_hr_sai"],
                };
              })
            }
            value={cadastraPlantao["dt_hr_ent"]}
            readonly={false}
          />
        </div>
        <div className="flex flex-col w-1/2 h-full">
          <p className="ml-2">Data/Hora de Entrada</p>
          <FormInput
            name="data1"
            type="datetime-local"
            size="w-full"
            onChange={(e) =>
                setCadastraPlantao((prevData) => {
                  return {
                    dt_hr_ent: prevData["dt_hr_ent"],
                    dt_hr_sai: e.target.value,
                  };
                })
              }
            value={cadastraPlantao["dt_hr_sai"]}
            readonly={false}
          />
        </div>
      </div>

      <input
        type="submit"
        value="Cadastrar"
        className="px-3 py-2 w-1/4 m-1 rounded-sm bg-blue-600 text-white font-bold tracking-wide self-end"
      />
    </form>
  );
}
