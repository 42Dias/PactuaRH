import { PropsCheckBox } from "types";

export default function CheckBox({checkBoxTitle, checked, onChange}: PropsCheckBox) {
    return (
      <div>
        <input checked={checked} type="radio" onChange={(e) => onChange?.(e.target.value)}/>
        <small>{checkBoxTitle}</small>
      </div>
    )
  }