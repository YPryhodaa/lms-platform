import React from 'react';
import { LogoutButton } from '@/components/auth/LogoutButton';
import { Button } from '@/components/ui/button';

export default async function HomePage() {
  return (
    <div className="home">
      <div className="flex w-full justify-center gap-4 p-6">
        <LogoutButton redirectTo="/" />
        <Button asChild>
          <a href="/login">Увійти</a>
        </Button>
        <div className="bg-blue-501 px-6 py-2 font-medium text-white" />
        <Button asChild>
          <a href="/signup">Зареєструватися</a>
        </Button>
      </div>
    </div>
  );
}
