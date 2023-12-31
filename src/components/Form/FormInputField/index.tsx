import useTranslation from "next-translate/useTranslation";
import ErrorForm from "../ErrorForm";

interface FieldProps {
    id?: string,
    icon:   string;
    placeholder:   any;
    type?:   string;
    controller:  any;
    name: string;
    onChange?: any
    require?: any
    validityCheck?: boolean
}

export default function FormInputField(props: FieldProps)  {
    const { t } = useTranslation("common");
    const {
        id,
        icon,
        placeholder,
        type,
        controller,
        name,
        onChange,
        require,
        validityCheck,
    } = props;

    const getPattern = (type : string, name : string) => {
        switch(type) {
            case "email" : 
                return {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid_email'
                }
            case "tel" :
                return {
                    value : /^[\+]\d{2,}[0-9]{8,}$/,
                    message: 'invalid_phone'
                }
            case "password" :
                if(validityCheck){
                    return {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z.!@#$%^&*_=+-]{8,}$/,
                        message: "invalid_password",
                      }
                }
            default:
                return undefined
        }
    }
    
    return (
        <>
        <label className="relative block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span 
                    className={`material-icons-outlined text-dark-grey dark:text-gray-400
                    ${(require != undefined) && (require[name] && `text-light-red`)}`}>{icon}</span>
            </span>
                    
            <input
                    {...controller(name, {
                            required:require ? true : false,
                            pattern : getPattern(type! , name)
                        }
                        )}
                    id={id}
                    type={type} 
                    min ="0"
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
                    ${id == "city" ? "capitalize" : ""}
                    ${(require != undefined) && (require[name] && `ring-2 ring-light-red/20 border-light-red/50`)}
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                  dark:focus:ring-primary/50 dark:focus:border-primary/70
                    `}
                    onKeyUp={onChange}
                    />
        </label>
        
        {
            (require != undefined) && (require[name] && <ErrorForm message={`${require[name]?.message}`}/>)
        }
        </>
    )
}