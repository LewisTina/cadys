import useTranslation from "next-translate/useTranslation"
import { DM_Serif_Display } from "next/font/google"
import Image from "next/image"

const dm_Serif_Display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin']
})

export default function TrustSection(props: any){
    const {t} = useTranslation('common')

    return(
        <section className="w-full p-10 md:p-0 lg:p-5 flex justify-center">
            <div 
                className="
                    w-full
                    max-w-[1535px]
                ">

                    <h1 className={`${dm_Serif_Display.className} text-3xl font-bold flex justify-center text-center`}>
                        {t('trust_us')}
                    </h1>

                    <div 
                        className="
                            flex sm:flex-col
                            p-10 md:py-4 xl:px-0
                            justify-center items-center">

                        <div 
                            className="
                                w-1/2 sm:w-full
                                max-w-[627px] 
                                flex flex-col">
                            <div className="p-2 m-3 bg-primary/25 rounded-xl">
                                <div className="p-8">
                                    <span className={`${dm_Serif_Display.className} font-bold text-primary text-4xl block`}>
                                        {t('reliable_help')}
                                    </span>
                                    <span className={`block my-4`}>
                                        {t('reliable_help_text')}
                                    </span>
                                </div>
                                <div className="w-full flex justify-end">
                                    <Image 
                                        src={'/7.svg'} 
                                        alt={'cadis extended logo'}
                                        width={200}
                                        height={232}/>

                                </div>
                            </div>
                            <div className="p-2 m-3 border-4 dark:border-black bg-light-grey/25 dark:bg-black/25 rounded-xl">
                                <div className="p-8">
                                    <span className={`${dm_Serif_Display.className} font-bold text-primary text-4xl block`}>
                                        {t('adjustable_help')}
                                    </span>
                                    <span className={`block my-4`}>
                                        {t('adjustable_help_text')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div 
                            className="
                                w-1/2 sm:w-full
                                max-w-[627px] 
                                flex flex-col">
                            <div className="p-2 m-3 bg-light-grey dark:bg-black rounded-xl">
                                <div className="p-8">
                                    <span className={`${dm_Serif_Display.className} font-bold text-primary text-4xl block`}>
                                        {t('service_diversity')}
                                    </span>
                                    <span className={`block my-4`}>
                                        {t('service_diversity_text')}
                                    </span>
                                </div>
                                <div className="w-full flex justify-end">
                                    <Image 
                                        src={'/8.svg'} 
                                        alt={'cadis extended logo'}
                                        width={268}
                                        height={214}/>

                                </div>
                            </div>
                        </div>
                    </div>

            </div>

        </section>

    )
}