import FormButton from "@/src/components/Form/FormButton"
import FormInputField from "@/src/components/Form/FormInputField"
import FormMultiSelect from "@/src/components/Form/FormMultiSelect"
import FormSelect from "@/src/components/Form/FormSelect"
import AutoCompletePostal from "@/src/components/Form/PostalInput"
import { useDataContext } from "@/src/context/GlobalUserDataContext"
import { useOperationStatus } from "@/src/context/OperationStatus"
import { UserService } from "@/src/services"
import useTranslation from "next-translate/useTranslation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "react-query"

export default function EditCompany(props: any) {
    const {setShowMessage, SetMessage, SetStatus} = useOperationStatus()
    const {t} = useTranslation('common')
    const {data} = useDataContext()
    const activities = data?.activities
    const legal_status = data?.legal_status
    const {userData} = props
    const router = useRouter()
    const [companyData, setCompanyData] = useState<undefined | any>(undefined)

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
      
      useEffect(() => {
        if (userData) {
            const savedActivities: { [key: string]: any } = {}
            
            userData?.activities.map((option: any, idx: number) => {
                savedActivities[`${option.code}`] = option.uuid
            })

            const formattedData = {
                brand_name: userData?.name,
                email_pro: userData?.email_pro || "",
                siret: userData?.siret,
                address: userData?.address?.address_title,
                town: userData?.address?.city,
                zip_code: userData?.address?.zip_code,
                activities: savedActivities, 
            }

            reset(formattedData)
        }
    }, [userData, reset])    
    
      const putCompany = (data: any) => 
      UserService.putBrandData(data).then(async (res: any) => {
          let details = await res.json();
          setCompanyData(res)
          return details
      });

      const { 
      data: companyMutationData, 
      isLoading : companyLoading, 
      isSuccess : companySuccess, 
      mutateAsync : companyMutation 
      } = useMutation(putCompany)

      const onSubmitStep0 = async (bodyData: any) => {
        const PostData = {
            name: bodyData.brand_name,
            legal_status: bodyData.legal_status,
            email_pro: bodyData.email_pro || "",
            siret: bodyData.siret,
            address: {
              address_title: bodyData.address,
              city: bodyData.town,
              zip_code: bodyData.zip_code,
            },
            activities: bodyData.activities,
          }
          
        await companyMutation(PostData)
      };

      useEffect(() => {
        if (companySuccess) {
          SetStatus(companyData.status)
          SetMessage(companyMutationData.detail || companyMutationData.message)
          setShowMessage(true)
          
          if(companyData.status == 200){
            setTimeout(() => {
              router.reload()
            }, 8000);
          }
          }}, [router,SetMessage, SetStatus, companyData, companyMutationData, companySuccess, setShowMessage])

    return(
        <form onSubmit={handleSubmit(onSubmitStep0)} className={"flex flex-col"} id="step0" key="0">   
            <div className="capitalize text-xl font-bold my-4">
                {t('edit_company_infos')}
            </div>            <FormInputField 
                controller={register}
                require={errors}
                name={'email_pro'} 
                icon={'email'} 
                placeholder={'email_pro'}/>

            <FormSelect 
                controller={register}
                values={legal_status}
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
                values={activities}
                name={'activities'}
                placeholder={'activities'} 
                setValue={setValue}
                getValues={getValues}
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
                name={'save'}
                type={"submit"} />
        </form>
    )
}