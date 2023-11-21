import useTranslation from 'next-translate/useTranslation'
import style from './index.module.scss'

interface operationSate{
    status : number
    message : string
    setShowMessage: any
}

export default function OperationSate(props: operationSate) {
    const {t} = useTranslation("common")
    const {message, status, setShowMessage} = props

    const getStatusElements = () => {
        if(status >= 200 && status <= 209) {
            return {theme: "green", label: "success"}
        }

        else if(status >= 400 && status <= 499) {
            return {theme: "orange", label: "request_error"}
        }
        
        else if(status >= 500 && status <= 599) {
            return {theme: "red", label: "server_error"}
        }
    }
    

    const dataElement = getStatusElements()

    return (
        <div className={`${style.OperationSate} flex justify-between py-3 px-4 rounded-full text-base`} 
            style={{
                border: `2px solid rgba(var(--${dataElement?.theme}), 1)`,
                backgroundColor: `rgba(var(--${dataElement?.theme}), 0.4)`
                }}>
                <i style={{
                color: `rgba(var(--${dataElement?.theme}), 1)`,
                }}
                className={`material-icons`}>info</i>
                <div className={`${style.message}`}>
                    <span>
                        {message}
                    </span>
                </div>
                <i 
                    className={`material-icons ${style.close}`}
                    onClick={()=>{setShowMessage(false)}}
                    >close</i>
            </div>
    )
    
}