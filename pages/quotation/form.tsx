"use client"
import { useForm } from 'react-hook-form'
import FormInputField from '@/src/components/Form/FormInputField'
import FormButton from '@/src/components/Form/FormButton';
import { useRouter } from 'next/router';
import AutoCompletePostal from '@/src/components/Form/PostalInput';
import CheckItem from '@/src/components/Form/CheckItem';
import RadioDescribed from '@/src/components/Form/RadioDescribed';
import RangeDatePicker from '@/src/components/Form/RangeDatePicker';
import { useDataContext } from '@/src/context/GlobalUserDataContext';
import { useEffect, useState } from 'react';
import { useOperationStatus } from '@/src/context/OperationStatus';
import { UserService } from '@/src/services';
import { useMutation } from 'react-query';
import style from './index.module.scss'
interface QuotationFormProps {
    step: any,
    setStep: any
}

export default function QuotationForm(props: QuotationFormProps){
    const {step, setStep} = props
    const router = useRouter()
    const {data : GlobalData} = useDataContext()
    const {setShowMessage, SetMessage, SetStatus} = useOperationStatus()
    const activities = GlobalData?.activities
    const locale = router.locale as string
    const [missionInfos, setMissionInfos] = useState<undefined | any>(undefined)

    const { 
        register, 
        handleSubmit, 
        getValues, 
        setValue,
        trigger, 
        control,
        unregister,
        formState: {errors}
      } = useForm({
        defaultValues: {
            start_date: new Date(Date.now() + 24 * 60 * 60 * 1000),
            end_date: new Date(Date.now() + 28 * 60 * 60 * 1000)
        }
      });
      
    const createMission = (data: any) => 
    UserService.postMissionData(data).then(async (res: any) => {
        let details = await res.json();
        setMissionInfos(res)
        return details
    });

    const {
        data: missionData,
        isLoading,
        isSuccess,
        mutateAsync : missionMigration
        } = useMutation(createMission)
        
    const onSubmitInter = async (d:any) => {
        console.log(d)
        setStep(step + 1)
    };

    const onSubmitFinal = async (d:any) => {
        console.log(d)
        await missionMigration(d)
    };
    
    
  useEffect(() => {
    if (isSuccess) {
      SetStatus(missionInfos.status)
      SetMessage(missionData.detail || missionData.message)
      setShowMessage(true)
      
      if (missionInfos.status == 200){
      }
    }
  }, [SetMessage, SetStatus, isSuccess, missionData, missionInfos, setShowMessage])


    const fieldGroups = [
        <form onSubmit={handleSubmit(onSubmitInter)} className={"flex flex-col"} id="step0" key="0">   
            <FormInputField 
                controller={register}
                require={errors}
                name={'email'} 
                icon={'email'} 
                type={'email'}
                placeholder={'email_address'}/>

            <RangeDatePicker control={control}/>

            <AutoCompletePostal 
                controller={register}
                require={errors}
                name={'address.zip_code'}
                id={'zip_code'}
                icon={'my_location'}
                placeholder={'postal_code'} 
                townController={'address.city'} 
                setValue={setValue} 
                trigger={trigger}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'address.city'} 
                id={'city'} 
                icon={'location_city'} 
                placeholder={'town'}/>

            <FormInputField 
                controller={register}
                require={errors}
                name={'address.address_title'} 
                id={'address'} 
                icon={'location_on'} 
                placeholder={'address'}/>

            <FormButton 
                name={'continue'}
                type={"submit"} 
                isStepButton={true}/>
        </form>,

        <form onSubmit={handleSubmit(onSubmitInter)} className={"flex flex-col"} id="step1" key="1">   
            <div className={`
                        text-base z-10 
                        flex flex-wrap 
                        max-w-[580px]
                        `}>
                    {
                        activities?.map((option: any, idx: number) => {
                            return(
                                <CheckItem
                                    controller={register}
                                    name={`activities.${idx}`}  
                                    getValues={getValues}
                                    value={option.uuid}
                                    key={idx} 
                                    text={option?.title_i18n[locale]} 
                                    imgUrl={`/${idx + 1}.svg`}/>
                            )
                        })
                    }
                </div>

            <FormButton 
                name={'continue'}
                type={"submit"} 
                isStepButton={true}/>
        </form>,

        <form onSubmit={handleSubmit(onSubmitFinal)} className={"flex flex-col"} id="step2" key="2">  
            <ul className={`
                        list-none text-base z-10 
                        flex flex-wrap md:flex-col md:flex-nowrap md:items-center
                        `}>
                        <RadioDescribed 
                            title={'urgent_request'}
                            text={'urgent_request_description'} 
                            controller={register} 
                            getValues={getValues} 
                            id={'is_urgent_true'}
                            name={'is_urgent'}
                            value={true} 
                            trigger={trigger}/>
                        <RadioDescribed 
                            title={'simple_request'} 
                            text={'simple_request_description'} 
                            controller={register} 
                            getValues={getValues} 
                            id={'is_urgent_false'}
                            name={'is_urgent'}
                            value={false} 
                            trigger={trigger}/>
                </ul>
            
            <FormButton 
                name={'finish'}
                type={"submit"} />
        </form>,

        <div className={"flex flex-col items-center"} key="3">
            <div className='w-36 aspect-square my-10'>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                <circle className={`${style.path} ${style.circle}`} fill="none" stroke="#32CD32" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                <polyline className={`${style.path} ${style.circle}`} fill="none" stroke="#32CD32" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                </svg>
            </div>

            <FormButton 
                name={'continue'}
                type={"submit"} />

        </div>,
    ]
    
    return(
        <>
            {fieldGroups[step]}
        </>
    )
}