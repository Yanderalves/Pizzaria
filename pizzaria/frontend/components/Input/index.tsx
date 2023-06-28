import styles from "./style.module.scss"

import { HtmlHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> { }

export default function Input({ ...rest }: InputProps) {
    return (
        <input className={styles.input} {...rest} />
    )
}

export function TextArea({ ...rest }: TextAreaProps) {
    <textarea {...rest} className={styles.input}></textarea>
}