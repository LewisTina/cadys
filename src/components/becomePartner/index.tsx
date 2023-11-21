import useTranslation from "next-translate/useTranslation"
import Image from "next/image"
import FormButton from "../Form/FormButton"
import { useRouter } from "next/router"

export default function BecomePartner(props: any){
    const {t} = useTranslation('common')
    const router = useRouter()

    const ImageBox = (props: {imgURL : string}) => {
        const {imgURL} = props
        return(
                    <span 
                        className={`
                          bg-primary/25
                            w-1/5 sm:w-[calc(50%-0.5rem)]
                            sm:my-2
                            aspect-square
                            flex
                            justify-center
                            items-center
                            rounded-2xl
                            transition
                            duration-500
                        `}>
                        <Image 
                            src={imgURL} 
                            alt={'Box image'}
                            height={67}
                            width={56}/>

                    </span>
        )
    }
    return(
        
        <section className="w-full p-10 md:px-0 flex justify-center">
            <div 
                className="
                    w-full
                    flex 
                    justify-start items-center
                    flex-row-reverse lg:flex-col-reverse
                    px-16 xl:px-4
                    max-w-[1535px]
                    ">

                <div 
                    className="
                        w-1/2 lg:w-full
                        pl-10 lg:p-0
                        py-10 
                        flex flex-col">
                    <h1 className="text-5xl md:text-3xl lg:text-4xl font-bold my-8"  style={{whiteSpace: "pre-line"}}>
                        {t('become_partner_question_answer')}
                    </h1>

                    <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores velit sed ullam fugit harum modi, odit aliquid quibusdam libero ea reprehenderit fugiat delectus nostrum totam neque necessitatibus sit nesciunt est.
                    </p>
                </div>

                <div 
                    className="
                        w-1/2 lg:w-full
                        max-w-[680px]
                        p-4
                        aspect-square sm:aspect-[1/2] 
                        rounded-[3rem] sm:rounded-3xl
                        bg-[url('/infirmiere-prenant-soin-personne-agee.jpg')]
                        bg-cover
                        bg-no-repeat 
                        bg-center
                        overflow-hidden
                        flex
                        items-end
                        justify-end
                        ">

                    <div 
                        className="
                            bg-white/80 dark:bg-darkest/80 
                            backdrop-blur-xl
                            rounded-3xl sm:rounded-2xl
                            w-4/5 sm:w-full
                            p-8 pb-4 sm:p-4 sm:pb-2
                            flex flex-col
                            items-end
                            ">

                        <h2 className="text-xl font-bold text-center w-full block sm:p-2">
                            {t('join_qualified_team')}
                        </h2>

                        <div 
                            className="
                                my-8 sm:my-0 
                                w-full 
                                flex sm:flex-wrap
                                justify-between">
                            <ImageBox imgURL={"/1.svg"}/>
                            <ImageBox imgURL={"/2.svg"}/>
                            <ImageBox imgURL={"/3.svg"}/>
                            <ImageBox imgURL={"/4.svg"}/>
                        </div>

                        <FormButton
                            action={()=>{router.push("/register")}} 
                            autoSize={true} 
                            name={'ask_for_quotation'}
                            type={"button"} />

                    </div>

                </div>

            </div>
        </section>
    )
}