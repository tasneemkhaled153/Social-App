
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './routes/Routes'
import UserContextProvider from './context/UserContext';
import { Toaster } from 'react-hot-toast';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';


function App() {

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
    <UserContextProvider>
      <RouterProvider router={router} />
      <Toaster />
    </UserContextProvider>
    </QueryClientProvider>
  )
}

export default App
