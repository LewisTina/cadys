import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState, useTransition } from 'react'

interface FormRadioProps {
    option:   string;
    controller:  any;
    getValues: any;
    name: string;
    id: string;
    value: boolean
    trigger: any
}

export default function FormRadio(props: FormRadioProps){
    const {option, controller, getValues, name, id, value, trigger} = props
    const {t} = useTranslation('common')

    const handleChange = () => {
        trigger([name])
    }

    let SavedValue = getValues(name)

    let SavedValueParsed = !!SavedValue ? JSON.parse(getValues(name)) : undefined

    return (
        <>
        <span className="">
            {t(name)}
        </span>
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

            <span className={`font-bold block`}>
                    {t(option)}
            </span>
        </label>
        </>
    )
}