import React, { useState } from "react";
import { Redirect } from "react-router";
import medicoService from "../services/medicoService";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";

export default function Login(params) {
  const [redirect, setRedirect] = useState(false);

  const entrar = (email, senha) => {
    let data = {
      email: email,
      senha: senha,
    };
    medicoService
      .loginMedico(data)
      .then((response) => {
        if (response.data.status) {
          console.log("Logado com suceeso");
          params.valida(true);
          let userType = response.data.mensagem;
          params.tipoUsuario(userType === 'Atendente');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('email', response.data.email);
          setRedirect(true);
        } else {
          console.log("Usuario n encontrado");
          params.valida(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    entrar(data.get('email'), data.get('senha'));
  };

  return (
    <main className="container flex flex-col h-96 lg:w-5/12 sm:w-full  rounded-md">
      <h1 className="text-5xl text-center mt-5 ">Login</h1>
      <form
        className="flex flex-col p-6 justify-evenly items-center h-full"
        onSubmit={handleSubmit}
      >
        <FormInput name="email" placeholder="Email" size="w-2/3"/>
        <PasswordInput size="w-2/3"/>
        {redirect ? <Redirect to="/" /> : null}
        <input
          type="submit"
          className="p-2 rounded-lg w-1/4 mx-auto bg-blue-900 text-white font-bold"
          value="Entrar"
        />
      </form>
    </main>
  );
}
