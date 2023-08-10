/* eslint-disable @next/next/no-img-element */
import React from "react";
import useTranslation from "next-translate/useTranslation";
import { GoogleLogin } from "react-google-login";

export default function ConnectWithGoogle(props: any) {
  const { t } = useTranslation('common');

  const responseGoogle = (response: any) => {
    console.log(response);
  };

  const clientID = process.env.GOOGLE_CLIENT_ID

  return (
    <GoogleLogin
      clientId="878393888095-17e41jvd6k0i8a0nq4jih895otq0meqr.apps.googleusercontent.com"
      buttonText={t('continue_with_google')}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="flex p-3 items-center border-2 border-primary-dark/20 rounded-xl my-2 w-[345px] shadow-lg dark:shadow-black/70">
          <img
            className="pr-4"
            src="/google_logo.svg"
            alt="google"
          />
          {t('continue_with_google')}
        </button>
      )}
    />
  );
}
