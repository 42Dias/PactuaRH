import { PropsModal } from "types";
import { Title } from "./styled";

export default function ConfigCheckTitle({titleConfig}: PropsModal) {
    return (
      <>
        <Title>{titleConfig}</Title>
      </>
    )
  }