import { ListChecks } from 'lucide-react'
import PagePlaceholder from '../components/PagePlaceholder'

export default function Checklists() {
  return (
    <PagePlaceholder
      eyebrow="Tools & resources"
      title="Checklists"
      description="Practical, downloadable checklists for service audits, client matrices, tech-stack evaluation, and 90-day roadmaps. They'll be available here shortly."
      icon={ListChecks}
    />
  )
}
