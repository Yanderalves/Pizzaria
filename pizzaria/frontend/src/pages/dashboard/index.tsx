import Head from 'next/head'
import { Header } from '../../components/Header'
import { canSSRAuth } from '../../utils/canSSRGAuth'
import styles from './styles.module.scss'

import { useState } from 'react'
import { FiRefreshCcw } from 'react-icons/fi'
import { setupAPIClient } from '../../services/api'

import { toast } from 'react-toastify'
import ModalOrder from '../../components/ModalOrder'
import { api } from '../../services/apiClient'

import Modal from 'react-modal'

type OrderProps = {
  id: string
  table: number | string
  status: boolean
  draft: boolean
  name: string | null
}
interface HomeProps {
  orders: OrderProps[]
}

export type OrderItemProps = {
  readonly id: string
  readonly amount: number
  readonly order_id: string
  readonly product_id: string
  readonly product: {
    id: string
    name: string
    description: string
    price: string
    banner: string
  }
  readonly order: {
    id: string
    table: string | number
    status: boolean
    name: string | null
  }
}

export default function Dashboard({ orders }: HomeProps) {
  const [orderList, setOrderList] = useState(orders || [])
  const [modalItem, setModalItem] = useState<OrderItemProps[]>([])
  const [modalVisible, setModalVisible] = useState(false)

  async function handleOpenModalView(id: string) {
    const response = await api.get('/order/details', {
      params: {
        order_id: id,
      },
    })

    setModalItem(response.data)

    setModalVisible(true)
  }
  async function handleFinishOrder(id: string) {
    await api.patch('/order/finish', { order_id: id })

    const newOrdesList = (await api.get('/orders')).data

    setOrderList(newOrdesList)

    setModalVisible(false)

    toast.success('Pedido concluído com sucesso')
  }

  function handleCloseModal() {
    setModalVisible(false)
  }
  Modal.setAppElement('#__next')

  return (
    <>
      <Head>
        <title>Pedidos - Sujeito pizzaria</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <div className={styles.headOrders}>
          <h2>Pedidos</h2>
          <button>
            <FiRefreshCcw color="#3fffa3" size={25} />
          </button>
        </div>
        <div className={styles.containerOrders}>
          {orderList.map((item, index) => {
            return (
              <button
                onClick={() => handleOpenModalView(item.id)}
                key={item.id}
                className={styles.order}
              >
                Mesa {item.table}
              </button>
            )
          })}
        </div>
      </main>
      {modalVisible && (
        <ModalOrder
          handleFinishOrder={handleFinishOrder}
          isOpen={true}
          onRequestClose={() => handleCloseModal}
          order={modalItem}
        />
      )}
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const apiClient = setupAPIClient(context)

  const response = await apiClient.get('/orders')

  return {
    props: {
      orders: response.data,
    },
  }
})
