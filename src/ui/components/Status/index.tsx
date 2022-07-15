import { useState } from "react"

export default function Status({ active }: any) {
    const [isActiveColor, setIsActiveColor] = useState(false || !!active)

    function changeColor() {
      if (isActiveColor === false) {
        setIsActiveColor(true)
      } else {
        setIsActiveColor(false)
      }
    }


    return (
      <span
        onClick={changeColor}
        className={`${isActiveColor ? 'activeColor' : ''}`}
      />
    )
}