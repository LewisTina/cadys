import Image from "next/image"
import ConnectedUserLayout from "@/src/ConnectedUserLayout";
import { useUserSession } from "@/src/context/UserSession";
import useTranslation from "next-translate/useTranslation";
import ShowActivity from "@/src/components/Form/showActivity";
import { useRouter } from "next/router";
import UserForm from "./forms/userForm";
import EditPassword from "./forms/passwordForm";
import EditCompany from "./forms/companyForm";

export default function User(props: any){
    const { data: userData } = useUserSession();
    const router = useRouter()
    const locale = router.locale as string
    const user = userData?.manager
    const company = userData?.company
    const avatarUrl = user?.avatar_id ? (`/Memoji/Memoji-${user?.avatar_id}.png`) : (user?.sex == 'F' ? `/Memoji/Memoji-11.png` : `/Memoji/Memoji-10.png`)
    const {t} = useTranslation('common')
    const edit = router.query.edit as string
    const Forms: any = {user: <UserForm userData={user}/>, password: <EditPassword/>, company: <EditCompany userData={company}/>}

    const Wrapper = (props: any) => {
        return (
            <div className="my-8 mr-8 w-[345px] flex justify-between bg-white dark:bg-black rounded-[20px] p-4 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]">
                {props.children}
                <span 
                    className={`material-symbols-outlined text-xl flex p-1 pb-2 self-start cursor-pointer rounded-full hover:text-primary text-dark-grey dark:text-gray-400`}
                    onClick={()=>{
                    router.push({
                        pathname: router.pathname,
                        query: { 
                          edit: props.name
                        },
                      });
                    }}
                    >
                    edit_square
                </span>
            </div>
        )
    }

    return(
        <ConnectedUserLayout title="user">
            <div className="flex w-full h-auto">
                <div className="">
                    <Wrapper name="user">
                        <div className="w-full flex items-center cursor-default">
                            <div className="bg-primary/50 h-16 mr-3 aspect-square rounded-full overflow-hidden">
                                <Image 
                                    src={avatarUrl} 
                                    alt={'avatar'} 
                                    width={64} 
                                    height={64}/>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold text-ellipsis inline-block whitespace-nowrap overflow-hidden">{user?.first_name} {user?.last_name}</span>
                                <span className="text-sm text-ellipsis inline-block whitespace-nowrap overflow-hidden">{user?.email}</span>
                            </div>
                        </div>
                    </Wrapper>
                    <Wrapper name="password">
                        <div className="flex items-center p-2">
                            <span className="flex font-bold">{t('password')} :</span> &nbsp; &nbsp;{"*************"}
                        </div>
                    </Wrapper>
                    <Wrapper name="company">
                        <div className="w-full p-2 flex flex-col">
                            <span className="text-xl mb-4 font-bold">
                                {company?.name} | {company?.legal_status?.code}
                            </span>
                            <span className=""> {t('siret_siren')} :</span> <span className="font-bold mb-4">{company?.siret}</span>
                            <span className="mb-4"> {t('activities')} :</span> 
                            <div className="">
                                            
                                {
                                    company?.activities?.map((option: any, idx: number) => {
                                        return(
                                            <span className="w-[110%] py-2 px-4 justify-center rounded-md mb-4 flex bg-primary/10" key={idx}>
                                                {option.title_i18n[locale]}
                                            </span>
                                        )
                                    })
                                }
                           </div>
                            <span className=""> {t('address')} :</span> <span className="font-bold mb-4">{company?.address?.address_title}</span>
                            <span className=""> {t('town')} :</span> <span className="font-bold mb-4 capitalize">{company?.address?.zip_code} - {company?.address?.city}</span>
                            <span className=""> Contact :</span> <span className="font-bold">{company?.email_pro}</span>
                            
                        </div>
                    </Wrapper>
                </div>

                {
                    !!edit &&
                    <div className="w-full h-full mx-4 flex flex-col items-center bg-white dark:bg-black rounded-[20px] px-4 py-10 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)]">
                        {Forms[edit]}
                    </div>
                }


            </div>
        </ConnectedUserLayout>
    )
}