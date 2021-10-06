import React from "react";
export default function Login(){
    return(
            <main className="container flex flex-col h-96 lg:w-5/12 sm:w-full bg-gradient-to-b  from-blue-600 to-blue-400 rounded-md">
                <h1 className='text-5xl text-center mt-5 text-white'>Login</h1>
                <form className='flex flex-col p-6 justify-around items-center h-full'>
                    <input type='text' id='email' className='p-2 rounded-sm w-2/3' placeholder='Email'></input>
                    <input type='password' id='senha' className='p-2 rounded-sm w-2/3' placeholder='Senha'></input>
                    <input type='submit' className='p-2 rounded-lg w-1/4 mx-auto bg-blue-900 text-white font-bold'/>
                </form>
            </main>
    );
}