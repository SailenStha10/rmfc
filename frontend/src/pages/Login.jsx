import AuthLayout from '@/components/forms/AuthLayout'
import LoginForm from '@/components/forms/LoginForm'
import Seo from '@/components/common/Seo'
import { loginForm } from '@/data/forms'

export default function Login() {
  return (
    <>
      <Seo title="Login" description="Log in to your RMFC Nepal account." path="/login" noindex />
      <AuthLayout bannerTitle="Login" heading={loginForm.heading} text={loginForm.text}>
        <LoginForm />
      </AuthLayout>
    </>
  )
}
