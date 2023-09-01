
import { Roboto } from 'next/font/google'
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from 'js-cookie'
import { UserService } from './services';
import useTranslation from 'next-translate/useTranslation';
import { useDataContext } from './context/GlobalUserDataContext';
import { useQuery } from 'react-query';
import Head from 'next/head'
import { useUserSession } from './context/UserSession';
import SideBar from './components/backOffice/SideBar';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

interface LayoutProps {
    title?: string,
    children: React.ReactNode;
}

const ConnectedUserLayout = (props: LayoutProps) => {
    const {title, children} = props
    const {t} = useTranslation("common")
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authData, setAuthData] = useState<undefined | any>(undefined)

    const getGlobal = () => 
    UserService.getDefaultData().then(async (res: any) => {
        let data = await res.json();
        return data
    });

    const getUser = () =>
    UserService.getUserData().then(async (res: any) => {
      let data = await res.json();
      setAuthData(res)
      return data
  });

    const { 
      data: userSessionData, 
      isSuccess: userSuccess,
    } = useQuery<any>('userSessionData', getUser)

    useEffect(() => {
      if (userSuccess && !!authData) {
        if (authData.status == 401 ){
              Cookies.remove("userToken")
              router.replace ("/login")
            }
      }}, [authData, router, userSuccess])
    
    const { 
      data: globalData, 
    } = useQuery<any>('globalData', getGlobal)
    
    const { setData: setGlobalUserData } = useDataContext();
    const { data: userData, setData: setUserData } = useUserSession();
    const company = userData?.company
    const user = userData?.manager

    useEffect(() => {
      setGlobalUserData(globalData)
      setUserData(userSessionData)
    })

    useEffect(() => {
        const token = Cookies.get('userToken'); 
    
        if (!token) {
          router.replace(`/login?redirect=${router.asPath}`);
        } else {
          setIsAuthenticated(true);
        }
      },[router]);
    
      if (!isAuthenticated) {
        if(router.asPath == "/subscribe"){
          null
        }
        else{
          return null;
        }
    }

  return (
      <main className={`${roboto.className}`}>
          <Head>
              <title>{t(title!)} · Cadys</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width,"/>
          </Head>
          
          <main className="h-screen w-full relative flex">
                <SideBar/>
                <div className="w-full max-w-[calc(100%-345px)] h-full overflow-auto flex flex-col items-center px-10  text-dark-grey dark:text-gray-400">
                  <div className="
                        w-full
                        h-auto
                        max-w-[1535px]
                        flex flex-col">

                          <div className="my-10 flex flex-col">
                            <span className="text-4xl font-bold">
                                {company?.name}
                            </span>
                            <span className="text-base">
                                {user?.first_name} {user?.last_name}
                            </span>
                          </div>
                          

                          <div className="">
                            {children}
                          </div>

                  </div>

                </div>
            </main>
      </main>
);
}

export default ConnectedUserLayout
