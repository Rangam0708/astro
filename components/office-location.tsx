import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function OfficeLocation() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="bg-white/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="mb-4 text-xl font-semibold text-white">Our Office</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="text-white">AstroInsights Consultation Center</p>
                <p className="text-white/70">123 Cosmic Avenue, Spiritual District</p>
                <p className="text-white/70">New Delhi, 110001</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 flex-shrink-0 text-emerald-400" />
              <p className="text-white">+91 94380 77865</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 flex-shrink-0 text-emerald-400" />
              <p className="text-white">contact@astroinsights.com</p>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-400" />
              <div>
                <p className="text-white">Opening Hours:</p>
                <p className="text-white/70">Monday - Friday: 10:00 AM - 7:00 PM</p>
                <p className="text-white/70">Saturday: 10:00 AM - 5:00 PM</p>
                <p className="text-white/70">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden rounded-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9484775204456!2d77.20651857547855!3d28.632345175663527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1711039200307!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "300px" }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
        ></iframe>
      </div>
    </div>
  )
}

