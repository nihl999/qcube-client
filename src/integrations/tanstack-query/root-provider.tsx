import { QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 24
    }
  }
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})


export function getContext()
{
  return {
    queryClient,
  }
}

export function Provider({ children }: { children: React.ReactNode })
{
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}> {children}</PersistQueryClientProvider >
  )
}
