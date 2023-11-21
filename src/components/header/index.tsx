import Image from "next/image"
import FormButton from "../Form/FormButton"
import SwitchTheme from "../core/SwitchTheme"
import { useRouter } from "next/router"

export default function Header(props: any){
    const router = useRouter()

    return(
        <header 
            className="
                fixed
                w-full
                bg-transparent
                backdrop-blur-2xl
                flex
                justify-center
                z-[90]
            ">

           <div className="
                w-full
                px-10 py-2 sm:px-4
                max-w-[1535px]
                flex
                justify-between items-center
           ">
             <div className="">
                <Image 
                    src={'/cadys_logo_extended.svg'} 
                    alt={'cadis extended logo'}
                    width={121}
                    height={58}/>
            </div>

            <div className="flex items-center">
                <div className="flex md:hidden">
                    <FormButton
                        action={()=>{router.push("/quotation")}} 
                        autoSize={true} 
                        name={'make_an_appointment'}
                        type={"button"} />

                    <span className="m-2"></span>
                    <FormButton
                        action={()=>{router.push("/register")}} 
                        autoSize={true} 
                        isSecondary={true}
                        name={'partner'}
                        type={"button"} />

                    <span className="m-2"></span>
                </div>
                <div className="">
                    <SwitchTheme></SwitchTheme>
                </div>
            </div>
           </div>
            
        </header>
    )
}