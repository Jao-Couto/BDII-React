export default function FormInput(props){
    return(
        <input
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            type={props.type}
            defaultValue={props.value ? props.value : ''}
            step='0.1'
            className={"p-2 rounded-sm m-1 border border-gray-200 h-form-input " + props.size}
            required
        ></input>
    );
}