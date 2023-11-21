"use client"

import { useForm } from 'react-hook-form'
import FormInputField from '@/src/components/Form/FormInputField'
import FormButton from '@/src/components/Form/FormButton';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { UserService } from '@/src/services';
import { useMutation } from 'react-query';
import { useEffect, useState } from 'react';
import { useOperationStatus } from '@/src/context/OperationStatus';
import Cookies from 'js-cookie';

export default function LoginForm(props: any){
    const {t} = useTranslation('common')
    const {setShowMessage, SetMessage, SetStatus} = useOperationStatus()
    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: {errors}
      } = useForm({});

  const [authData, setAuthData] = useState<undefined | any>(undefined)
  const [showActive, setShowActive] = useState(false)
  const [encodeData, setEncodeData] = useState<undefined | any>(undefined)
  const router = useRouter()
  const previousRouter = router.query.redirect as string

  const createPost = (data: any) => 

  UserService.postLoginData(data).then(async (res: any) => {
    let details = await res.json();
    setAuthData(res)
    return details
  });

  const {
    data,
    isLoading,
    isSuccess,
    mutateAsync
    } = useMutation(createPost)

  async function login(bodyData: any) {
    setEncodeData({email: bodyData.login})
    await mutateAsync(bodyData)
  }

  useEffect(() => {
      const userToken = Cookies.get("userToken");
      if (userToken != undefined) {
        router.replace("/dashboard")
      }
    }
  )

  useEffect(() => {
    
    if (isSuccess) {
      SetStatus(authData.status)
      SetMessage(data.detail || data.message)
      setShowMessage(true)

        if (authData.status == 200) {
          Cookies.set('userToken', data.token.access_token);
          setTimeout(() => {
            if(!!previousRouter){
              router.replace(previousRouter)
            }

            else{
              router.replace("/dashboard")
            }
          }, 1000)
        }

        if (data.detail == "please_active_your_account") {
          Cookies.set('activateEmail', getValues("login"))
          setShowActive(true)
          setEncodeData((prevState: any) => ({
            ...prevState,
            step: 1
          }))
        }

        else{
          setShowActive(false)
          Cookies.remove('activateEmail')
        }
    }

    }, [SetMessage, SetStatus, authData, data, getValues, isSuccess, router, setShowMessage, t, previousRouter])

    return(
        <form onSubmit={handleSubmit(login)} className={"flex flex-col"} id="step0" key="0">   
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