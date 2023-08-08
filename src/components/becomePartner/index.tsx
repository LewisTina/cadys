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
                            w-1/5
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
        
        <section className="w-full p-10 flex justify-center">
            <div 
                className="
                    w-full
                    flex flex-row-reverse
                    px-16
                    max-w-[1535px]
                    ">

                <div className="w-1/2 pl-10 py-10 flex flex-col h-full justify-center">
                    <h1 className="text-[3rem] font-bold my-8"  style={{whiteSpace: "pre-line"}}>
                        {t('become_partner_question_answer')}
                    </h1>

                    <p className="">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores velit sed ullam fugit harum modi, odit aliquid quibusdam libero ea reprehenderit fugiat delectus nostrum totam neque necessitatibus sit nesciunt est.
                    </p>
                </div>

                <div 
                    className="
                        w-1/2 
                        p-5
                        aspect-square 
                        rounded-[3rem] 
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
                            rounded-3xl 
                            w-4/5 p-8 pb-4
                            flex flex-col
                            items-end
                            ">

                        <h2 className="text-xl font-bold text-center w-full">
                            {t('join_qualified_team')}
                        </h2>

                        <div className="my-8 w-full flex justify-between">
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