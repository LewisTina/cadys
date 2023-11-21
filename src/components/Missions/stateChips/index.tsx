import useTranslation from "next-translate/useTranslation"

interface state {
    state: string
}

export default function StateChips(props: state) {
    const {state} = props
    const {t} = useTranslation('common')

    const getStateElements = () => {
        switch(state){
            case 'IN_PROGRESS': 
                return {color: "blue",  icon: "incomplete_circle"}
            case 'PENDING': 
                return {color: "yellow",  icon: "hourglass_empty"}
            case 'DONE': 
                return {color: "green",  icon: "check_circle"}
            case 'CANCELED': 
                return {color: "orange",  icon: "cancel"}
            case 'REJECTED': 
                return {color: "red",  icon: "block"}
        }
    }
    

    const dataElement = getStateElements()

    return (
            !!state ?

            <div 
                style={{
                    border: `2px solid rgba(var(--${dataElement?.color}), 0.5)`,
                    backgroundColor: `rgba(var(--${dataElement?.color}), 0.1)`
                    }}
                className={`flex items-center py-1 px-3 rounded-md`}>
            <span 
                style={{color: `rgba(var(--${dataElement?.color}), 1)`}}
                className={`material-icons text-sm flex`}>
                {dataElement?.icon}
            </span>

            <span className="flex ml-2 text-xs text-black dark:text-white font-medium">
                {t(state)}
            </span>
            </div>

            :

            ""
    )
}