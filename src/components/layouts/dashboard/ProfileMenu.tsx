import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ChangeLanguage } from './ChangeLanguage';
import Logout from './Logout';
import { useUser } from '@/hooks/useUser';

export function ProfileMenu() {
  const user = useUser();

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button
          variant={'white'}
          className="px-0 md:pl-2 border-transparent md:border-gray-200"
        >
          <Avatar
            src="https://github.com/shadcn.png"
            text="maruf"
            className="h-space24 w-space24 bg-blue-950/10"
          />
          <span className="hidden md:flex items-center gap-space4">
            {user.name}
            <span className={`${open ? 'rotate-180' : 'rotate-0'}`}>
              <ChevronDown className={`h-space16`} />
            </span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="!w-80 p-0" align="end">
        {/* <div className="h-[100px] overflow-y-scroll">
          <div className="border-b pb-2 border-color px-5 py-3">Profile</div>
          <div className="p-2">
            <ChangeLanguage />
            <Logout setIsOpen={setOpen} />
          </div>
          <div className="border-b pb-2 border-color px-5 py-3">Profile</div>
          <div className="p-2">
            <ChangeLanguage />
            <Logout setIsOpen={setOpen} />
          </div>
          <div className="border-b pb-2 border-color px-5 py-3">Profile</div>
          <div className="p-2">
            <ChangeLanguage />
            <Logout setIsOpen={setOpen} />
          </div>
          <div className="border-b pb-2 border-color px-5 py-3">Profile</div>
          <div className="p-2">
            <ChangeLanguage />
            <Logout setIsOpen={setOpen} />
          </div>
        </div> */}
        <div className="border-b pb-2 border-color px-5 py-3">Profile</div>
        <div className="p-2">
          {/* <ChangeLanguage /> */}
          <Logout setIsOpen={setOpen} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
