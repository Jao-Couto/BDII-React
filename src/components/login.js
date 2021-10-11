import { fromJSON } from "purgecss/node_modules/postcss";
import React, { useState } from "react";
import medicoService from '../services/medicoService';

export default function Login(){
    const[email, setEmail] = useState("");

    const[senha, setSenha] = useState("");


    const entrar = () => {
        let data = {
            email: email,
            senha: senha
        };
        medicoService.loginMedico(data)
        .then((response)=>{ 
            if((response.data).length == 0)
                console.log("Usuario n encontrado");
            else console.log("Logado com suceeso");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        entrar();
      }

    return(
            <main className="container flex flex-col h-96 lg:w-5/12 sm:w-full bg-gradient-to-b  from-blue-600 to-blue-400 rounded-md">
                <h1 className='text-5xl text-center mt-5 text-white'>Login</h1>
                <form className='flex flex-col p-6 justify-around items-center h-full' onSubmit={handleSubmit}>
                    <input  type='email' 
                            id='email' 
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }} 
                            value={email} 
                            className='p-2 rounded-sm w-2/3' 
                            placeholder='Email'
                            required></input>
                    <input  type='password' id='senha' 
                            onChange={(e) => {
                                setSenha(e.target.value)
                            }} 
                            value={senha} 
                            className='p-2 rounded-sm w-2/3'
                            placeholder='Senha'
                            required>     
                    </input>
                    <input type='submit' className='p-2 rounded-lg w-1/4 mx-auto bg-blue-900 text-white font-bold' />
                </form>
            </main>
    );
}