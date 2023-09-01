import { ParseDate } from "@/src/utils/converter"
import StateChips from "../stateChips"
import { useRouter } from "next/router";
import { AnyCnameRecord } from "dns";

interface Mission {
    data: any
    clickable?: boolean
}

export default function MissionCard(props: Mission) {
    const {data, clickable} = props
    const router = useRouter();
    const locale = router.locale;
    const reference = router.query.reference as string
    const {
        uuid,
        intervention_date_start,
        intervention_date_end,
        state,
        activities,
        intervention_address
      } = data

      const Puce = (props: any) => {
        const {icon, text} = props
        
        return (
            <div className="flex items-end mr-4">
                <span className={`material-symbols-outlined text-gray-400 text-xl flex `}>
                    {icon}
                </span>

                <span className="flex ml-2 font-medium">
                    {text}
                </span>
            </div>
        )
      }

      const SelectedChips = (props: any) =>{
        const {text} = props
        return (
          <div className="mr-2 px-2 py-1 flex justify-between items-center bg-gray-400/20 border-2 border-gray-400/50 rounded-md overflow-hidden">
            <span className=" text-sm font-medium text-ellipsis text-black inline-block whitespace-nowrap overflow-hidden">
              {text}
            </span>
                      
          </div>
          
        )
      }

    
    return (
        <div 
            className={`
            ${reference == uuid ? 'ring-2 ring-primary/20 border-primary/50' : ''}
            ${clickable ? 'cursor-pointer' : ''}
            border-2 p-4 m-2 rounded-xl divide-y-2 shadow-sm w-full
            `}
            onClick={()=>{
                clickable && 
                router.push({
                    pathname: router.pathname,
                    query: { 
                      reference: uuid
                    },
                  });
                }}>
            <div className="flex flex-col">
                <div className="flex">
                    <div className="">
                        <span className="">

                        </span>
                    </div>
                    <StateChips state={state}/>
                </div>

                <div className="flex my-4">
                    <Puce icon={"location_city"} text={`${intervention_address.zip_code} - ${intervention_address.city}`}/>
                    <Puce icon={"location_on"} text={`${intervention_address.address_title}`}/>
                    <Puce icon={"calendar_month"} text={`[ ${ParseDate(intervention_date_start)} - ${ParseDate(intervention_date_end)} ]`}/>
                </div>
            </div>

            <div className="">

                <div className="flex mt-4">
                    {
                    activities?.map((el: any, idx: number) => {
                        return(
                            <SelectedChips key={idx} text={el.title_i18n[locale!]} action={() => {}}/>
                        )
                    })
                    }
                </div>

            </div>

        </div>
    )

}
