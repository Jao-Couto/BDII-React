
export default function FormInput(props) {


    return (
        <input
            id={props.name}
            name={props.name}
            placeholder={props.placeholder}
            type={props.type}
            defaultValue={props.value ? props.value : ''}
            className={"p-2 rounded-sm m-1 border border-gray-200 h-form-input " + props.size}
            onChange={props.onChange ? props.onChange : () => {}}
            required={props.required ? false : true}
            readOnly={props.readonly ? true : false}
        ></input>
    );
}