import ConnectedUserLayout from "@/src/ConnectedUserLayout";
import MissionCard from "@/src/components/Missions/card";
import { UserService } from "@/src/services";
import { useRouter } from "next/router";
import Image from "next/image"
import useTranslation from "next-translate/useTranslation";
import { ParseDate } from "@/src/utils/converter";
import ShowActivity from "@/src/components/Form/showActivity";
import { useOperationStatus } from "@/src/context/OperationStatus";
import { useEffect, useState } from "react"
import { useMutation, useQuery } from "react-query"

export default function Propositions(props: any) {
    const {setShowMessage, SetMessage, SetStatus} = useOperationStatus()
    const {t} = useTranslation('common')
    const router = useRouter();
    const locale = router.locale;
    const reference = router.query.reference as string
    const [acceptMissionData, setAcceptMissionData] = useState<undefined | any>(undefined)
    
    const getMission = (data: any) => 
    UserService.getCompanyMissions(data).then(async (res: any) => {
        let data = await res.json();
        return data
    });

    const getMissionById = (data: any) => 
    UserService.getMissionByUuid(data).then(async (res: any) => {
        let data = await res.json();
        return data
    });

    const putMission = (data: any) => 
    UserService.putMissionState(data).then(async (res: any) => {
        let details = await res.json();
        setAcceptMissionData(res)
        return details
    });

     const {
        data: missionsData, 
        isSuccess: missionsSuccess,
     } = useQuery('IN_PROGRESS_MISSIONS', () => getMission({state: 'IN_PROGRESS'}))

     const {
        data: missionData, 
     } = useQuery(reference, () => getMissionById(reference), {enabled: !!reference})

     const { 
     data: missionMutationData, 
     isLoading : missionLoading, 
     isSuccess : missionSuccess, 
     mutateAsync : missionMutation 
     } = useMutation(putMission)

     const finishMission = async () => {
        const PostData = {
            uuid: reference,
            state: 'DONE',
        }
        await missionMutation(PostData)
      };

      const rejectMission = async () => {
         const PostData = {
             uuid: reference,
             accept: 'REJECTED',
         }
         await missionMutation(PostData)
       };

     useEffect(() => {
        let timeoutId: any;
       if (missionSuccess) {
         SetStatus(acceptMissionData.status)
         SetMessage(missionMutationData.detail || missionMutationData.message)
         setShowMessage(true)
         
       if(acceptMissionData.status == 200){
            timeoutId = setTimeout(() => {
           router.replace("/dashboard/missions")
         }, 8000);
       }
       
       }}, [router, SetMessage, SetStatus, acceptMissionData, missionMutationData, missionSuccess, setShowMessage])



    return (
        <ConnectedUserLayout title="propositions">
            <div className="flex items-start h-auto">
                <div className="flex flex-col h-auto">
                {
                    !!missionsData ?

                    missionsData.map((line: any, idx: number) => {
                        return <MissionCard data={line} key={idx} clickable/>
                    }
                    )

                    :

                    ''
                }
                </div>

                {
                    !!reference && !!missionData ? 
                    <div className="border-2 p-4 m-2 w-[450px] flex flex-col items-center bg-white dark:bg-black rounded-xl shadow-sm">
                        <div className="h-16 my-4 aspect-square rounded-full overflow-hidden">
                                <Image 
                                    src={'/logo_cadis.svg'} 
                                    alt={'avatar'} 
                                    width={64} 
                                    height={64}/>
                        </div>
                        
                        <div className="flex flex-col w-full p-2 items-start my-4">
                            <span className="text-2xl font-bold">Mission {t('proposed_by')} Cadys</span>
                            <span>{ParseDate(missionData.intervention_date_start)}</span>
                            <span>{ParseDate(missionData.intervention_date_end)}</span>
                        </div>

                        <div className="flex flex-col w-full p-2 items-start">
                            <span className="">
                                {t('to')}
                            </span>
                            <span>
                                {missionData.intervention_address.address_title}
                            </span>

                            <span className="">
                                {missionData.intervention_address.zip_code} - {missionData.intervention_address.city}
                            </span>
                        </div>

                        <div className="flex flex-wrap items-start w-full my-4">
                            {
                            missionData.activities?.map((option: any, idx: number) => {
                                return(
                                    <ShowActivity 
                                        key={idx} 
                                        text={option.title_i18n[locale!]} 
                                        imgUrl={`/${option.code.slice(13)}.svg`}/>
                                )
                            })
                            }
                        </div>

                        <div className="flex items-start w-full">
                            <span className="text-bold italic">
                                {missionData.remark}
                            </span>
                        </div>

                        <div className="flex justify-between w-full">
                            <button 
                                onClick={() => {rejectMission()}}
                                className="bg-light-red text-white py-3 px-6 w-1/2 m-2 rounded-md capitalize flex justify-between font-bold">
                                {t('reject')}

                                <span className={`material-symbols-outlined flex `}>
                                    {"close"}
                                </span>

                            </button>
                            <button 
                                onClick={() => {finishMission()}}
                                className="bg-primary text-white py-3 px-6 w-1/2 m-2 rounded-md capitalize flex justify-between font-bold">
                                {t('finish')}

                                <span className={`material-symbols-outlined flex `}>
                                    {"check"}
                                </span>

                            </button>
                        </div>
                        
                    </div>
                    : 
                    ''
                }


            </div>
        </ConnectedUserLayout>
    )
}