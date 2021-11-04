export default function Button(props){
    
    let id = props.id ? props.id : (Date.now()/(Math.floor(Math.random() * 100))).toFixed(0);

    return(
        <div className={props.backdrop}>
            <div className={`overflow-ellipsis flex items-center justify-center p-3 hover:bg-opacity-90 ${props.color} ${props.width} ${props.height} ${props.styles}`} onClick={props.onClick} id={id}>
                <p className={props.icon ? 'mx-2' : 'hidden'}>{props.icon}</p>
                {props.name}
            </div>
        </div>
    );
}

Button.defaultProps = {
    height: "h-full",
    width: "w-full",
    color: "bg-white",
    backdrop: "bg-black",
    styles: '',
    onClick: ()=>{},
    icon: false
}