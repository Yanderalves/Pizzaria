import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthtokenError } from '../services/errors/AuthTokenError'

export function canSSRAuth<P extends { [key: string]: any }>(
  fn: GetServerSideProps<P>,
) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(context)

    const token = cookies['@nextauth.token']

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    try {
      return await fn(context)
    } catch (error) {
      if (error instanceof AuthtokenError) {
        destroyCookie(context, '@@nextauth.token')
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        }
      }
    }

    if (cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }

    return await fn(context)
  }
}
