'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

type LogoutButtonProps = {
  redirectTo?: string;
  className?: string;
  variant?: React.ComponentProps<typeof Button>['variant'];
};

export function LogoutButton({
  redirectTo = '/login',
  className,
  variant = 'outline',
}: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      router.replace(redirectTo);
      router.refresh();
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      onClick={onLogout}
      disabled={loading}
      className={className}
    >
      {loading ? 'Вихід…' : 'Вийти'}
    </Button>
  );
}
