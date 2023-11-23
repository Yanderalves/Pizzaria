import { ChangeEvent, FormEvent, useState } from 'react'

import styles from './styles.module.scss'

import Head from 'next/head'

import Button from '../../components/Button'
import { Header } from '../../components/Header'
import { MonetaryInput } from '../../components/Input'

import { FiUpload } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'
import { api } from '../../services/apiClient'

import { canSSRAuth } from '../../utils/canSSRGAuth'

import { toast } from 'react-toastify'

import FormData from 'form-data'

type ItemProps = {
  name: string
  id: string
}

interface CategoryProps {
  readonly categoryList: ItemProps[]
}

export default function Product({ categoryList =[]}: CategoryProps) {
  const [image, setImage] = useState<File>()
  const [urlImage, setUrlImage] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [categorySelected, setCategorySelected] = useState(0)

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setUrlImage(URL.createObjectURL(event.target.files[0]))
      setImage(event.target.files[0])
    }
  }

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    const data = new FormData()

    data.append('name', name)
    data.append('price', price)
    data.append('description', description)
    data.append('category_id', categoryList[categorySelected].id)
    data.append('banner', image)

    await api.post('/product', data)

    toast.success('Produto cadastrado com sucesso')

    setName('')
    setDescription('')
    setPrice('')
    setCategorySelected(0)
  }

  function handleCategory(event: ChangeEvent<HTMLSelectElement>) {
    const value = Number(event.target.value)
    setCategorySelected(value)
  }

  return (
    <>
      <Head>
        <title>Cadastrar produto - Sujeito pizza</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <h2>Novo produto</h2>

        <form className={styles.form} onSubmit={handleRegister}>
          <label className={styles.labelFile}>
            <span>
              <FiUpload size={25} />
            </span>

            <input
              className={styles.inputFile}
              type="file"
              onChange={handleFile}
            />

            <div className={styles.containerImage}>
              {urlImage && (
                <img
                  className={styles.imagePreview}
                  width={250}
                  height={250}
                  src={urlImage || ' '}
                  alt="Foto do produto"
                />
              )}
            </div>
          </label>

          <select
            value={categorySelected}
            className={styles.input}
            onChange={handleCategory}
          >
            {categoryList.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.name}
                </option>
              )
            })}
          </select>

          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Nome do item"
          />

          <MonetaryInput />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            placeholder="Descrição"
          ></textarea>
          <Button isLoginButton={false} type="submit" loading={false}>
            Cadastrar
          </Button>
        </form>
      </main>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)

  const response = await apiClient.get('/category')

  return {
    props: {
      categoryList: response.data,
    },
  }
})
