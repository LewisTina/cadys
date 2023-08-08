import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import Link from "next/link"

export default function Footer(props: any){
    const {t} = useTranslation('common')
    return (
        <footer 
            className="
                w-full h-auto
                flex
                justify-center
            ">

                

                <div 
                    className={`
                    relative 
                    w-full
                    max-w-[1535px]
                    h-auto 
                    flex flex-col 
                    justify-center items-center
                    `}>

                    <div 
                        className={`
                            absolute
                            top-0
                            w-[calc(90%-6rem)]
                            px-5
                            py-20
                            h-full
                            rounded-xl
                            bg-primary/10
                            transition
                            z-10
                            `}>
                                
                    </div>
                    <div 
                        className={`
                            absolute
                            w-[calc(90%-3rem)]
                            px-5
                            py-20
                            h-full
                            rounded-xl
                            bg-[#CCF3CC]
                            top-4
                            transition
                            duration-500
                            z-20
                            `}>
                    </div>
                    <div 
                        className={`
                            absolute
                            w-[90%]
                            flex
                            justify-between
                            items-center
                            p-10
                            shadow-[0px_0px_20px_8px_rgba(0,0,0,0.15)] dark:shadow-[0px_0px_20px_8px_rgba(0,0,0,0.5)]
                            rounded-t-xl
                            bg-white/90 dark:bg-darkest
                            top-8
                            transition
                            z-30
                            `}>

                                <div className="">
                                    <Image 
                                        src={'/cadys_logo_extended.svg'} 
                                        alt={'cadis extended logo'}
                                        width={121}
                                        height={58}/>

                                    <span className="mt-4 block">
                                        © 2023  Cadys {t('copyright')}
                                    </span>
                                </div>


                                <div className="flex items-start">
                                    <div className="block mx-10">
                                        <span className="font-bold">
                                            {t('legal_mention')}
                                        </span>

                                        <span className="block">
                                            <Link className="hover:text-primary" href="/">{t('about_us')}</Link>
                                        </span>

                                        <span className="block">
                                            <Link className="hover:text-primary" href="/">{t('terms_of_use')}</Link>
                                        </span>

                                        <span className="block">
                                            <Link className="hover:text-primary" href="/">{t('confidentiality_policy')}</Link>
                                        </span>
                                    </div>

                                    <div className="block mx-10">
                                        <span className="font-bold">
                                            {t('useful_link')}
                                        </span>

                                        <span className="block">
                                            <Link className="hover:text-primary" href="/">{t('contact_us')}</Link>
                                        </span>

                                        <span className="block">
                                            <Link className="hover:text-primary" href="/">{t('partner')}</Link>
                                        </span>

                                        <span className="block">
                                            <Link className="hover:text-primary" href="/">{t('FAQ')}</Link>
                                        </span>
                                    </div>
                                </div>
                    </div>
                </div>

        </footer>
    )
}