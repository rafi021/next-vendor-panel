'use client';
import { Switch } from '@/components/ui/switch';
import { api } from '@/server/api';
import React, { useState } from 'react';
import { toast } from 'sonner';

interface IStatusUpdateProps {
  url: string;
  tags: string[];
  isActive: boolean;
  disabled?: boolean;
}

const StatusUpdate = ({
  isActive,
  url,
  tags,
  disabled,
}: IStatusUpdateProps) => {
  const [active, setActive] = useState<boolean>(isActive);

  const handleChange = async (checked: boolean) => {
    setActive(checked);
    const res = await api.put(url, '_', tags);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Switch
      checked={active}
      disabled={disabled ?? false}
      onCheckedChange={handleChange}
    />
  );
};

export default StatusUpdate;
