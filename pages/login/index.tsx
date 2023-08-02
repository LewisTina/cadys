import PresentationPanel from '@/src/components/auth/PresentationPannel'
import styles from '../../styles/authentication.module.scss'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import ConnectWithGoogle from '@/src/components/auth/googleButton'
import LoginForm from './form'
import FormDivider from '@/src/components/Form/FormDevider'
import { useState } from 'react'

export default function Register(props: any) {
    const {t} = useTranslation('common')

    const stepText = [
         {title: "create_account", description: "become_partner"},
         {title: "confirm_email", description: "an_email_was_send"},
         {title: "enter_brand_data", description: "brand_data_left"}
    ]
    
    return(
        <main className='flex h-screen max-h-screen w-screen items-center'>
            <div className={`${styles.action} flex flex-col items-center justify-evenly overflow-auto`}>
                <div className="m-4 flex-col flex">
                    <div className={`${styles.logo}  w-[345px]`}>
                        <Image 
                            src={'/cadys_logo_extended.svg'} 
                            alt={'cadis extended logo'}
                            width={121}
                            height={58}/>
                    </div>

                    <div className={`${styles.introduction} py-4 w-[345px]`}>
                        <h2 className='font-bold'>
                            {t("welcome_back")}
                        </h2>
                        <p className="">
                            {t("connect_to_your_account")}
                        </p>
                    </div>

                            <ConnectWithGoogle/>
                            <FormDivider/>

                    <LoginForm/>
                </div>

            </div>

            <PresentationPanel 
                title={'view_your_activities'} 
                img={'travailleur-social-prenant-soin-femme-ainee.jpg'}/>
                
        </main>
    )
}