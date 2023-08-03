import useTranslation from 'next-translate/useTranslation'
import { useState, useTransition } from 'react'

export default function CheckIBoxDescribed(props: any){
    const {title, text, action} = props
    const [checked, setChecked] = useState(false)
    const {t} = useTranslation('common')

    return (
        <li 
            onClick={() => {setChecked(!checked), action}}
            className={` 
                ${checked ? "bg-primary/25" : "bg-white dark:bg-darkest"}
                border-2 border-primary
                cursor-pointer 
                p-4 mr-4 mb-6 
                transition
                duration-500
                max-w-[280px]
                relative
                rounded-3xl`}>

            <span className={`
                    material-icons
                    ${checked ? "text-primary" : "text-gray-300"}
                    absolute top-1 right-2 text-lg`}>
                check_circle
            </span>

            <span className={`font-bold block`}>
                    {t(title)}
            </span>

            <span className="block text-dark-grey dark:text-white/70">
                {t(text)}
            </span>
        </li>
    )
}