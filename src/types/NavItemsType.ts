import { LucideIcon } from "lucide-react";

export type  NavItems = {
	title: string;
	link?: string;
	icon?: LucideIcon;
	subMenu?: Array<{ title: string; link: string; icon?: LucideIcon }>;
}
