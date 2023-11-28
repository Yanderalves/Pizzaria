import { FiX } from 'react-icons/fi'
import Modal from 'react-modal'
import { OrderItemProps } from '../../pages/dashboard'
import styles from './style.module.scss'

interface ModalOrderProps {
  readonly isOpen: boolean
  readonly onRequestClose: () => void
  readonly order: OrderItemProps[]
  readonly handleFinishOrder: (id: string) => void
}

export default function ModalOrder({
  isOpen,
  onRequestClose,
  order,
  handleFinishOrder,
}: ModalOrderProps) {
  Modal.setAppElement('#__next')

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e',
    },
    overlay: {
      background: 'rgba(237, 237, 237, 0.40)',
    },
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color="#F34748" />
      </button>
      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>
        <span className={styles.table}>
          Mesa:<span> {order[0].order.table}</span>
        </span>
        {order.map((item) => {
          return (
            <div key={item.order_id} className={styles.containerItens}>
              <h3>
                <span>{item.amount} - </span> {item.product.name}
              </h3>
              <p>{item.product.description}</p>
            </div>
          )
        })}
      </div>
      <button
        onClick={() => handleFinishOrder(order[0].order_id)}
        className={styles.button}
      >
        Concluir pedido
      </button>
    </Modal>
  )
}
