import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useContext, useState } from 'react'
import LogoImg from '../../public/logo.svg'
import Button from '../components/Button'
import Input from '../components/Input'
import { authContext } from '../context/AuthContext'
import styles from '../styles/Home.module.scss'
import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
  const { signIn } = useContext(authContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(event: FormEvent) {
    event.preventDefault()

    const data = {
      email,
      password,
    }

    await signIn(data)
  }

  return (
    <div>
      <Head>
        <title>SujeitoPizzaria - Faça Seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={LogoImg} alt="Logo Sujeito pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <div className={styles.fieldsForm}>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Digite o seu email"
              />
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a sua senha"
                type="password"
              />
            </div>

            <Button isLoginButton={true} type="submit" loading={false}>
              Enviar dados
            </Button>

            <Link className={styles.link} href="/signUp">
              Não tem uma conta? Cadastre-se aqui.
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = canSSRGuest(async (context) => {
  return {
    props: {},
  }
})
