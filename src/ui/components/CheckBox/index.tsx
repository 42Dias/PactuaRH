import { PropsCheckBox } from "types";
import { Container } from "./styles";

export default function CheckBox({checkBoxTitle, checked, onChange}: PropsCheckBox) {
    return (
      <Container>
        <input checked={checked} type="radio" onChange={(e) => onChange?.(e.target.value)}/>
        <small>{checkBoxTitle}</small>
      </Container>
    )
  }

