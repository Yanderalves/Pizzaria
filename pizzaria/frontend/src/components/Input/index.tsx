import styles from './styles.module.scss'

import {
  ChangeEvent,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useState,
} from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Input({ ...rest }: InputProps) {
  return <input className={styles.input} {...rest} />
}

export function TextArea({ ...rest }: TextAreaProps) {
  return <textarea {...rest} className={styles.input}></textarea>
}

function MonetaryInput() {
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    // Remova os caracteres não numéricos, deixando apenas dígitos e ponto
    const numericValue = inputValue.replace(/[^0-9.]/g, '')
    setValue(numericValue)
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="R$ 0,00"
      className={styles.input}
    />
  )
}

export { MonetaryInput }
