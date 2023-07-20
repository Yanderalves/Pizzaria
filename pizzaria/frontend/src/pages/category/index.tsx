import Head from 'next/head'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '../../components/Button'
import { Header } from '../../components/Header'
import { api } from '../../services/apiClient'
import styles from './styles.module.scss'

export default function Category() {
  const [category, setCategory] = useState('')

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    await api.post('/category', { name: category })

    toast.success('Categoria cadastrada com sucesso.')

    setCategory('')
  }

  return (
    <>
      <Head>
        <title>Sujeito pizza - Cadastrar categoria</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <form onSubmit={handleRegister} className={styles.form}>
          <h2>Nova categoria</h2>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Digite um nome para a categoria"
            className={styles.input}
            type="text"
          />
          <Button isLoginButton={false} type="submit" loading={false}>
            Cadastrar
          </Button>
        </form>
      </main>
    </>
  )
}
