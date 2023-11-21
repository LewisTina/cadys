import useTranslation from 'next-translate/useTranslation';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { Controller } from 'react-hook-form';

export default function RangeDatePicker(props:any){
    const { t } = useTranslation("common");
    const nextDay = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const [startDate, setStartDate] = useState(nextDay);
    const [endDate, setEndDate] = useState(new Date(Date.now() + 28 * 60 * 60 * 1000));
    const {require, control} = props
    
   return ( 
   <>
   <Controller
    control={control}
    name={"start_date"}
    render={({ field }) => (
      <DatePicker
        selected={startDate}
        onChange={(date:Date) => {field.onChange(date), setStartDate(date)}}
        locale="fr-FR"
        showTimeSelect
        timeIntervals={15}
        minDate={nextDay}
        customInput={
        <div  className={`
                    w-[345px]
                    relative
                    flex
                    bg-light-grey/50 dark:bg-black/50
                    border-2 border-dark-grey/20 dark:border-black/20
                    placeholder:text-dark-grey
                    text-base
                    rounded-xl
                    p-3 pl-12  my-2.5
                    ${(require != undefined) && (require["start_date"] && `ring-2 ring-light-red/20 border-light-red/50`)}
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                  dark:focus:ring-primary/50 dark:focus:border-primary/70
                    `}>

            
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span 
                    className={`material-icons-outlined text-dark-grey
                    ${(require != undefined) && (require["start_date"] && `text-light-red`)}`}>{"calendar_month"}</span>
            </span>
            <div className="spanLeft absoluteCenter">
                <span className='font-bold capitalize mr-3'>{t('from')} :</span>
            </div>
            <span className='bodyRegular'>{moment(startDate).format(`DD/MM/YYYY ${t('at')} HH:mm`)}</span>
        </div>
        }
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />)}/>
      <Controller
       control={control}
       name={"end_date"}
       render={({ field }) => (
      <DatePicker
        selected={endDate}
        onChange={(date:Date) => {field.onChange(date), setEndDate(date)}}
        locale="fr-FR"
        showTimeSelect
        timeIntervals={15}
        customInput={
        <div  className={`
                    w-[345px]
                    relative
                    flex
                    bg-light-grey/50 dark:bg-black/50
                    border-2 border-dark-grey/20 dark:border-black/20
                    placeholder:text-dark-grey
                    text-base
                    rounded-xl
                    p-3 pl-12  my-2.5
                    ${(require != undefined) && (require["end_date"] && `ring-2 ring-light-red/20 border-light-red/50`)}
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50
                  dark:focus:ring-primary/50 dark:focus:border-primary/70
                    `} >

            
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <span 
                    className={`material-icons-outlined text-dark-grey
                    ${(require != undefined) && (require["end_date"] && `text-light-red`)}`}>{"calendar_month"}</span>
            </span>
            <div className="spanLeft absoluteCenter">
                <span className='font-bold capitalize mr-3'>{t('to')} :</span>
            </div>
            <span className='bodyRegular'>{moment(endDate).format(`DD/MM/YYYY ${t('at')} HH:mm`)}</span>
        </div>
        }
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />)}/>
    </>
    
    )
    
}
