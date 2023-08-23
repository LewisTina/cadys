import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import style from './index.module.scss'

export default function ErrorForm(props: any){
  const {message} = props
    const { t } = useTranslation("common");
    return (
        <div className={`flex bg-light-red/25 text-light-red text-sm ${style.error}`}>
          <i className= {`material-icons`} style={{marginRight: "0.5em"}}>warning</i>
          <span>
          {
            message != undefined && message != "" ?
            t(message) :
            t("field_required")
          }
        </span>
        </div>
    )
}