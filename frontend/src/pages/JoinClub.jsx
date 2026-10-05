import { Info } from 'lucide-react'
import PageBanner from '@/components/common/PageBanner'
import Container from '@/components/common/Container'
import JoinClubForm from '@/components/forms/JoinClubForm'
import { joinClubForm, membershipNotice } from '@/data/forms'
import Seo from '@/components/common/Seo'

export default function JoinClub() {
  return (
    <>
      <Seo title="Join Club" description="Become a member of Real Madrid Fan Club Nepal. Membership information and application form." path="/join-club" />
      <PageBanner title="Join Club" />
      <section className="bg-secondary py-12 md:py-20">
        <Container className="max-w-2xl">
          <div className="mb-8 flex gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-5">
            <Info className="mt-1 shrink-0 text-primary" size={22} aria-hidden="true" />
            <div>
              <h2 className="text-lg">{membershipNotice.heading}</h2>
              {membershipNotice.paragraphs.map((p) => (
                <p key={p} className="mt-2 text-sm text-muted-foreground">{p}</p>
              ))}
              <p className="mt-2 text-sm font-semibold text-foreground">{membershipNotice.reopening}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl">{joinClubForm.heading}</h2>
            <p className="mb-6 mt-1 text-sm text-muted-foreground">{joinClubForm.text}</p>
            <JoinClubForm />
          </div>
        </Container>
      </section>
    </>
  )
}
