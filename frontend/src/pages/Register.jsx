import AuthLayout from '@/components/forms/AuthLayout'
import RegisterForm from '@/components/forms/RegisterForm'
import Seo from '@/components/common/Seo'
import { registerForm } from '@/data/forms'

export default function Register() {
  return (
    <>
      <Seo title="Register" description="Create an RMFC Nepal account." path="/register" noindex />
      <AuthLayout bannerTitle="Register" heading={registerForm.heading} text={registerForm.text}>
        <RegisterForm />
      </AuthLayout>
    </>
  )
}
