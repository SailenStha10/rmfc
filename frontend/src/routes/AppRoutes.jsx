import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '@/components/layout/Layout'

// Each page is its own chunk, loaded on first visit.
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Team = lazy(() => import('@/pages/Team'))
const Wings = lazy(() => import('@/pages/Wings'))
const WingDetail = lazy(() => import('@/pages/WingDetail'))
const Events = lazy(() => import('@/pages/Events'))
const Gallery = lazy(() => import('@/pages/Gallery'))
const Blog = lazy(() => import('@/pages/Blog'))
const BlogPost = lazy(() => import('@/pages/BlogPost'))
const Shop = lazy(() => import('@/pages/Shop'))
const Cart = lazy(() => import('@/pages/Cart'))
const JoinClub = lazy(() => import('@/pages/JoinClub'))
const Contact = lazy(() => import('@/pages/Contact'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const MatchDetail = lazy(() => import('@/pages/MatchDetail'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
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
