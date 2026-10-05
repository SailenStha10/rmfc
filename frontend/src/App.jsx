import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import Splash from '@/components/layout/Splash'
import AppRoutes from '@/routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Splash />
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  )
}
