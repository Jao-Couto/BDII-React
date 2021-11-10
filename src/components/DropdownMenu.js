import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function DropdownMenu(props){

    const [onFocus, setOnFocus] = useState(false)

    //#TODO Adicionar verificação para uso em outros componentes
    
    return(
        <div className="flex relative" id={"dropdown-"+props.id} onMouseOver={()=>setOnFocus(true)} onMouseLeave={()=>setOnFocus(false)}>
            <Button name={props.name} id={props.id} icon={props.icon ? props.icon : false} styles={props.styles ? props.styles : ''}/>
            {onFocus ? (
                <ul className="flex flex-col absolute top-full w-full">
                    {props.options.map((comp, index)=>{ // Array de Objetos com dados dos botões
                        return(
                            // Rota para acesso
                            <Link to={comp.route} key={index}>
                                <Button
                                name={comp.name} // Nome do botão
                                icon={comp.icon ? comp.icon : false} // Icone do botão
                                />
                            </Link>
                        )
                    })}
                </ul>
            ) : ''}
        </div>
    )
}