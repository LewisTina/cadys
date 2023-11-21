import { DM_Serif_Display } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const dm_Serif_Display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin']
})

interface checkActivity {
    imgUrl:   string;
    name:   string;
    controller:  any;
    text: string;
    getValues: any;
    value: string
}

export default function CheckItem(props: checkActivity){
    const {text, imgUrl, controller, name, getValues, value} = props
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        let value = getValues(name)
        setChecked(value)
    }, [getValues, name])
    

    return (
        <label 
            htmlFor={name}
            className={` 
                ${dm_Serif_Display.className} 
                ${checked ? "bg-primary/25" : "bg-white dark:bg-darkest"}
                border-2 border-deep-green
                flex
                items-center
                cursor-pointer
                p-2 pr-4 mr-4 mb-4 
                transition
                duration-500
                rounded-3xl`}>
        <input 
            id={name}
            type='checkbox'
            value={value}
            onClick={() => {setChecked(!checked)}}
            className='hidden'
            {...controller(name, {
                required:false,
            }
            )}>
        </input>

        <span 
                className={`
                    ${checked ? "transparent" : "bg-primary/25"}
                    h-14
                    mr-4
                    aspect-square
                    flex
                    justify-center
                    items-center
                    rounded-2xl
                    transition
                    duration-500
                `}>
                    <Image 
                        src={imgUrl} 
                        alt={'action icon'}
                        height={35}
                        width={35}>

                    </Image>
                </span>
            {(text)}
        </label>
    )
}