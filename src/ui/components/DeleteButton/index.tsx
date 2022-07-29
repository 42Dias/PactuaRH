import { FiTrash2 } from "react-icons/fi";
import { PropsModal } from "types";
import { DeleteBtn } from "./styles";

export default function DeleteButton(props: any
) {
  return (
    <>

      <DeleteBtn {...props}>
        <FiTrash2 />
      </DeleteBtn>
    </>
  )
}

