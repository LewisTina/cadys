/* eslint-disable react-hooks/exhaustive-deps */
import { getElementByCode } from "@/src/utils/helper";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface MultiSelectProps {
    id?: string,
    values: any
    placeholder:   any;
    controller:  any;
    name: string;
    setValue: any
    trigger: any
    require?: any
    unregister: any
    getValues: any
}

export default function FormMultiSelect(props: MultiSelectProps)  {
    const { t } = useTranslation("common");
    const [isOpen, setIsOpen] = useState(false)
    const [finalList, setFinalList] = useState<any[]>([]);
    const router = useRouter();
    const locale = router.locale;
    const {
        id,
        values,
        placeholder,
        controller,
        name,
        setValue,
        trigger,
        require,
        unregister,
        getValues,
    } = props;

    useEffect(()=>{
      const list: any = []
        values?.map((el: any ) => {
          list.push({label: `${el.title_i18n[locale!]}`, value: el.uuid, code: el.code, selected: false})
        })

      setFinalList(list)
    }, [locale, values])

    const valueSetter = (e: any, idx: number) => {
      const updatedList = [...finalList];
      updatedList[idx] = { ...updatedList[idx], selected: true };
      setFinalList(updatedList);
      setValue(`${name}.${e.code}`, e.value)
        
      trigger([name])
    }

    const formData = getValues(name)

    useEffect(() => {
      if(formData){
        const updatedList = [...finalList];
        Object.keys(formData).map((key:string) => {
          const id = getElementByCode(finalList, key)
          updatedList[id!] = { ...updatedList[id!], selected: true };
            trigger([name])
        })
        setFinalList(updatedList);
      }
    }, [formData])


    const removeItem = (code: string, idx: number) => {
      const updatedList = [...finalList];
      updatedList[idx] = { ...updatedList[idx], selected: false };
      setFinalList(updatedList);
      unregister(`${name}.${code}`)
        
      trigger([name])
    };


    useEffect(()=> {
        if(isOpen == true){
            var elem = document.getElementById("customMultiSelect");
            if(typeof elem !== 'undefined' && elem !== null) {
              window.addEventListener('click', function(e){   
                if (!(elem!.contains(e.target as HTMLElement))){
                    setIsOpen(false)
                } 
              });
            }}
    })
    
    return (
      <>
        <label 
            id="customMultiSelect"
            className={`
            relative
            w-full
            block
            bg-light-grey/50 dark:bg-black/50
            border-2 border-dark-grey/20 dark:border-black/20
            text-base
            rounded-xl
            p-3 pr-12  my-2.5
            cursor-pointer
            outline-none
            ${(require != undefined) && (require[name] && `ring-2 ring-light-red/20 border-light-red/50`)}
            ${isOpen ? "outline-none ring-2 ring-primary/20 border-primary/50 dark:ring-primary/50 dark:border-primary/70" : ""}
            
            `}
            onClick={()=>{setIsOpen(!isOpen)}}>
                    
            <span
                    id={id}
                    className="
                    text-dark-grey dark:text-gray-400
                    bg-transparent
                    pointer-events-none"
                    placeholder={`${t(placeholder)} ${require ? "*" : ""}`}
                    >
                      {t(placeholder)} {require ? "*" : ""}
            </span>

                
            <span className="absolute top-0 right-0 flex items-center pr-3 pt-3 cursor-pointer">
                <span 
                    className={`material-icons-outlined text-dark-grey`}>{"keyboard_arrow_down"}</span>
            </span>
            

            {
              isOpen &&
              <div className="absolute left-0 bottom-16 shadow-lg w-full bg-white dark:bg-darkest rounded-xl max-h-96 overflow-auto divide-y">
                {
                    finalList.map((el: any, idx: number) => {
                    return (
                        <div 
                            key={idx} 
                            className={`p-3 ${el.selected ? "bg-dark-grey/20 cursor-not-allowed" : "hover:bg-primary/50 cursor-pointer"}`} 
                            onClick={() => {if(!el.selected) {valueSetter(el, idx)}}}>
                            {el.label}
                        </div>)
                })
                }
              </div>
            }
        </label>
        <div className="flex flex-wrap w-[345px] ">
        {
                finalList.map((el: any, idx: number) => {
                  if(el.selected) {
                  return(
                    <SelectedChips key={idx} text={el.label} action={() => {removeItem(el.code, idx)}}/>
                  )
                  }
            })
        }
        </div>
    </>
    )
}

const SelectedChips = (props: any) =>{
  const {text, action} = props
  return (
    <div className="mr-2 mb-2 pl-2 flex justify-between items-center bg-primary/25 border-2 border-primary rounded-md overflow-hidden">
      <span className=" text-xs text-ellipsis inline-block whitespace-nowrap overflow-hidden">
        {text}
      </span>

      <span 
        className={`material-icons-outlined cursor-pointer text-sm px-1 ml-2 hover:bg-white`}
        onClick={action}
        >
        {"close"}
      </span>
                
    </div>
    
  )
}