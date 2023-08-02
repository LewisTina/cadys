import useTranslation from "next-translate/useTranslation"

export default function FormDivider(){
    const {t} = useTranslation('common')
    return(
        <div className="flex items-center justify-center my-4 w-[345px]">
            <div className="bg-dark-grey h-[1px] w-full"></div>
            <span className="font-bold mx-4 uppercase">
                {t("or")}
            </span>
            <div className="bg-dark-grey h-[1px] w-full"></div>
        </div>
    )
}