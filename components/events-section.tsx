import { Calendar } from "lucide-react"
import type { Event } from "@/lib/supabase"

interface EventsSectionProps {
  events: Event[]
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="events" className="py-20 bg-vintage-cream">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Calendar className="w-8 h-8 text-vintage-tan" />
          <h2 className="groovy-title text-5xl text-vintage-dark">Events</h2>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-vintage-tan/20 border-2 border-vintage-brown p-6 rounded-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-serif text-vintage-dark mb-2">{event.title}</h3>
              <p className="text-vintage-brown mb-4">{event.description}</p>
              <div className="flex items-center gap-2 text-sm text-vintage-dark">
                <Calendar className="w-4 h-4" />
                <time dateTime={event.event_date}>
                  {new Date(event.event_date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
