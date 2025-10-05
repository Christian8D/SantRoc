import Link from "next/link"

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-vintage-dark/90 backdrop-blur-sm border-b border-vintage-brown">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="groovy-title text-2xl text-vintage-tan">
          Sant Roc
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#music" className="text-vintage-cream hover:text-vintage-tan transition-colors">
            Music
          </Link>
          <Link href="#videos" className="text-vintage-cream hover:text-vintage-tan transition-colors">
            Videos
          </Link>
          <Link href="#events" className="text-vintage-cream hover:text-vintage-tan transition-colors">
            Events
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 bg-vintage-tan text-vintage-dark rounded hover:bg-vintage-brown hover:text-vintage-cream transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  )
}
