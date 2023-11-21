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
    
    const getMission = () => 
    UserService.getCompanyMissions().then(async (res: any) => {
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
     } = useQuery('History', () => getMission())

     const { 
     data: missionMutationData, 
     isLoading : missionLoading, 
     isSuccess : missionSuccess, 
     mutateAsync : missionMutation 
     } = useMutation(putMission)

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
            <div className="flex items-start w-full h-auto">
                <div className="flex flex-col w-full h-auto">
                {
                    !!missionsData ?

                    missionsData.map((line: any, idx: number) => {
                        return <MissionCard data={line} key={idx}/>
                    }
                    )

                    :

                    ''
                }
                </div>
            


            </div>
        </ConnectedUserLayout>
    )
}