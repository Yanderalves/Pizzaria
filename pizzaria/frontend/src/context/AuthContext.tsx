import Router from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { api } from '../services/apiClient'

type UserProps = {
  id: string
  name: string
  email: string
}

type SignInProps = {
  email: string
  password: string
}

type SignUpProps = {
  name: string
  email: string
  password: string
}

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextData = {
  user: UserProps
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => void
  signUp: (credential: SignUpProps) => Promise<void>
}

export const authContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  } catch (error) {
    console.log('Error signOut')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies()
    if (token) {
      api
        .get('/me')
        .then((response) => {
          const { id, name, email } = response.data
          setUser({ id, name, email })
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post('/login', {
        email,
        password,
      })

      const { id, token, name } = response.data

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })

      setUser({ id, name, email })

      api.defaults.headers.Authorization = `Bearer ${token}`

      Router.push('/dashboard')

      toast.success('Login efetuado com sucesso.')

      console.log(response.data)
    } catch (error) {
      toast.error('Login falhou. Tente novamente.')
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post('users', {
        name,
        email,
        password,
      })
      toast.success('Usuário cadastrado com sucesso')
      Router.push('/')
    } catch (error) {
      console.log('Foi de vasco')
    }
  }

  return (
    <authContext.Provider
      value={{
        user: { email: 'teste', id: 'teste', name: 'teste' },
        isAuthenticated,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </authContext.Provider>
  )
}
