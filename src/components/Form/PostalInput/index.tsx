import useTranslation from "next-translate/useTranslation";
import data from '../../../../laposte_hexasmal.json'
import { useEffect, useState } from "react";
const postal_code : any = data

interface postalSet{
    name: string
    townController: string
    placeholder: string
    controller: any
    require?: any
    id?: any
    setValue: any
    icon:   string;
    trigger: any
}

export default function AutoCompletePostal(props: postalSet) {

    const {
        name,
        placeholder,
        controller,
        require,
        townController,
        setValue,
        icon,
        trigger,
        id
    } = props

    const {t} = useTranslation('common')
    const [inputText, setInputText] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    
    let inputHandler =  (e: { target: { value: string; }; }) => {
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);

        if (e.target.value != "") {
            setIsOpen(true)
        }
        else{
            setIsOpen(false)
        }
      };
    
    const valueSetter = (e: any) => {
        const zipCode = e.fields.code_postal
        const townName = (e.fields.libelle_d_acheminement).toLowerCase()
        setValue(name, zipCode)
        setValue(townController, townName)
        trigger([name, townController])
        setIsOpen(false)
    }

    useEffect(()=> {
        if(isOpen == true){
            var elem = document.getElementById("postalInput");
            if(typeof elem !== 'undefined' && elem !== null) {
              window.addEventListener('click', function(e){   
                if (!(elem!.contains(e.target as HTMLElement))){
                    setIsOpen(false)
                } 
              });
            }}
    })

    const filteredData = postal_code.filter((el: any) => {
        if (inputText === "") {
            return null;
        }
        else {
            return el.fields.code_postal.startsWith(inputText);
        }
    }).sort((a: any, b: any) => { return a.fields.code_postal.localeCompare(b.fields.code_postal);}).slice(0, 20)
    
    return (
        <label
            id="postalInput"
            className={`relative block w-[345px] ${isOpen ? " z-10" : ""}`}>
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span 
                    className={`material-icons-outlined text-dark-grey dark:text-gray-400
                    ${(require != undefined) && (require[name] && `text-light-red`)}`}>{icon}</span>
            </span>
                    
            <input
                    {...controller(name, {
                            required:require ? true : false,
                            pattern : {
                                value : /^\s*?\d{5}(?:[-\s]\d{4})?\s*?$/,
                            }
                        }
                        )}
                    type={"number"} 
                    min ="0"
                    id={id}
                    autoComplete= "off"
                    placeholder={`${t(placeholder)} ${require ? "*" : ""}`}
                    className={`
                    w-[345px]
                    block
                    bg-light-grey/50 dark:bg-black/50
                    border-2 border-dark-grey/20 dark:border-black/20
                    placeholder:text-dark-grey dark:placeholder:text-gray-400
                    text-base
                    rounded-xl
                    p-3 pl-12  my-2.5
                    ${(require != undefined) && (require[name] && `ring-2 ring-light-red/20 border-light-red/50`)}
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                  dark:focus:ring-primary/50 dark:focus:border-primary/70
                    `}
                    onKeyUp={inputHandler}
                    />
            {
              isOpen &&
              <div className="absolute shadow-lg bg-white dark:bg-darkest rounded-xl max-h-80 overflow-auto divide-y  w-[345px]">
                {
                    filteredData.map((el: any, idx: number) => {
                    return (
                        <div 
                            key={idx} 
                            className={`p-3 hover:bg-primary/50`} 
                            onClick={() => {valueSetter(el)}}>
                            {el.fields.code_postal} - {el.fields.libelle_d_acheminement.toLowerCase()}
                        </div>)
                })
                }
              </div>
            }
        </label>
    )
}