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
    height: "h-full", // Altura
    width: "w-full", // Largura
    color: "bg-white", // Cor principal do botão
    backdrop: "bg-black", // Fundo do botão para dar contraste quando existiver focado
    styles: '', // Estilos adicionais
    onClick: ()=>{}, // Handler de onclick
    icon: false // Icone se necessario, é necessario entregar o component, e não só uma String
}