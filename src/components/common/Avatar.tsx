'use client';
import {
  Avatar as AvatarCom,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

type AvatarProps = {
  className?: string;
  src: string;
  alt?: string;
  text: string;
};
export function Avatar({ src, alt, text, className }: AvatarProps) {
  return (
    <AvatarCom className={className}>
      <AvatarImage src={src} alt={alt ?? ''} />
      <AvatarFallback>{text.charAt(0)}</AvatarFallback>
    </AvatarCom>
  );
}
