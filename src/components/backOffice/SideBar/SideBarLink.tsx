import { useRouter } from "next/router"
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

interface linkProps {
    path: string
    label: string
    icon: string
    notification?: boolean
    notificationCount?: number
}

export default function SideBarLink(props: linkProps) {
    const {t} = useTranslation('common')
    const {path, label, icon, notification, notificationCount} = props
    const router = useRouter()
    return (
            <Link href={path}>
            <div 
                className={`
                ${router.pathname == (path) ? "bg-white shadow-[0px_0px_12px_0px_rgba(0,0,0,0.07)] dark:bg-darkest dark:shadow-[0px_0px_12px_0px_rgba(50,205,50,0.07)] font-bold" : "font-medium bg-transparent"} 
                p-3 my-2 
                flex items-center justify-between
                rounded-[10px] 
                hover:bg-white hover:shadow-[0px_0px_12px_0px_rgba(0,0,0,0.07)]  hover:dark:bg-darkest hover:dark:shadow-[0px_0px_12px_0px_rgba(50,205,50,0.07)] 
                transition`}>
                    <div className="flex">
                        <i className={`material-icons-outlined ${router.pathname == (path) ? "text-primary" : "text-dark-grey dark:text-gray-400"}`}>
                            {icon}
                        </i>
                        <span className={`
                                ml-4 
                                capitalize 
                                ${router.pathname == (path) ? "text-black dark:text-white" : "text-dark-grey dark:text-gray-400"}`}>
                                {t(label)}
                        </span>
                    </div>

                    {
                        notification && notificationCount! > 0 ?
                        <div className="flex rounded-full px-[6px] py-[2px] bg-primary text-white">
                            <span className="text-[10px]">
                                {
                                    notificationCount! > 99 ?
                                    "99 +" : notificationCount
                                }
                            </span>
                        </div>
                        : ""
                    }
            </div>
            </Link>
    )
}