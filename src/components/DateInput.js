export default function DateInput(props) {
  const date = new Date();
  const defaultValue = date.toLocaleDateString('pt-Br');

  return (
    <input
      id={props.name}
      name={props.name}
      type="text"
      className={props.className ? props.className : "p-2 rounded-sm w-1/2 border border-gray-200 h-form-input m-1"}
      placeholder={props.placeholder}
      onFocus={(elem) => {
        elem.target.type = "date";
      }}
      defaultValue={defaultValue}
      required
    ></input >
  );
}