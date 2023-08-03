"use client"

import { useForm } from 'react-hook-form'
import FormInputField from '@/src/components/Form/FormInputField'
import FormButton from '@/src/components/Form/FormButton';
import ValidationInput from '@/src/components/Form/ValidationInput';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import FormSelect from '@/src/components/Form/FormSelect';
import compagnieTypes from '@/company_type.json'
import FormMultiSelect from '@/src/components/Form/FormMultiSelect';
import AutoCompletePostal from '@/src/components/Form/PostalInput';

interface RegisterFormProps {
    step: any,
    setStep: any
}

export default function RegisterForm(props: RegisterFormProps){
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
                placeholder={'login_email'}/>

            <FormInputField 
                controller={register}
                require={errors}
                type='password'
                name={'password'} 
                icon={'lock'} 
                placeholder={'password'}/>

            <FormInputField 
                controller={register}
                require={errors}
                type='password'
                name={'confirm_password'} 
                icon={'lock'} 
                placeholder={'confirm_password'}/>

            <FormButton 
                action={() =>{setStep(step + 1)}}
                name={'continue'}
                type={"button"} 
                isStepButton={true}/>

            <div 
                className='p-2 w-[345px] flex justify-center items-center'>

              <span 
                className="capitalize py-1 px-4 hover:text-primary-dark hover:bg-primary-dark/10 rounded-full transition-all cursor-pointer"
                onClick={()=>{router.push('/register')}}>
              {t('already_user')}
              </span>
              
            </div>
        </form>,

        <form onSubmit={handleSubmit(onSubmitStep0)} className={"flex flex-col"} id="step0" key="0">   
            
            <ValidationInput valueSetter={setValue}></ValidationInput>

            <FormButton 
                action={() =>{setStep(step + 1)}}
                name={'continue'}
                type={"button"} 
                isStepButton={true}/>

            <div 
                className='p-2 w-[345px] flex justify-center items-center'>

              <span 
                className="capitalize py-1 px-4 hover:text-primary-dark hover:bg-primary-dark/10 rounded-full transition-all cursor-pointer"
                onClick={()=>{}}>
              {t('resend_code')}
              </span>
              
            </div>
        </form>,

        <form onSubmit={handleSubmit(onSubmitStep0)} className={"flex flex-col"} id="step0" key="0">  
            <FormInputField 
                controller={register}
                require={errors}
                name={'email_pro'} 
                icon={'email'} 
                placeholder={'email_pro'}/>

            <FormSelect 
                controller={register}
                values={compagnieTypes}
                require={errors}
                name={'status'}
                icon={'business_center'}
                placeholder={'brand_status'} 
                setValue={setValue}
                trigger={trigger}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'brand_name'} 
                icon={'business'} 
                placeholder={'brand_name'}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'siret'} 
                icon={'alternate_email'} 
                placeholder={'siret_siren'}/>

            <FormMultiSelect 
                controller={register}
                unregister={unregister}
                values={compagnieTypes}
                name={'activities'}
                placeholder={'activities'} 
                setValue={setValue}
                trigger={trigger}/>

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