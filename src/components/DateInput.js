export default function DateInput(props){
    return(
        <input
            id={props.name}
            name={props.name}
            type="text"
            className="p-2 rounded-sm w-1/2 border border-gray-200 h-form-input m-1"
            placeholder={props.placeholder}
            onFocus={(elem) => {
              elem.target.type = "date";
            }}
            required
          ></input>
    );
}