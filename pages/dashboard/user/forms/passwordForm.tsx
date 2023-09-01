import FormButton from "@/src/components/Form/FormButton"
import FormInputField from "@/src/components/Form/FormInputField"
import { useOperationStatus } from "@/src/context/OperationStatus"
import { UserService } from "@/src/services"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"

export default function EditPassword(props: any) {
    const {setShowMessage, SetMessage, SetStatus} = useOperationStatus()
    const {t} = useTranslation('common')
    const [isMatch, setIsMatch] = useState(true)
    const router = useRouter()
    const [PasswordData, setPasswordData] = useState<undefined | any>(undefined)

    const { 
        register, 
        handleSubmit, 
        getValues, 
        formState: {errors}
      } = useForm({});    
    
      const putPassword = (data: any) => 
      UserService.putPasswordData(data).then(async (res: any) => {
          let details = await res.json();
          setPasswordData(res)
          return details
      });

      const { 
      data: PasswordMutationData, 
      isLoading : PasswordLoading, 
      isSuccess : PasswordSuccess, 
      mutateAsync : PasswordMutation 
      } = useMutation(putPassword)

      const onSubmitStep0 = async (bodyData: any) => {
        const PostData = {
          new_password: bodyData.new_password,
          old_password: bodyData.old_password,
        }
        await PasswordMutation(PostData)
      };

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

      useEffect(() => {
        if (PasswordSuccess) {
          SetStatus(PasswordData.status)
          SetMessage(PasswordMutationData.detail || PasswordMutationData.message)
          setShowMessage(true)

          if(PasswordData.status == 200){
            setTimeout(() => {
              router.reload()
            }, 8000);
          }
          }}, [router, SetMessage, SetStatus, PasswordData, PasswordMutationData, PasswordSuccess, setShowMessage])

    return(
        <form onSubmit={handleSubmit(onSubmitStep0)} className={"flex flex-col"} id="step0" key="0">   
            <div className="capitalize text-xl font-bold my-4">
                {t('user_password')}
            </div>

            <FormInputField 
                controller={register}
                require={errors}
                type='password'
                name={'old_password'} 
                icon={'lock'} 
                onChange={()=>{handleMatchPassword()}} 
                placeholder={'old_password'}/>

            <FormInputField 
                controller={register}
                require={errors}
                type='password'
                name={'new_password'} 
                icon={'lock'} 
                validityCheck={true}
                onChange={()=>{handleMatchPassword()}} 
                placeholder={'new_password'}/>

            <FormButton 
                name={'save'}
                type={"submit"} 
                disable={!isMatch}/>
        </form>
    )
}