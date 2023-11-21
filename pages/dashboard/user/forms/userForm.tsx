import FormButton from "@/src/components/Form/FormButton"
import FormInputField from "@/src/components/Form/FormInputField"
import { useDataContext } from "@/src/context/GlobalUserDataContext"
import { useOperationStatus } from "@/src/context/OperationStatus"
import { UserService } from "@/src/services"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"

export default function EditUser(props: any) {
    const {setShowMessage, SetMessage, SetStatus} = useOperationStatus()
    const {t} = useTranslation('common')
    const {userData} = props
    const router = useRouter()
    const [managerData, setManagerData] = useState<undefined | any>(undefined)

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: {errors}
      } = useForm({});  
      
      useEffect(() => {
        if (userData) {
            reset(userData)
        }
    }, [userData, reset])
    
      const putManager = (data: any) => 
      UserService.putManagerData(data).then(async (res: any) => {
          let details = await res.json();
          setManagerData(res)
          return details
      });

      const { 
      data: managerMutationData, 
      isLoading : managerLoading, 
      isSuccess : managerSuccess, 
      mutateAsync : managerMutation 
      } = useMutation(putManager)

      const onSubmitStep0 = async (bodyData: any) => {
        const PostData = {
          first_name: bodyData.first_name,
          last_name: bodyData.last_name,
          phone: bodyData.phone,
        }
        await managerMutation(PostData)
      };

      useEffect(() => {
        if (managerSuccess) {
          SetStatus(managerData.status)
          SetMessage(managerMutationData.detail || managerMutationData.message)
          setShowMessage(true)
          
        if(managerData.status == 200){
          setTimeout(() => {
            router.reload()
          }, 8000);
        }
        }}, [router, SetMessage, SetStatus, managerData, managerMutationData, managerSuccess, setShowMessage])

    return(
        <form onSubmit={handleSubmit(onSubmitStep0)} className={"flex flex-col"} id="step0" key="0">   
            <div className="capitalize text-xl font-bold my-4">
                {t('edit_user_infos')}
            </div>

            <FormInputField 
                controller={register}
                name={'phone'} 
                icon={'phone'} 
                placeholder={'phone'}/>

            <FormInputField 
                controller={register}
                name={'first_name'} 
                icon={'badge'} 
                placeholder={'first_name'}/>

            <FormInputField 
                controller={register}
                name={'last_name'} 
                icon={'badge'} 
                placeholder={'last_name'}/>

            <FormButton 
                name={'save'}
                type={"submit"} />
        </form>
    )
}