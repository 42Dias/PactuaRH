import { PropsModal } from "types";
import { HoverContainer } from "./styles";

export default function HoverInfo({ children, infoContent }: any
  ) {
    return (
      <>
      <HoverContainer>
      {children}
      <div className="checkText">
        <small> { infoContent } </small>
      </div>
      </HoverContainer>
      </>
    )
  }
  
  