import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import FormInput from './FormInput';
import { useState } from 'react';

export default function PasswordInput(props){
    const [mostraSenha, setMostraSenha] = useState(false);
    return(
        <div className="w-2/5 flex rounded-sm h-form-input">
            <FormInput name="senha" type={mostraSenha ? "text" : "password"} placeholder="Senha" size="w-4/5 mr-0"/>
            <div
                className="rounded-r-sm w-1/5 outline-none border border-gray-200 h-full m-1 ml-0 border-l-0 flex justify-center items-center"
                id="showPSW"
                onClick={() => {
                setMostraSenha(!mostraSenha);
                }}
            >{mostraSenha ? <AiOutlineEyeInvisible size='28px'/> : <AiOutlineEye size='28px'/>}</div>
        </div>
    );
}