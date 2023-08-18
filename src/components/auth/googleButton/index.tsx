/* eslint-disable @next/next/no-img-element */
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { useGoogleLogin } from '@react-oauth/google';

export default function ConnectWithGoogle(props: any) {
  const { t } = useTranslation('common');

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse)
    },
  });


  return (
    <button
          onClick={()=> {login()}}
          className="flex p-3 items-center border-2 border-primary-dark/20 rounded-xl my-2 w-[345px] shadow-lg dark:shadow-black/70">
          <img
            className="pr-4"
            src="/google_logo.svg"
            alt="google"
          />
          {t('continue_with_google')}
      </button>
  );
}
