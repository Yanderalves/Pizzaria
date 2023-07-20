import Link from 'next/link'
import { useContext } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { authContext } from '../../context/AuthContext'
import styles from './styles.module.scss'

export function Header() {
  const { signOut } = useContext(authContext)

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/dashboard">
          <img
            src="/logo.svg"
            width={190}
            height={60}
            alt="Logo sujeito pizza"
          />
        </Link>
        <nav className={styles.menuHeader}>
          <Link href="/category">Categoria</Link>
          <Link href="/product">Cardápio</Link>
          <button onClick={signOut}>
            <FiLogOut color="#FFF" size={24} />
          </button>
        </nav>
      </div>
    </header>
  )
}
