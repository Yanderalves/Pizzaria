import Head from "next/head"
import styles from "../styles/Home.module.scss"
import Image from "next/image"
import logoImg from "../public/logo.svg"
import Input from "../components/Input"
import Button from "../components/Input/Button"

export default function Home() {
  return (
    <>
      <Head>
        <title>SujeitoPizzaria - Faça Seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito pizzaria" />
      </div>

      <div className={styles.login}>
        <form>
          <div className="fields-form">
            <Input type="text" placeholder="Digite o seu email" />
            <Input placeholder="Digite a sua senha" type="password" />
          </div>
          <Button > 
            Oiiiiiiiic
          </Button>
        </form>
      </div>
    </>
  )
}
