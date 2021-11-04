import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function DropdownMenu(props){

    const [onFocus, setOnFocus] = useState(false)

    return(
        <div className="flex relative" id={"dropdown-"+props.id} onMouseOver={()=>setOnFocus(true)} onMouseLeave={()=>setOnFocus(false)}>
            <Button name={props.name} id={props.id} icon={props.icon ? props.icon : false} styles={props.styles ? props.styles : ''}/>
            {onFocus ? (
                <ul className="flex flex-col absolute top-full w-full">
                    {props.options.map((comp)=>{
                        return(
                            <Link to={comp.route}>
                                <Button 
                                name={comp.name} 
                                icon={comp.icon ? comp.icon : false} 
                                />
                            </Link>
                        )
                    })}
                </ul>
            ) : ''}
        </div>
    )
}