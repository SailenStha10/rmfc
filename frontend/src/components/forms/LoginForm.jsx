import { Link } from 'react-router-dom'
import BaseForm from './BaseForm'
import { loginForm } from '@/data/forms'

export default function LoginForm() {
  return (
    <>
      <BaseForm
        name="login"
        fields={loginForm.fields}
        submitLabel={loginForm.submit}
        successText={loginForm.success}
      />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here?{' '}
        <Link to="/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </>
  )
}
