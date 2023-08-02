import useTranslation from 'next-translate/useTranslation'
import style from './index.module.scss'
import { DM_Serif_Display } from 'next/font/google'
import Image from 'next/image'

const dm_Serif_Display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin']
})

interface panelProps{
    title: string
    img: string
    options?: string[]
}

function PresentationPuce(props: any){
    const {text} = props

    return (
        <li className="bg-white/25 px-10 py-5 mr-6 mt-6 rounded-2xl backdrop-blur-2xl">
            {(text)}
        </li>
    )
}

export default function PresentationPanel(props: panelProps){
    const {t} = useTranslation('common')
    const {title, img, options} = props
    return(
        <div 
            style={{backgroundImage: `url(${img}`}} 
            className={`${style.presentation} ${dm_Serif_Display.className} text-white bg-no-repeat bg-cover bg-center p-20 relative h-full flex flex-col justify-end`}>

                <ul className={`${style.top} list-none text-base z-10 flex flex-wrap max-w-lg`}>
                    {
                        options?.map((option: string, idx: number) => {
                            return(
                                <PresentationPuce key={idx} text={t(option)}/>
                            )
                        })
                    }
                </ul>

                <div className={`${style.bottom} flex justify-between items-end z-10 pt-10`}>
                    <div className={`${style.title}`}>
                        <h1>
                            {t(title)}
                        </h1>
                    </div>

                    <div className={`${style.logo} py-6`}>
                        <Image 
                            src={'/logo_cadis.svg'} 
                            alt={'cadis logo'}
                            width={87}
                            height={87}
                            />
                    </div>

                </div>

        </div>
    )
}