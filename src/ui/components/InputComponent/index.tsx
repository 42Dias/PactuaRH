import { PropsModal } from "types";

export default function InputComponent({ title, onChange, value }: PropsModal) {
    return (
      <>
        <label>{title}</label>
  
        <input
        placeholder={title}
        //@ts-ignore
        onChange={(e) => onChange(e.target.value)} 
        value={value}
        />
      </>
    )
  }
  