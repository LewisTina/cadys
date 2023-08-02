"use client"

import { useForm } from 'react-hook-form'
import FormInputField from '@/src/components/Form/FormInputField'
import FormButton from '@/src/components/Form/FormButton';
import ValidationInput from '@/src/components/Form/ValidationInput';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

export default function LoginForm(props: any){
    const {t} = useTranslation('common')
    const { 
        register, 
        handleSubmit, 
        getValues, 
        setValue, 
        reset,
        unregister,
        formState: {errors}
      } = useForm({});

    const onSubmitStep0 = async (d:any) => {
        console.log(d)
    };

    const router = useRouter()
    
    return(
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

            <FormButton 
                name={'continue'}
                type={"submit"} 
                isStepButton={true}/>

            <div 
                className='p-2 w-[345px] flex justify-center items-center'>

              <span 
                className="capitalize py-1 px-4 hover:text-primary-dark hover:bg-primary-dark/10 rounded-full transition-all cursor-pointer"
                onClick={()=>{router.push('/register')}}>
              {t('new_user')}
              </span>
              
            </div>
        </form>
    )
}