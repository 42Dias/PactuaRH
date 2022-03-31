import { toast } from "react-toastify"

export default function handleCubagem(altura_cm, largura_cm, comprimento_cm, setcubagemEmbalagem){
        const cubagem_cm = (altura_cm * largura_cm * comprimento_cm)
        console.log(altura_cm, largura_cm, comprimento_cm)
        console.log(cubagem_cm)
        setcubagemEmbalagem(cubagem_cm)
    }
  