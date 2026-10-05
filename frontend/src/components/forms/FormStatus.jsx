import { AlertCircle, CheckCircle2 } from 'lucide-react'

export default function FormStatus({ status, successText, errorText = 'Please fix the highlighted fields and try again.' }) {
  if (status === 'success') {
    return (
      <div role="status" className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
        <CheckCircle2 size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p className="text-sm">{successText}</p>
      </div>
    )
  }
  if (status === 'error') {
    return (
      <div role="alert" className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p className="text-sm">{errorText}</p>
      </div>
    )
  }
  return null
}
