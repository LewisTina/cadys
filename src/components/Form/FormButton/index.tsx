import useTranslation from "next-translate/useTranslation"
import style from './index.module.scss'

interface buttonProps {
    name: string
    type: "submit" | "button" | undefined
    isSecondary?: boolean
    isStepButton?: boolean
    action?: any
    autoSize?: any
    disable?: any
}

export default function FormButton(props: buttonProps){
    const {t} = useTranslation("common")
    const {name, type, isSecondary, isStepButton, action, autoSize, disable} = props
    return(
        <button 
            type={type}
            onClick={action}
            disabled={disable}
            className={`
                ${style.formButton}
                flex
                ${
                    isStepButton ?
                    "justify-between" :
                    "justify-center"
                }
                ${
                    autoSize ?
                    "w-auto" : 
                    "w-[345px]"
                }
                rounded-full
                py-2 px-8 my-2.5
                ${
                    isSecondary ?
                    "bg-transparent border-2 border-primary text-primary" :
                    "text-white bg-primary"
                }
                ${
                    disable ?
                    "bg-gray-300" : ""
                }
                font-bold
                capitalize
                shadow-flat 
                hover:dark:shadow-primary/20
                hover:shadow-primary/50
            `}>
            {t(name)}
            
            {
                isStepButton &&
                <span className="material-icons text-white">{"east"}</span>
            }
        </button>
    )
}