import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState, useTransition } from 'react'

interface RadioDescribedProps {
    title:   string;
    text:   string;
    controller:  any;
    getValues: any;
    name: string;
    id: string;
    value: boolean
    trigger: any
}

export default function RadioDescribed(props: RadioDescribedProps){
    const {title, text, controller, getValues, name, id, value, trigger} = props
    const {t} = useTranslation('common')

    const handleChange = () => {
        trigger([name])
    }

    let SavedValue = getValues(name)

    let SavedValueParsed = !!SavedValue ? JSON.parse(getValues(name)) : undefined

    return (
        <label 
            htmlFor={id}
            className={` 
                ${SavedValueParsed == value ? "bg-primary/25" : "bg-white dark:bg-darkest"}
                border-2 border-primary
                cursor-pointer 
                p-4 mr-4 mb-6 
                transition
                duration-500
                max-w-[280px]
                relative
                rounded-3xl`}>

        <input 
            id={id}
            type='radio'
            value={value}
            onClick={() => {handleChange()}}
            className='hidden'
            {...controller(name, {
                required:true,
            }
            )}>
        </input>

            <span className={`
                    material-icons
                    ${SavedValueParsed == value ? "text-primary" : "text-gray-300"}
                    absolute top-1 right-2 text-lg`}>
                check_circle
            </span>

            <span className={`font-bold block`}>
                    {t(title)}
            </span>

            <span className="block text-dark-grey dark:text-white/70">
                {t(text)}
            </span>
        </label>
    )
}