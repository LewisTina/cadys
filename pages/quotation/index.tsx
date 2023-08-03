import Image from "next/image"
import style from "./index.module.scss"
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import QuotationForm from "./form";

export default function Quotation(props: any){
    const [step, setStep] = useState(0);
    const {t} = useTranslation('common')
    return(
        <main 
            className='
                bg-light-grey dark:bg-black
                relative
                flex 
                lg:flex-col
                items-center
                h-screen lg:h-auto lg:min-h-screen
                max-h-screen lg:max-h-none
                w-full'>

                        <Image 
                            className={`${style.firstImage} fixed`}
                            src={'/Rectangle1.svg'} 
                            alt={'cadis extended logo'}
                            width={555}
                            height={555}/>

                        <Image 
                            className={`${style.secondImage} fixed`}
                            src={'/Rectangle2.svg'} 
                            alt={'cadis extended logo'}
                            width={745}
                            height={745}/>

            <div className={`${style.left} flex items-end h-full w-1/2 overflow-hidden`}>
                <div 
                    className={`
                    ${style.cardStacked}
                    relative 
                    w-full aspect-square 
                    flex flex-col 
                    justify-center items-center
                    rotate-[27deg]
                    `}>
                    <div 
                        className={`
                            ${style.card1}
                            absolute
                            top-0
                            aspect-square 
                            w-8/12
                            px-5
                            py-20
                            rounded-xl
                            ${step == 2 ? "bg-primary" : "bg-white/50"}
                            max-w-[487px]
                            transition
                            ${"z-10"}
                            `}>
                            
                            <div className="flex items-center -rotate-[27deg] text-white">
                                <div className={`${style.step}`}>
                                    O3
                                </div>
                                <div className={`${style.stepText} ml-4`}>
                                    <span className="block text-4xl font-bold">{t('step_3')}</span>
                                    <span className="block text-2xl">{t('step_3_text')}</span>
                                </div>
                            </div>
                                
                    </div>
                    <div 
                        className={`
                            ${style.card2} 
                            absolute
                            aspect-square 
                            w-9/12
                            px-10
                            py-20
                            shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.07)]
                            rounded-xl
                            ${step == 1 ? "bg-primary" : "bg-white dark:bg-darkest"}
                            ${step == 2 ? "bg-white/50" : ""}
                            ${step > 1 ? "top-[47%]" : "top-[3%]"}
                            max-w-[546px]
                            transition
                            duration-500
                            ${"z-20"}
                            `}>
                            
                            <div className="flex items-center -rotate-[27deg] text-white">
                                <div className={`${style.step}`}>
                                    O2
                                </div>
                                <div className={`${style.stepText} ml-4`}>
                                    <span className="block text-4xl font-bold">{t('step_2')}</span>
                                    <span className="block text-2xl">{t('step_2_text')}</span>
                                </div>
                            </div>
                    </div>
                    <div 
                        className={`
                            ${style.card3} 
                            absolute
                            aspect-square 
                            w-10/12
                            p-12
                            shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.07)]
                            rounded-xl
                            ${step == 0 ? "bg-primary" : "bg-white dark:bg-darkest"}
                            ${step > 0 ? "top-[50%]" : "top-[7%]"}
                            max-w-[600px]
                            transition
                            ${"z-30"}
                            `}>
                            
                        <div className="flex items-center -rotate-[27deg] text-white">
                            <div className={`${style.step}`}>
                                O1
                            </div>
                            <div className={`${style.stepText} ml-4`}>
                                <span className="block text-4xl font-bold">{t('step_1')}</span>
                                <span className="block text-2xl">{t('step_1_text')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div 
                className={`
                    ${style.right} 
                    bg-white/70  dark:bg-darkest/70
                    p-10 
                    backdrop-blur-[100px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    h-full 
                    w-1/2`}>

                <div className="m-4 flex-col flex">
            
                    {
                        step > 0 &&
                        <div className="flex">
                            <span 
                                className="
                                    material-icons 
                                    flex
                                    p-3
                                    my-4
                                    shadow-md
                                    cursor-pointer
                                    text-primary
                                    hover:bg-primary/25
                                    border-2 border-transparent hover:border-primary
                                    bg-white/70 dark:bg-black/70
                                    rounded-2xl
                                    backdrop-blur-2xl
                                    transition"
                                    onClick={()=>{setStep(step - 1)}}>
                                    {"west"}
                                </span>
                        </div>
                    }
                    <div className={`${style.logo}  w-[345px]`}>
                        <Image 
                            src={'/cadys_logo_extended.svg'} 
                            alt={'cadis extended logo'}
                            width={121}
                            height={58}/>
                    </div>

                    <div className={`${style.introduction} py-4 w-[345px]`}>
                        <h2 className='font-bold'>
                            {t("get_quotation")}
                        </h2>
                        <p className="">
                            {t("request_quotation")}
                        </p>
                    </div>

                    <QuotationForm step={step} setStep={setStep}/>
                </div>

            </div>
            
        </main>
    )
}