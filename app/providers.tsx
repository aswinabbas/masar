"use client"

import { StoreProvider } from "easy-peasy"
import store from "@/stateStorage/store"

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider store={store}>
            {children}
        </StoreProvider>
    )
}
