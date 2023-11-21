import { DM_Serif_Display } from 'next/font/google'
import Image from 'next/image'
import { useState } from 'react'

const dm_Serif_Display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin']
})


export default function ShowActivity(props: any){
    const {text, imgUrl} = props

    return (
        <li 
            className={` 
                ${dm_Serif_Display.className} 
                bg-white dark:bg-darkest
                border-2 border-deep-green
                flex
                items-center
                cursor-default
                p-2 pr-4 mx-2 my-2 
                transition
                duration-500
                rounded-3xl`}>
            <span 
                className={`
                    bg-primary/25
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