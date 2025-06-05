import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { ThemeProvider } from './components/theme-provider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { store } from './app/store'
import { AppToaster } from './components/ui/sonner.tsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <App />
          <AppToaster />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)
