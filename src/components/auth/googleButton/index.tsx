import useTranslation from "next-translate/useTranslation"

/* eslint-disable @next/next/no-img-element */
export default function ConnectWithGoogle(props: any){
    const {t} = useTranslation('common')
    return(
        <button 
            className="flex p-3 items-center border-2 border-primary-dark/20 rounded-xl my-2
            w-[345px] shadow-lg dark:shadow-black/70">
           <img 
            className="pr-4"
            src="/google_logo.svg" 
            alt="google" />
            {t('continue_with_google')}
        </button>
    )
}