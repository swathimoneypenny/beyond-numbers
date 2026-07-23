import { Mic } from 'lucide-react'
import PagePlaceholder from '../components/PagePlaceholder'

export default function Podcast() {
  return (
    <PagePlaceholder
      eyebrow="Resources"
      title="Podcast"
      description="Conversations with accounting firm owners and advisory leaders on moving beyond compliance. The full episode library and player are coming soon."
      icon={Mic}
    />
  )
}
