import { PropsWithChildren } from "react"
export interface IDrawer extends PropsWithChildren<unknown> {
	isOpen: boolean
	closeDrawer: () => void
	isPage?: boolean
	width?: string
}