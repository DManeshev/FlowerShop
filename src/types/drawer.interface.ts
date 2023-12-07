import { PropsWithChildren } from "react"

export interface IDrawer extends PropsWithChildren<unknown> {
	isOpen: boolean
	close: () => void
}