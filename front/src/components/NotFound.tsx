'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className=''>
      <div className='m-auto flex w-full flex-col items-center justify-center gap-2'>
        <h1 className='text-[7rem] leading-tight font-bold'>404</h1>
        <span className='font-medium'>Oops! Página não encontrada!</span>
        <p className='text-muted-foreground text-center'>
          Parece que a página que você está procurando <br />
          não existe ou pode ter sido removida.
        </p>
        <div className='mt-6 flex gap-4'>
          <Button
            variant='outline'
            onClick={() => router.back()}
          >
            Voltar
          </Button>
          <Button asChild>
            <Link href='/'>
              Voltar para a Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}