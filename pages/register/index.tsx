import PresentationPanel from '@/src/components/auth/PresentationPannel'
import styles from '../../styles/authentication.module.scss'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import ConnectWithGoogle from '@/src/components/auth/googleButton'
import RegisterForm from './form'
import FormDivider from '@/src/components/Form/FormDevider'
import { useState } from 'react'
import Layout from '@/src/Layout'

export default function Register(props: any) {
    const {t} = useTranslation('common')
    const [step, setStep] = useState(0);

    const stepText = [
         {title: "create_account", description: "become_partner"},
         {title: "confirm_email", description: "an_email_was_send"},
         {title: "enter_brand_data", description: "brand_data_left"}
    ]
    
    return(
        <Layout title='register'>
        <main 
            className='
                flex 
                lg:flex-col
                items-center
                h-screen lg:h-auto lg:min-h-screen
                max-h-screen lg:max-h-none
                w-full'>
            <div 
                className={`${styles.action} 
                    flex flex-col 
                    items-center justify-center 
                    overflow-auto
                    lg:p-10
                    h-full 
                    w-1/2 lg:w-full md:w-96 sm:w-96 
                    `}>
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
                            {t(stepText[step].title)}
                        </h2>
                        <p className="">
                            {t(stepText[step].description)}
                        </p>
                    </div>

                    {
                        step < 1 &&
                        <>
                            <ConnectWithGoogle/>
                            <FormDivider/>
                        </>
                    }

                    <RegisterForm 
                        step={step} 
                        setStep={setStep} />
                </div>

            </div>

            <PresentationPanel 
                options={["daily_help", "groceries", "social_life", "night_assist", "household", "uo_and_bed",]}
                title={'join_our_team'} 
                img={'/infirmiere-prenant-soin-personne-agee.jpg'}/>
                
        </main>
        </Layout>
    )
}