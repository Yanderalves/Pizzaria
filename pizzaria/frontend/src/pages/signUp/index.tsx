import Head from "next/head";
import Image from "next/image"
import LogoImg from "../../../public/logo.svg"
import styles from "../../styles/Home.module.scss"
import Input from "../../components/Input";
import Button from "../../components/Button";
import Link from "next/link";
import { FormEvent, useState, useContext } from "react";
import { authContext } from "../../context/AuthContext";



export default function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signUp } = useContext(authContext);


    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        await signUp({ name, email, password });

    }

    return (
        <div>
            <Head>
                <title>SujeitoPizzaria - Registre - se</title>
            </Head>
            <div className={styles.containerCenter}>
                <Image src={LogoImg} alt="Logo Sujeito pizzaria" />

                <div className={styles.login}>
                    <form onSubmit={handleSignUp}>
                        <div className={styles.fieldsForm}>
                            <Input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Digite seu Nome" />
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite a seu email" type="email" />
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite a sua senha" type="password" />
                        </div>
                        <Button isLoginButton={true} type="submit" loading={false}>
                            Enviar dados
                        </Button>
                        <Link className={styles.link} href="/">Já possui uma conta? Clique aqui.</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}


