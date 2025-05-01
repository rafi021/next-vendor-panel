import { cn } from '@/lib/utils';
import { logout } from '@/server/auth/logout';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import React, { useEffect, useTransition } from 'react';
import { toast } from 'sonner';

const Logout = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (isLoading) {
      toast.loading('Logging out...');
    }
  }, [isLoading]);

  const handleLogout = () => {
    startTransition(async () => {
      const res = await logout();

      // // console.log('res', res);

      if (res.success) {
        setIsOpen(false);
        toast.dismiss();
        toast.success(res.message);
        router.replace('/auth');
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div
      onClick={handleLogout}
      className={cn(
        'capitalize py-2 px-3 text-base text-error-500 flex items-center gap-2 hover:bg-error-500/10 rounded-sm duration-300',
      )}
    >
      Logout <LogOut height={16} width={16} />
    </div>
  );
};

export default Logout;
