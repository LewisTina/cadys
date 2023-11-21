import React, { useEffect, useState } from 'react';
import style from './index.module.scss'

export interface validationInput {
    valueSetter:  any;
}

export default function ValidationInput(props:validationInput){
    const [code, setCode] = useState('');
    const { valueSetter } = props;
    
    useEffect(() => {
        const inputElements = Array.from(document.querySelectorAll<HTMLInputElement>('input.code-input'));

        const updateCode = () => {
            const newCode = inputElements.map((input: any) => input.value).join('');
            setCode(newCode);
        };

        inputElements.forEach((ele,index)=>{
        ele.addEventListener('keydown',(e:any)=>{
            if(e.keyCode === 8 && e.target.value==='') inputElements[Math.max(0,index-1)].focus()
        })
        ele.addEventListener('input',(e:any)=>{
            const [first,...rest] = e.target.value
            e.target.value = first ?? ''
            const lastInputBox = index===inputElements.length-1
            const didInsertContent = first!==undefined
            if(didInsertContent && !lastInputBox) {
            inputElements[index+1].focus()
            inputElements[index+1].value = rest.join('')
            inputElements[index+1].dispatchEvent(new Event('input'))
            }

            updateCode()
        })
    })

    })

    valueSetter("code", code)

    return(
        <div className={`${style.validationCode} max-w-[345px]`}>
        <input name='code' className={`${style.codeInput} code-input`} required type="number"/>
        <input name='code' className={`${style.codeInput} code-input`} required type="number"/>
        <input name='code' className={`${style.codeInput} code-input`} required type="number"/>
        <input name='code' className={`${style.codeInput} code-input`} required type="number"/>
        <input name='code' className={`${style.codeInput} code-input`} required type="number"/>
        <input name='code' className={`${style.codeInput} code-input`} required type="number"/>
        </div>
    )
}