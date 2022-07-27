import { FiEdit, FiTrash2 } from "react-icons/fi";
import { PropsScoreComponent } from "types";

export function ScoreComponent({titleAvaliation, from, to, id, kindOfAvaliation, handleDeleteSubItem, handleSetValuesAndOpenEditScore }: PropsScoreComponent) {
    return (
      <div>
        <div className="gridScore addBox">
          <span>{titleAvaliation}</span>
          <span>{from} {kindOfAvaliation === "porcentagem" && "%"} </span>
          <span>{to  } {kindOfAvaliation === "porcentagem" && "%"} </span>
          <div>
            <button onClick={() => handleDeleteSubItem(id!)}>
              <FiTrash2 />
            </button>
            <button onClick={() => handleSetValuesAndOpenEditScore(id! ,from! ,to! ,titleAvaliation!)   
            }>
              <FiEdit />
            </button>
          </div>
        </div>
      </div>
    )
  }