import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Wings from '@/pages/Wings'
import WingDetail from '@/pages/WingDetail'
import Events from '@/pages/Events'
import Gallery from '@/pages/Gallery'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Shop from '@/pages/Shop'
import Cart from '@/pages/Cart'
import JoinClub from '@/pages/JoinClub'
import Contact from '@/pages/Contact'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import MatchDetail from '@/pages/MatchDetail'
import NotFound from '@/pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="wings" element={<Wings />} />
        <Route path="wings/:slug" element={<WingDetail />} />
        <Route path="events" element={<Events />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="shop" element={<Shop />} />
        <Route path="cart" element={<Cart />} />
        <Route path="join-club" element={<JoinClub />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="match/:slug" element={<MatchDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
