import { create } from "zustand";
import type { ReactNode } from "react";

export type TSidebarState = {
    content: ReactNode
    shouldAppear: boolean
}

export const useSidebarState = create<TSidebarState>(() => ({
    content: null,
    shouldAppear: true
}))