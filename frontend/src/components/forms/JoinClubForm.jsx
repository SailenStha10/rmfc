import BaseForm from './BaseForm'
import { joinClubForm } from '@/data/forms'
import { wings } from '@/data/wings'

export default function JoinClubForm() {
  return (
    <BaseForm
      name="join-club"
      fields={joinClubForm.fields}
      submitLabel={joinClubForm.submit}
      successText={joinClubForm.success}
      options={{ wing: wings.map((w) => w.name) }}
    />
  )
}
