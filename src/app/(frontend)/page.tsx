import React from 'react'
import { LogoutButton } from '@/components/auth/LogoutButton'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  return (
    <div className="home">
      <div className="flex gap-4 w-full justify-center p-6">
        <LogoutButton redirectTo="/" />
        <Button asChild><a href="/login">Увійти</a></Button>
        <div className="text-white px-4 bg-blue-500 py-2 font-medium" />
        <Button asChild><a href="/signup">Зареєструватися</a></Button>
      </div>
    </div>
  )
}
