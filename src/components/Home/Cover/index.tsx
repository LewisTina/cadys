import useTranslation from 'next-translate/useTranslation'
import { DM_Serif_Display } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import FormButton from '../../Form/FormButton'
import { useRouter } from 'next/router'
import { useDataContext } from '@/src/context/GlobalUserDataContext'
import ShowActivity from '../../Form/showActivity'

const dm_Serif_Display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin']
})

export default function Cover(props: any){
    const {t} = useTranslation('common')
    const router = useRouter()
    const {data} = useDataContext()
    const activities = data?.activities
    const locale = router.locale as string

    return(
        <div 
            style={{backgroundImage: 'url(/EllipseCover.svg)'}} 
            className="
                h-screen xl:h-auto
                max-h-[820px] lg:max-h-none
                w-full
                max-w-[1535px]
                flex lg:flex-col
                justify-center lg:justify-start
                items-center sm:items-start
                bg-contain sm:bg-cover
                bg-no-repeat 
                bg-right sm:bg-center lg:bg-bottom
            ">

                <div 
                    className="
                        w-1/2 lg:w-full
                        px-12 py-32 sm:px-4 lg:py-4
                        lg:mt-24
                        ">
                    <h1 className={`${dm_Serif_Display.className} text-7xl md:text-5xl`}>
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
                        list-none text-base
                        flex flex-wrap 
                        py-8
                        `}>
                    {
                        activities?.map((option: any, idx: number) => {
                            return(
                                <ShowActivity 
                                    key={idx} 
                                    text={option.title_i18n[locale]} 
                                    imgUrl={`/${idx + 1}.svg`}/>
                            )
                        })
                    }
                    </ul>

                    <p className="font-bold">
                        {t('intro_subtext')}
                    </p>

                    <div className="hidden md:block">
                        <FormButton
                            action={()=>{router.push("/quotation")}} 
                            name={'make_an_appointment'}
                            type={"button"} />

                        <FormButton
                            action={()=>{router.push("/register")}} 
                            isSecondary={true}
                            name={'partner'}
                            type={"button"} />

                    </div>
                </div>

                <div 
                    className="
                        w-1/2 lg:w-full
                        p-10 sm:p-4
                        flex sm:flex-col
                        justify-between items-center">

                    <div 
                        className="
                            flex sm:flex-col 
                            items-center 
                            w-full sm:w-full
                            relative">

                        <div 
                            className="
                                relative 
                                w-1/2 sm:w-full
                                p-4 flex flex-col 
                                items-end sm:items-center">
                            <div className={`w-full my-4 relative rounded-[1.25rem] overflow-hidden aspect-[1/0.7] border-2 border-light-grey`}>
                                <Image
                                alt='object'
                                fill={true}
                                className='object-cover'
                                src={"/gros-plan-mains-soutien.jpg"}
                                />
                            </div>
                            
                            <div className={`w-4/5 my-4 relative rounded-[1.25rem] overflow-hidden aspect-[1/0.8] border-2 border-light-grey`}>
                                <Image
                                alt='object'
                                fill={true}
                                className='object-cover'
                                src={"/smiley-homme-femme-coup-moyen.jpg"}
                                />
                            </div>
                        </div>

                        <div 
                            className="
                                relative 
                                w-1/2 sm:w-full
                                 p-4 flex flex-col
                                items-start  sm:items-center">
                            <div className={`w-full my-4 relative rounded-[1.25rem] overflow-hidden aspect-[1/0.7] border-2 border-light-grey`}>
                                <Image
                                alt='object'
                                fill={true}
                                className='object-cover'
                                src={"/travailleur-social-prenant-soin-femme-ainee.jpg"}
                                />
                            </div>
                            
                            <div className={`w-4/5 my-4 relative rounded-[1.25rem] overflow-hidden aspect-[1/1.3] border-2 border-light-grey`}>
                                <Image
                                alt='object'
                                fill={true}
                                className='object-cover'
                                src={"/personne-aidant-son-voisin-aine.jpg"}
                                />
                            </div>
                        </div>
                        
                    </div>

                    <div 
                        className="
                            flex flex-col sm:flex-row
                            items-center text-2xl text-dark-grey/50 dark:text-white/50">
                        
                        <Link href="https://www.facebook.com/">
                            <i className="my-4 sm:mx-4 fa fa-facebook hover:text-primary transition"></i>
                        </Link>
                        
                        <Link href="https://www.instagram.com/">
                            <i className="my-4 sm:mx-4 fa fa-instagram hover:text-primary transition"></i>
                        </Link>

                        <Link href="https://twitter.com/">
                            <i className="my-4 sm:mx-4 fa fa-twitter hover:text-primary transition"></i>
                        </Link>
                        
                        <Link href="https://www.whatsapp.com/">
                            <i className="my-4 sm:mx-4 fa fa-whatsapp hover:text-primary transition"></i>
                        </Link>

                        <Link href="https://www.snapchat.com/add/">
                            <i className="my-4 sm:mx-4 fa fa-snapchat hover:text-primary transition"></i>
                        </Link>
                    </div>
                </div>
                
        </div>
    )
}