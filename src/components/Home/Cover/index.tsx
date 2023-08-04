import useTranslation from 'next-translate/useTranslation'
import { DM_Serif_Display } from 'next/font/google'
import Image from 'next/image'
import { useState } from 'react'
import CheckItem from '../../Form/CheckItem'
import Link from 'next/link'
import style from './index.module.scss'
const options = ["daily_help", "household", "uo_and_bed", "social_life", "night_assist", "groceries"]

const dm_Serif_Display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin']
})

export default function Cover(props: any){
    const {t} = useTranslation('common')

    return(
        <div 
            style={{backgroundImage: 'url(/EllipseCover.svg)'}} 
            className="
                min-h-screen
                w-full
                flex 
                justify-center
                items-center
                bg-no-repeat 
                bg-right
            ">

                <div className="w-1/2 max-w-[767px] pl-16 pr-10 py-32">
                    <h1 className={`${dm_Serif_Display.className} text-7xl`}>
                        <span className="text-dark-grey">
                            {t("intro_part_1")}
                        </span> <br />
                        <span className="text-primary">
                            {t("intro_part_2")}
                        </span> <br />
                        <span className="text-dark-grey">
                            {t("intro_part_3")}
                        </span>
                    </h1>

                    <ul className={`
                        list-none text-base z-10 
                        flex flex-wrap 
                        py-8
                        `}>
                    {
                        options?.map((option: string, idx: number) => {
                            return(
                                <CheckItem 
                                    key={idx} 
                                    text={t(option)} 
                                    imgUrl={`/${idx + 1}.svg`}/>
                            )
                        })
                    }
                    </ul>

                    <p className="font-bold">
                        {t('intro_subtext')}
                    </p>
                </div>

                <div className="w-1/2 max-w-[767px] p-10 flex justify-between items-center">
                    <div className="flex items-center w-11/12 relative">
                        <div className="relative w-1/2 p-4 flex flex-col items-end">
                            <div className={`w-full my-4 relative rounded-[1.25rem] overflow-hidden aspect-[1/0.7] border-2 border-light-grey`}>
                                <Image
                                alt='object'
                                fill={true}
                                objectFit='cover'
                                src={"/gros-plan-mains-soutien.jpg"}
                                />
                            </div>
                            
                            <div className={`w-4/5 my-4 relative rounded-[1.25rem] overflow-hidden aspect-[1/0.8] border-2 border-light-grey`}>
                                <Image
                                alt='object'
                                fill={true}
                                objectFit='cover'
                                src={"/smiley-homme-femme-coup-moyen.jpg"}
                                />
                            </div>
                        </div>

                        <div className="relative w-1/2 p-4 flex flex-col items-start">
                            <div className={`w-full my-4 relative rounded-[1.25rem] overflow-hidden aspect-[1/0.7] border-2 border-light-grey`}>
                                <Image
                                alt='object'
                                fill={true}
                                objectFit='cover'
                                src={"/travailleur-social-prenant-soin-femme-ainee.jpg"}
                                />
                            </div>
                            
                            <div className={`w-4/5 my-4 relative rounded-[1.25rem] overflow-hidden aspect-[1/1.3] border-2 border-light-grey`}>
                                <Image
                                alt='object'
                                fill={true}
                                objectFit='cover'
                                src={"/personne-aidant-son-voisin-aine.jpg"}
                                />
                            </div>
                        </div>
                        
                    </div>

                    <div className="flex flex-col items-center text-2xl text-dark-grey/50 dark:text-white/50">
                        
                        <Link href="https://www.facebook.com/">
                            <i className="my-4 fa fa-facebook hover:text-primary transition"></i>
                        </Link>
                        
                        <Link href="https://www.instagram.com/">
                            <i className="my-4 fa fa-instagram hover:text-primary transition"></i>
                        </Link>

                        <Link href="https://twitter.com/">
                            <i className="my-4 fa fa-twitter hover:text-primary transition"></i>
                        </Link>
                        
                        <Link href="https://www.whatsapp.com/">
                            <i className="my-4 fa fa-whatsapp hover:text-primary transition"></i>
                        </Link>

                        <Link href="https://www.snapchat.com/add/">
                            <i className="my-4 fa fa-snapchat hover:text-primary transition"></i>
                        </Link>
                    </div>
                </div>
                
        </div>
    )
}