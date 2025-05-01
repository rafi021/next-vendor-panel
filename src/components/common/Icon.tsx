'use client';
import React from 'react';
import { Icon as Iconify, IconifyIcon } from '@iconify/react';

export type IconProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
  rotate?: number;
  className?: string;
};
type IIconProps = {
  width?: string | number;
  height?: string | number;
  color?: string;
  icon: string | IconifyIcon;
  rotate?: number;
  className?: string;
};

const Icon = ({
  height,
  width,
  color,
  icon,
  rotate,
  className,
}: IIconProps) => {
  return (
    <Iconify
      icon={icon}
      width={width}
      height={height}
      color={color}
      rotate={rotate}
      className={className}
    />
  );
};

export default Icon;
