"use client"

import { useForm } from 'react-hook-form'
import FormInputField from '@/src/components/Form/FormInputField'
import FormButton from '@/src/components/Form/FormButton';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import AutoCompletePostal from '@/src/components/Form/PostalInput';
import CheckItem from '@/src/components/Form/CheckItem';
import CheckIBoxDescribed from '@/src/components/Form/CheckBoxDescribed';
const options = ["daily_help", "groceries", "social_life", "night_assist", "household", "uo_and_bed"]

interface QuotationFormProps {
    step: any,
    setStep: any
}

export default function QuotationForm(props: QuotationFormProps){
    const {step, setStep} = props
    const router = useRouter()
    const {t} = useTranslation('common')
    const { 
        register, 
        handleSubmit, 
        getValues, 
        setValue,
        trigger, 
        reset,
        unregister,
        formState: {errors}
      } = useForm({});

    const onSubmitStep0 = async (d:any) => {
        console.log(d)
    };


    const fieldGroups = [
        <form onSubmit={handleSubmit(onSubmitStep0)} className={"flex flex-col"} id="step0" key="0">   
            <FormInputField 
                controller={register}
                require={errors}
                name={'email'} 
                icon={'email'} 
                type={'email'}
                placeholder={'email_address'}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'date'} 
                icon={'calendar_month'} 
                type={'date'}
                placeholder={'intervention_date'}/>

            <AutoCompletePostal 
                controller={register}
                require={errors}
                name={'zip_code'}
                icon={'my_location'}
                placeholder={'postal_code'} 
                townController={'town'} 
                setValue={setValue} 
                trigger={trigger}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'town'} 
                icon={'location_city'} 
                placeholder={'town'}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'address'} 
                icon={'location_on'} 
                placeholder={'address'}/>

            <FormButton 
                action={() =>{setStep(step + 1)}}
                name={'continue'}
                type={"button"} 
                isStepButton={true}/>
        </form>,

        <form onSubmit={handleSubmit(onSubmitStep0)} className={"flex flex-col"} id="step0" key="0">   
            <ul className={`
                        list-none text-base z-10 
                        flex flex-wrap 
                        max-w-[580px]
                        `}>
                    {
                        options?.map((option: string, idx: number) => {
                            return(
                                <CheckItem 
                                    key={idx} 
                                    text={t(option)} 
                                    clickable={true}
                                    imgUrl={`/${idx + 1}.svg`}
                                    unregister={unregister} 
                                    setValue={setValue}/>
                            )
                        })
                    }
                </ul>

            <FormButton 
                action={() =>{setStep(step + 1)}}
                name={'continue'}
                type={"button"} 
                isStepButton={true}/>
        </form>,

        <form onSubmit={handleSubmit(onSubmitStep0)} className={"flex flex-col"} id="step0" key="0">  
            <ul className={`
                        list-none text-base z-10 
                        flex flex-wrap md:flex-col md:flex-nowrap md:items-center
                        `}>
                        <CheckIBoxDescribed title={'urgent_request'} text={'urgent_request_description'}/>
                        <CheckIBoxDescribed title={'simple_request'} text={'simple_request_description'}/>
                </ul>
            
            <FormButton 
                name={'finish'}
                type={"submit"} />
        </form>,
    ]
    
    return(
        <>
            {fieldGroups[step]}
        </>
    )
}