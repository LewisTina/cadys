import Image from "next/image"
import FormButton from "../Form/FormButton"
import SwitchTheme from "../core/SwitchTheme"

export default function Header(props: any){
    return(
        <header 
            className="
                fixed
                w-full
                px-10 py-2
                flex
                justify-between items-center
                bg-transparent
                backdrop-blur-2xl
            ">

            <div className="">
                <Image 
                    src={'/cadys_logo_extended.svg'} 
                    alt={'cadis extended logo'}
                    width={121}
                    height={58}/>
            </div>

            <div className="flex items-center">
                <FormButton
                    autoSize={true} 
                    name={'make_an_appointment'}
                    type={"button"} />

                <span className="m-2"></span>
                <FormButton 
                    autoSize={true} 
                    isSecondary={true}
                    name={'partner'}
                    type={"button"} />

                <span className="m-2"></span>
                <div className="">
                    <SwitchTheme></SwitchTheme>
                </div>
            </div>
            
        </header>
    )
}