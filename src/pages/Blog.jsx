import { PenLine } from 'lucide-react'
import PagePlaceholder from '../components/PagePlaceholder'

export default function Blog() {
  return (
    <PagePlaceholder
      eyebrow="Resources"
      title="Blog"
      description="Articles on advisory strategy, workflow, technology, and building a scalable CAS practice. Our first posts are on the way."
      icon={PenLine}
    />
  )
}
