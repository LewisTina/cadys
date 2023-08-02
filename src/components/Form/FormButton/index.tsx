import useTranslation from "next-translate/useTranslation"
import style from './index.module.scss'

interface buttonProps {
    name: string
    type: "submit" | "button" | undefined
    isSecondary?: boolean
    isStepButton?: boolean
    action?: any
}

export default function FormButton(props: buttonProps){
    const {t} = useTranslation("common")
    const {name, type, isSecondary, isStepButton, action} = props
    return(
        <button 
            type={type}
            onClick={action}
            className={`
                ${style.formButton}
                flex
                ${
                    isStepButton ?
                    "justify-between" :
                    "justify-center"
                }
                w-[345px]
                rounded-[24px]
                py-3 px-4 my-2.5
                bg-primary
                text-white
                font-bold
                capitalize
                shadow-flat 
                hover:dark:shadow-primary/20
                hover:shadow-primary/50
                ${
                    isSecondary &&
                    "bg-white border-2 border-primary text-primary"
                }
            `}>
            {t(name)}
            
            {
                isStepButton &&
                <span className="material-icons text-white">{"east"}</span>
            }
        </button>
    )
}