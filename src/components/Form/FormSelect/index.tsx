import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface SelectProps {
    id?: string,
    values: any
    icon:   string;
    placeholder:   any;
    controller:  any;
    name: string;
    setValue: any
    trigger: any
    require?: any
}

export default function FormSelect(props: SelectProps)  {
    const { t } = useTranslation("common");
    const [isOpen, setIsOpen] = useState(false)
    const [active, setActive] = useState<string | undefined>(undefined)
    const router = useRouter();
    const locale = router.locale;
    const {
        id,
        icon,
        values,
        placeholder,
        controller,
        name,
        setValue,
        trigger,
        require,
    } = props;7

    const formattedStatus = () => {
        const list: any = []
        values?.map((el: any ) => {
          list.push({label: `${el.code} | ${el.title_i18n[locale!]}`, value: el.uuid})
        })

        return list 
      }

    const finalList = formattedStatus()

    const valueSetter = (e: any) => {
        const uuid = e.value
        setValue(name, uuid)
        setActive(e.label)
        trigger([name])
        setIsOpen(false)
    }

    useEffect(()=> {
        if(isOpen == true){
            var elem = document.getElementById("customSelect");
            if(typeof elem !== 'undefined' && elem !== null) {
              window.addEventListener('click', function(e){   
                if (!(elem!.contains(e.target as HTMLElement))){
                    setIsOpen(false)
                } 
              });
            }}
    })
    
    return (
        <label 
            id="customSelect"
            className={`relative block w-[345px] ${isOpen ? " z-10" : ""}`}
            onClick={()=>{setIsOpen(!isOpen)}}>
            <span className="absolute top-3 left-0 flex items-center pl-3 pt-3">
                <span 
                    className={`material-icons-outlined text-dark-grey
                    ${(require != undefined) && (require[name] && `text-light-red`)}`}>{icon}</span>
            </span>
                    
            <input
                    {...controller(name, {
                            required:require ? true : false,
                        }
                        )}
                    id={id}
                    type={"text"} 
                    min ="0"
                    disabled
                    value={active}
                    placeholder={`${t(placeholder)} ${require ? "*" : ""}`}
                    className={`
                    w-full
                    block
                    bg-light-grey/50 dark:bg-black/50
                    border-2 border-dark-grey/20 dark:border-black/20
                    placeholder:text-dark-grey
                    text-base
                    rounded-xl
                    py-3 px-12  my-2.5
                    cursor-pointer
                    focus:outline-none
                    ${(require != undefined) && (require[name] && `ring-2 ring-light-red/20 border-light-red/50`)}
                    ${isOpen ? "ring-2 ring-primary/20 border-primary/50" : ""}
                  dark:focus:ring-primary/50 dark:focus:border-primary/70
                    `}
                    />

                
            <span className="absolute top-3 right-0 flex items-center pr-3 pt-3 cursor-pointer">
                <span 
                    className={`material-icons-outlined text-dark-grey`}>{"keyboard_arrow_down"}</span>
            </span>

            {
              isOpen &&
              <div className="absolute shadow-lg bg-white dark:bg-darkest rounded-xl max-h-96 overflow-auto divide-y">
                {
                    finalList.map((el: any, idx: number) => {
                    return (
                        <div 
                            key={idx} 
                            className={`p-3 hover:bg-primary/50`} 
                            onClick={() => {valueSetter(el)}}>
                            {el.label}
                        </div>)
                })
                }
              </div>
            }
        </label>
    )
}