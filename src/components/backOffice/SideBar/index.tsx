import Image from "next/image"
import style from './index.module.scss'
import { useUserSession } from "@/src/context/UserSession";
import SideBarLink from "./SideBarLink";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Link from "next/link";
import SwitchTheme from "../../core/SwitchTheme";

export default function SideBar (props: any) {
    const { data: userData } = useUserSession();
    const {t} = useTranslation('common')
    const router = useRouter()
    const user = userData?.manager
    const avatarUrl = user?.avatar_id ? (`/Memoji/Memoji-${user?.avatar_id}.png`) : (user?.sex == 'F' ? `/Memoji/Memoji-11.png` : `/Memoji/Memoji-10.png`)

    return (
       <div className={`${style.sideBar} relative h-screen w-[345px]`}>
            <div 
                className={`
                relative
                w-full h-full
                p-8
                flex flex-col justify-between
                overflow-auto
                bg-light-grey/50 dark:bg-black/70 backdrop-blur-[120px]
                text-dark-grey dark:text-gray-400
                `}>

                    <div className="">
                        <div className="flex justify-between items-center">
                            <Image 
                                src={'/cadys_logo_extended.svg'} 
                                alt={'cadis extended logo'}
                                width={121}
                                height={58}/>

                                <div className="flex">
                                    <SwitchTheme></SwitchTheme>
                                </div>
                        </div>
                        

                        <div className="my-10">
                            <SideBarLink path={"/dashboard"} label={"home"} icon={"home"}/>
                        </div>

                        <div className="my-10">
                            <span className="capitalize mx-3">
                                {t('main')}
                            </span>
                            <SideBarLink path={"/dashboard/propositions"} label={"proposition"} icon={"flash_on"} notification notificationCount={10}/>
                            <SideBarLink path={"/dashboard/missions"} label={"mission_in_progress"} icon={"business_center"}/>
                            <SideBarLink path={"/dashboard/disponibility"} label={"disponibility"} icon={"calendar_month"}/>
                        </div>

                        <div className="my-10">
                            <span className="capitalize mx-3">
                                {t('other')}
                            </span>
                            <SideBarLink path={"/dashboard/history"} label={"history"} icon={"history"}/>
                            <SideBarLink path={"/dashboard/news"} label={"cadys_news"} icon={"notifications"} notification notificationCount={100}/>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="">
                            <SideBarLink path={"/dashboard/settings"} label={"settings"} icon={"settings"}/>
                            <SideBarLink path={"mailto:contact@cadys.fr"} label={"contact_support"} icon={"support_agent"}/>
                        </div>

                        <div className="my-10">
                            <span className="capitalize mx-3">
                                {t('preferences')}
                            </span>
                        </div>

                        <div className="w-full mt-4">
                            <Link href={'/dashboard/user'}>
                                <div className="w-full flex justify-between items-center bg-white dark:bg-darkest rounded-[20px] p-3 shadow-[0px_0px_12px_0px_rgba(0,0,0,0.15)] cursor-pointer">
                                    <div className="w-full flex">
                                        <div className="bg-primary/50 h-11 mr-3 aspect-square rounded-full overflow-hidden">
                                            <Image 
                                                src={avatarUrl} 
                                                alt={'avatar'}
                                                width={44}
                                                height={44}/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-base font-bold text-ellipsis inline-block whitespace-nowrap overflow-hidden">{user?.first_name} {user?.last_name}</span>
                                            <span className="text-xs text-ellipsis inline-block whitespace-nowrap overflow-hidden">{user?.email}</span>
                                        </div>
                                    </div>
                                    <div className="rounded-full aspect-square h-6 bg-light-grey dark:bg-black flex justify-center items-center">
                                        <span 
                                            className={`material-icons-outlined text-sm text-dark-grey dark:text-gray-400`}>arrow_forward_ios</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

            </div>

       </div> 
    )
}