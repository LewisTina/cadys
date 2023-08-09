import useTranslation from "next-translate/useTranslation"
import { DM_Serif_Display } from "next/font/google"
import Image from "next/image"
import FormButton from "../Form/FormButton"
import { useRouter } from "next/router"

const dm_Serif_Display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin']
})

const Offers = {
    first : ["Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor","Lorem ipsum dolor", "Lorem ipsum dolor",],
    second: ["Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor","Lorem ipsum dolor", "Lorem ipsum dolor",],
    last: ["Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor", "Lorem ipsum dolor","Lorem ipsum dolor", "Lorem ipsum dolor",]
}

export default function OfferSection(props: any){
    const {t} = useTranslation('common')
    const router = useRouter()

    const OfferPoint = (props: {text: string}) => {
        const {text} = props
        return(
            <div className="flex m-2">
                <span 
                    className={`material-icons-outlined text-dark-grey mr-2`}>check_circle</span>

                <span className="">
                    {text}
                </span>

            </div>
        )

    }

    return(
        <section 
            className="
                w-full 
                p-10 sm:p-4
                flex justify-center bg-light-grey dark:bg-black">
            <div 
                className="
                    w-full
                    px-16 xl:px-0
                    max-w-[1535px]
                ">

                    <div 
                        className="
                            flex sm:flex-col
                            items-end sm:items-start
                            justify-between">
                        <div className="w-3/5 sm:w-full">
                            <h1 className="text-5xl md:text-3xl lg:text-4xl font-bold">
                                {t('offer_title')}
                            </h1>
                        </div>

                        <div className="sm:mt-8">
                            <FormButton
                                action={()=>{router.push("/quotation")}} 
                                autoSize={true} 
                                name={'ask_for_quotation'}
                                type={"button"} />

                            <span className="italic">
                                {t('quotation_without_engagement')}
                            </span>
                        </div>
                    </div>

                    <div className="py-8 w-4/5 lg:w-full">
                        <p className="">
                            {t('offer_description')}
                        </p>
                    </div>

                    <div 
                        className="
                            flex sm:flex-col lg:flex-wrap
                            justify-center lg:justify-start">
                        <div className="rounded-[2rem] bg-white dark:bg-darkest sm:max-w-full lg:max-w-[calc(50%-1rem)] p-4 lg:my-2 mx-2 md:mx-0 md:my-2">
                            <div className="rounded-2xl bg-light-grey dark:bg-black p-4 flex flex-col items-center">
                                    <Image 
                                        src={'/11.svg'} 
                                        alt={'cadis extended logo'}
                                        width={170}
                                        height={216}/>

                                    <span className="text-3xl mx-5 mt-5 block font-bold text-center">
                                        Lorem ipsum dolor
                                    </span>
                            </div>

                            <div className="mt-5">
                            {
                                Offers.first?.map((offerText: string, idx: number) => {
                                    return(
                                        <OfferPoint key={idx} text={offerText}/>
                                    )
                                })
                            }
                                
                            </div>
                        </div>
                        <div className="rounded-[2rem] bg-white dark:bg-darkest sm:max-w-full lg:max-w-[calc(50%-1rem)] p-4 lg:my-2 mx-2 md:mx-0 md:my-2">
                            <div className="rounded-2xl bg-light-grey dark:bg-black p-4 flex flex-col items-center">
                                    <Image 
                                        src={'/10.svg'} 
                                        alt={'cadis extended logo'}
                                        width={257}
                                        height={213}/>

                                    <span className="text-3xl mx-5 mt-5 block font-bold text-center">
                                        Lorem ipsum dolor
                                    </span>
                            </div>

                            <div className="mt-5">
                            {
                                Offers.first?.map((offerText: string, idx: number) => {
                                    return(
                                        <OfferPoint key={idx} text={offerText}/>
                                    )
                                })
                            }
                                
                            </div>
                        </div>
                        <div className="rounded-[2rem] bg-white dark:bg-darkest sm:max-w-full lg:max-w-[calc(50%-1rem)] p-4 lg:my-2 mx-2 md:mx-0 md:my-2">
                            <div className="rounded-2xl bg-light-grey dark:bg-black p-4 flex flex-col items-center">
                                    <Image 
                                        src={'/9.svg'} 
                                        alt={'cadis extended logo'}
                                        width={148}
                                        height={126}/>

                                    <span className="text-3xl mx-5 mt-5 block font-bold text-center">
                                        Lorem ipsum dolor
                                    </span>
                            </div>

                            <div className="mt-5">
                            {
                                Offers.first?.map((offerText: string, idx: number) => {
                                    return(
                                        <OfferPoint key={idx} text={offerText}/>
                                    )
                                })
                            }
                                
                            </div>
                        </div>
                    </div>

            </div>

        </section>

    )
}