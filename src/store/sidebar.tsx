import { Store } from "@tanstack/react-store";
import type { ReactNode } from "react";

export type TSidebarStore = {
    content: ReactNode
    shouldAppear: boolean
}

export const sidebarStore = new Store<TSidebarStore>({
    content: null,
    shouldAppear: true
})