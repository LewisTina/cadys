import Image from "next/image"
import style from "./index.module.scss"
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import QuotationForm from "./form";

export default function Quotation(props: any){
    const [step, setStep] = useState(0);
    const {t} = useTranslation('common')

    const Step = (props: {id: number, text: string}) => {
        const {id, text} = props
        return (
            <div className="flex items-center -rotate-[27deg] lg:rotate-0 text-white">
                <div className={`${style.step} text-[10rem] lg:text-7xl`}>
                    {"O"+ id}
                </div>
                <div className={`${style.stepText} ml-4`}>
                    <span className="block text-4xl lg:text-2xl font-bold">{t('step')} &nbsp; {id}</span>
                    <span className="block text-2xl lg:text-base">{t(text)}</span>
                </div>
            </div> 
        )
    }
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

            <div 
                className={`
                    flex items-end
                    lg:sticky
                    lg:top-0
                    lg:left-0
                    z-50
                    lg:backdrop-blur-sm 
                    h-full 
                    w-1/2 lg:w-full
                    overflow-hidden`}>
                <div 
                    className={`
                    ${style.cardStacked}
                    relative 
                    w-full aspect-square lg:aspect-auto
                    lg:h-40 
                    flex flex-col 
                    justify-center items-center
                    rotate-[27deg] lg:rotate-0 
                    bottom-[-27vw] lg:bottom-0
                    right-[10vw] lg:right-auto
                    `}>
                    <div 
                        className={`
                            ${style.card1}
                            absolute
                            top-0 lg:top-4
                            aspect-square lg:aspect-auto 
                            w-8/12 lg:w-9/12
                            px-5
                            py-20  lg:p-4
                            rounded-xl
                            ${step == 2 ? "bg-primary" : "bg-white/50"}
                            max-w-[487px]
                            transition
                            ${"z-10"}
                            `}>
                            
                            <Step id={3} text={'step_3_text'}/>
                                
                    </div>
                    <div 
                        className={`
                            ${style.card2} 
                            absolute
                            aspect-square lg:aspect-auto 
                            w-9/12 lg:w-10/12
                            px-10
                            py-20 lg:p-4
                            shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.07)]
                            rounded-xl
                            backdrop-blur-sm
                            ${step == 1 ? "bg-primary" : "bg-white dark:bg-darkest"}
                            ${step == 2 ? "bg-white/70 dark:bg-darkest/70" : ""}
                            ${step > 1 ? "top-[47%] lg:top-28" : "top-[3%] lg:top-8"}
                            max-w-[546px]
                            transition
                            duration-500
                            ${"z-20"}
                            `}>
                            
                            <Step id={2} text={'step_2_text'}/>
                    </div>
                    <div 
                        className={`
                            ${style.card3} 
                            absolute
                            aspect-square lg:aspect-auto 
                            w-10/12 lg:w-11/12
                            p-12 lg:p-4
                            shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.07)]
                            rounded-xl
                            ${step == 0 ? "bg-primary" : "bg-white dark:bg-darkest"}
                            ${step > 0 ? "top-[50%] lg:top-32 lg:p-8" : "top-[7%] lg:top-12"}
                            max-w-[600px]
                            transition
                            ${"z-30"}
                            `}>
                            
                            <Step id={1} text={'step_1_text'}/>
                    </div>
                </div>
            </div>

            <div 
                className={`
                    ${style.right} 
                    bg-white/70  dark:bg-darkest/70
                    p-10 md:p-0 
                    backdrop-blur-[100px]
                    flex
                    flex-col
                    items-center
                    justify-center lg:justify-start
                    h-full lg:min-h-[calc(100vh-10rem)]
                    w-1/2 lg:w-full`}>

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
                                    shadow-lg
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