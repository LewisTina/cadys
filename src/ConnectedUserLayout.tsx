
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

    const getGlobal = () => 
    UserService.getDefaultData().then(async (res: any) => {
        let data = await res.json();
        return data
    });

    const getUser = () =>
    UserService.getUserData().then(async (res: any) => {
      let data = await res.json();
      return data
  });

    const { 
      data: userSessionData, 
    } = useQuery<any>('userSessionData', getUser)
    
    const { 
      data: globalData, 
    } = useQuery<any>('globalData', getGlobal)
    
    const { setData: setGlobalUserData } = useDataContext();
    const { setData: setUserData } = useUserSession();

    useEffect(() => {
      setGlobalUserData(globalData)
      setUserData(userSessionData)
    })

    useEffect(() => {
        const token = Cookies.get('userToken'); 
    
          //check if the component is protected and if the token not exist
        if (!token) {
          //if true redirect to authentication page
          router.replace(`/login?redirect=${router.asPath}`);
        } else {
          //else open the page
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
                {children}
      </main>
);
}

export default ConnectedUserLayout
