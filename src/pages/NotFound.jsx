import { Compass } from 'lucide-react'
import PagePlaceholder from '../components/PagePlaceholder'

export default function NotFound() {
  return (
    <PagePlaceholder
      eyebrow="Error 404"
      title="Page not found"
      description="The page you're looking for doesn't exist or has moved. Let's get you back on track."
      icon={Compass}
    />
  )
}
