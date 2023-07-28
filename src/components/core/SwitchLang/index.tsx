"use client"

import { useRouter } from 'next/navigation';
import style from './index.module.scss'
import setLanguage from 'next-translate/setLanguage'
import useTranslation from 'next-translate/useTranslation';


const LanguageSwitcher = () => {
  const router = useRouter();
  const {t} = useTranslation('common')

  const handleLanguageChange = async (locale: any) => {
    await setLanguage(locale)
    localStorage.setItem("lang", locale);
  };

  return (
    <div 
      className={`${style.lang}`}
      /* onClick={() => {handleLanguageChange(router.locale == 'fr' ? 'en' : 'fr')}} */
      >
        <code className='bodyRegular'>
          {t("change_language")}
        </code>

        <code className="bodyBlack">
          {/* {router.locale == 'fr' ? 'en' : 'fr'}  */}
        </code>
    </div>
  );
};

export default LanguageSwitcher;