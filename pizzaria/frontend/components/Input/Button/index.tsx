import { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './styles.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode
}

import React from 'react'

export default function Button({ loading, children, ...rest }: ButtonProps) {
    return (
        <button {...rest} className={styles.button}>
            <a>
                {children}
            </a>
        </button>
    )
}
