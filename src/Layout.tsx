
import { Roboto } from 'next/font/google'
import { useEffect } from 'react';
import { UserService } from './services';
import useTranslation from 'next-translate/useTranslation';
import { useDataContext } from './context/GlobalUserDataContext';
import { useQuery } from 'react-query';
import Head from 'next/head'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

interface LayoutProps {
    title?: string,
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    const {title, children} = props
    const {t} = useTranslation("common")

    const getGlobal = () => 
    UserService.getDefaultData().then(async (res: any) => {
        let data = await res.json();
        return data
    });
    
    const { 
      data: globalData, 
    } = useQuery<any>('globalData', getGlobal)
    
    const { setData: setGlobalUserData } = useDataContext();

    useEffect(() => {
      setGlobalUserData(globalData)
    })

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

export default Layout
