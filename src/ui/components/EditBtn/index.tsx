import { FiEdit2 } from "react-icons/fi";
import { PropsModal } from "types";
import { EditBtn } from "./styles";

export default function EditButton(props: any
) {
  return (
    <>

      <EditBtn {...props}>
        <FiEdit2 />
      </EditBtn>
    </>
  )
}


  
  