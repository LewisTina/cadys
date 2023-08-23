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
import { UserService } from '@/src/services';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { useOperationStatus } from '@/src/context/OperationStatus';
import Cookies from 'js-cookie';
import { hashString } from '@/src/utils/helper';

interface RegisterFormProps {
    step: any,
    setStep: any
}

export default function RegisterForm(props: RegisterFormProps){
    const {setShowMessage, SetMessage, SetStatus} = useOperationStatus()
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
      
  const [authData, setAuthData] = useState<undefined | any>(undefined)
  const [managerId, setManagerId] = useState<undefined | any>(undefined)
  const [emailForResend, setEmailForResend] = useState<undefined | any>(undefined)
  const [isMatch, setIsMatch] = useState(true)

    
    
    const postManager = (data: any) => 
    UserService.postManagerData(data).then(async (res: any) => {
        let details = await res.json();
        setAuthData(res)
        return details
    });

    const putCode = (data: any) => 
    UserService.putCodeRegister(data).then(async (res: any) => {
        let details = await res.json();
        setAuthData(res)
        return details
    });

    const postBrandInformation = (data: any) => 
    UserService.postBrandData(data).then(async (res: any) => {
        let details = await res.json();
        setAuthData(res)
        return details
    });

    const putResendCode = (data: any) => 
    UserService.putCodeRegisterResend(data).then(async (res: any) => {
        let details = await res.json();
        setAuthData(res)
        return details
    });



    const { 
    data: managerData, 
    isLoading : managerLoading, 
    isSuccess : managerSuccess, 
    mutateAsync : managerMutation 
    } = useMutation(postManager)

    const { 
    data: codeData, 
    isLoading : codeLoading, 
    isSuccess : codeSuccess, 
    mutateAsync : codeMutation 
    } = useMutation(putCode)

    const { 
    data: brandData, 
    isLoading : brandLoading, 
    isSuccess : brandSuccess, 
    mutateAsync : brandMutation 
    } = useMutation(postBrandInformation)

    const { 
    data: resendData, 
    isLoading : resendLoading, 
    mutateAsync : resendMutation 
    } = useMutation(putResendCode)

    
  const onSubmitStep0 = async (bodyData: any) => {
    const PostData = {
      first_name: bodyData.first_name,
      last_name: bodyData.last_name,
      phone: bodyData.phone,
      sex: bodyData.sex || 'F',
      email: bodyData.email,
      password: bodyData.password
    }
    setEmailForResend(bodyData.email)
    await managerMutation(PostData)
  };

  const onSubmitStep1 = async (bodyData: any) => {
    const PostData = {
      code : bodyData.code
    }
    await codeMutation(PostData)
    
  };

  const resend = (email: any) => {
    const resendData = {
      email : email
    }
    resendMutation(resendData)
  }


  const onSubmitStep2 = async (bodyData: any) => {
    const PostData = {
      manager_uuid: "566dad92-1602-4acb-aced-fe421194f85d",
      name: bodyData.brand_name,
      legal_status: "89dd324b-adb0-43ff-97f4-2e77513e912c",
      email_pro: bodyData.email_pro || "",
      siret: bodyData.siret,
      address: {
        address_title: bodyData.address,
        city: bodyData.town,
        zip_code: bodyData.zip_code,
      },
      activities: bodyData.activities,
    }
    await brandMutation(PostData)
    
    console.log(PostData)
    
  };

    const activateAccount =  () => {
        const rst = router.query.rst
        const eMail = Cookies.get('activateEmail')
        const encode = JSON.stringify({email: eMail, step: 1})

        // const encode = hashString(JSON.stringify({email: eMail, step: 1}))
    
        if (rst == encode) {
          resend(eMail)
          setEmailForResend(eMail)
          setStep(1)
          Cookies.remove('activateEmail')
          SetStatus(200)
          SetMessage("an_email_was_send")
          setShowMessage(true)
            setTimeout(() => {
              setShowMessage(false);
            }, 8000);
    
        }
      }
    
      const handleMatchPassword = () => {
          const password = getValues("password")
          const passwordVerification = getValues("confirm_password")
    
          if (password == passwordVerification) {
              setIsMatch(true)
          }
    
          else{
              setIsMatch(false)
          }
      }
    
      activateAccount()
    
      useEffect(() => {
        if (managerSuccess) {
          SetStatus(authData.status)
          SetMessage(managerData.detail || managerData.message)
          setShowMessage(true)
          if (authData.status == 200 ){
            setTimeout(() => {
              setStep(1)
            }, 1000);
          }
        }
    
    
      if (codeSuccess) {
        SetStatus(authData.status)
        setManagerId(codeData.user_uuid)
        SetMessage(codeData.detail || codeData.message)
        setShowMessage(true)
        if (authData.status == 200 ){
          setTimeout(() => {
            setStep(2)
          }, 1000);
        }
      }
    
      if (brandSuccess) {
        SetStatus(authData.status)
        SetMessage(brandData.detail || brandData.message)
        setShowMessage(true)
        if (authData.status == 200 ){
          setTimeout(() => {
            Cookies.set('userToken', brandData.token.access_token)
          }, 1000);
        }
      }
    
    
      if (resendData) {
        console.log(emailForResend, authData)
        setManagerId(resendData.user_uid)
        SetStatus(authData.status)
        SetMessage(resendData.detail || resendData.message)
        setShowMessage(true);
      }
    
      }, 
      [
        SetMessage,
        SetStatus,
        authData,
        brandData,
        codeData,
        codeSuccess,
        emailForResend,
        managerData,
        managerSuccess,
        brandSuccess,
        resendData,
        setShowMessage,
        setStep
      ])


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
                validityCheck={true}
                onChange={()=>{handleMatchPassword()}} 
                placeholder={'password'}/>

            <FormInputField 
                controller={register}
                require={errors}
                type='password'
                name={'confirm_password'} 
                icon={'lock'} 
                validityCheck={true}
                onChange={()=>{handleMatchPassword()}} 
                placeholder={'confirm_password'}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'phone'} 
                icon={'phone'} 
                placeholder={'phone'}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'first_name'} 
                icon={'badge'} 
                placeholder={'first_name'}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'last_name'} 
                icon={'badge'} 
                placeholder={'last_name'}/>

            <FormButton 
                name={'continue'}
                type={"submit"} 
                disable={!isMatch}
                isStepButton={true}/>

            <div 
                className='p-2 w-[345px] flex justify-center items-center'>

              <span 
                className="capitalize py-1 px-4 hover:text-primary-dark hover:bg-primary-dark/10 rounded-full transition-all cursor-pointer"
                onClick={()=>{router.push('/login')}}>
              {t('already_user')}
              </span>
              
            </div>
        </form>,

        <form onSubmit={handleSubmit(onSubmitStep1)} className={"flex flex-col"} id="step0" key="0">   
            
            <ValidationInput valueSetter={setValue}></ValidationInput>

            <FormButton 
                name={'continue'}
                type={"submit"} 
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

        <form onSubmit={handleSubmit(onSubmitStep2)} className={"flex flex-col"} id="step0" key="0">  
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
                name={'legal_status'}
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