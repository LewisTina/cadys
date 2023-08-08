import { DM_Serif_Display } from 'next/font/google'
import Image from 'next/image'
import { useState } from 'react'

const dm_Serif_Display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin']
})


export default function CheckItem(props: any){
    const {text, imgUrl, action, clickable} = props
    const [checked, setChecked] = useState(false)

    return (
        <li 
            onClick={() => {clickable && (setChecked(!checked), action)}}
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
        </li>
    )
}