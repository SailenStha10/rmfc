import { Link } from 'react-router-dom'
import BaseForm from './BaseForm'
import { registerForm } from '@/data/forms'

export default function RegisterForm() {
  return (
    <>
      <BaseForm
        name="register"
        fields={registerForm.fields}
        submitLabel={registerForm.submit}
        successText={registerForm.success}
      />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Login
        </Link>
      </p>
    </>
  )
}
