import { PropsModal } from "types";
import { Container } from "./styles";

export default function TextAreaComponent({ title, onChange, value }: PropsModal) {
    return (
      <Container>
        <label>{title}</label>
  
        <textarea
        placeholder={title}
        onChange={(e) => onChange?.(e.target.value)} 
        value={value}
        />
      </Container>
    )
  }
  