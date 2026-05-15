"use client"

import { useState } from "react"
import { Home, FileText, Users, Bell, Phone, Menu, X, ChevronRight, Send, MapPin, Clock, AlertTriangle } from "lucide-react"
import Image from "next/image"

// Types
type Tab = "home" | "concerns" | "officers" | "announcements" | "emergency"
type ConcernCategory = "infrastructure" | "peace" | "health" | "environment" | "other"

interface Officer {
  id: number
  name: string
  position: string
  phone: string
  image: string
}

interface Announcement {
  id: number
  title: string
  content: string
  date: string
  important: boolean
}

// Mock Data
const officers: Officer[] = [
  { id: 1, name: "Hon. Juan Dela Cruz", position: "Punong Barangay", phone: "0917-123-4567", image: "/api/placeholder/80/80" },
  { id: 2, name: "Maria Santos", position: "Barangay Secretary", phone: "0918-234-5678", image: "/api/placeholder/80/80" },
  { id: 3, name: "Pedro Reyes", position: "Barangay Treasurer", phone: "0919-345-6789", image: "/api/placeholder/80/80" },
  { id: 4, name: "Ana Gonzales", position: "Kagawad - Peace & Order", phone: "0920-456-7890", image: "/api/placeholder/80/80" },
  { id: 5, name: "Jose Ramos", position: "Kagawad - Health", phone: "0921-567-8901", image: "/api/placeholder/80/80" },
  { id: 6, name: "Elena Cruz", position: "Kagawad - Education", phone: "0922-678-9012", image: "/api/placeholder/80/80" },
  { id: 7, name: "Roberto Tan", position: "SK Chairman", phone: "0923-789-0123", image: "/api/placeholder/80/80" },
]

const announcements: Announcement[] = [
  { id: 1, title: "Barangay Assembly Meeting", content: "All residents are invited to attend the quarterly barangay assembly on June 15, 2024 at 2:00 PM at the Barangay Hall.", date: "June 10, 2024", important: true },
  { id: 2, title: "Free Medical Check-up", content: "Free medical consultation and check-up sponsored by the Municipal Health Office. Bring your Barangay ID.", date: "June 8, 2024", important: false },
  { id: 3, title: "Road Repair Schedule", content: "The road along Sitio Malaking Bato will be under repair from June 20-25. Please use alternate routes.", date: "June 5, 2024", important: true },
  { id: 4, title: "Clean-up Drive", content: "Join us for our monthly coastal clean-up drive this Saturday at 6:00 AM. Meet at the barangay plaza.", date: "June 3, 2024", important: false },
]

const concernCategories: { value: ConcernCategory; label: string; icon: string }[] = [
  { value: "infrastructure", label: "Roads & Infrastructure", icon: "🛣️" },
  { value: "peace", label: "Peace & Order", icon: "🛡️" },
  { value: "health", label: "Health & Sanitation", icon: "🏥" },
  { value: "environment", label: "Environment", icon: "🌿" },
  { value: "other", label: "Other Concerns", icon: "📝" },
]

export default function BarangayApp() {
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [concernForm, setConcernForm] = useState({ category: "" as ConcernCategory | "", name: "", contact: "", location: "", description: "" })
  const [concernSubmitted, setConcernSubmitted] = useState(false)

  const handleConcernSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setConcernSubmitted(true)
    setTimeout(() => {
      setConcernSubmitted(false)
      setConcernForm({ category: "", name: "", contact: "", location: "", description: "" })
      setActiveTab("home")
    }, 3000)
  }

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/-/g, "")}`
  }

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between sticky top-0 z-50 safe-area-top shadow-md">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="Barangay Gasang Logo" width={44} height={44} className="rounded-full border-2 border-white/30" />
          <div>
            <h1 className="font-bold text-lg leading-tight">Barangay Gasang</h1>
            <p className="text-xs opacity-90">Mabini, Batangas</p>
          </div>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-white/10 rounded-full transition-colors" aria-label="Menu">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setMenuOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-64 bg-card shadow-xl p-4 pt-20" onClick={(e) => e.stopPropagation()}>
            <nav className="space-y-2">
              {[
                { tab: "home" as Tab, icon: Home, label: "Home" },
                { tab: "concerns" as Tab, icon: FileText, label: "Report Concern" },
                { tab: "officers" as Tab, icon: Users, label: "Officers" },
                { tab: "announcements" as Tab, icon: Bell, label: "Announcements" },
                { tab: "emergency" as Tab, icon: Phone, label: "Emergency" },
              ].map(({ tab, icon: Icon, label }) => (
                <button key={tab} onClick={() => { setActiveTab(tab); setMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${activeTab === tab ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
                  <Icon size={20} />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        {/* Home Tab */}
        {activeTab === "home" && (
          <div className="p-4 space-y-4">
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-5 shadow-lg">
              <h2 className="text-xl font-bold mb-1">Magandang Araw!</h2>
              <p className="text-sm opacity-90">Welcome to the official app of Barangay Gasang. How can we help you today?</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setActiveTab("concerns")} className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:border-primary/30 transition-all active:scale-[0.98] flex flex-col items-center gap-2 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileText className="text-primary" size={28} />
                </div>
                <span className="font-semibold text-sm">Report Concern</span>
                <span className="text-xs text-muted-foreground">Send your concerns</span>
              </button>

              <button onClick={() => setActiveTab("officers")} className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:border-secondary/30 transition-all active:scale-[0.98] flex flex-col items-center gap-2 text-center">
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Users className="text-secondary" size={28} />
                </div>
                <span className="font-semibold text-sm">Contact Officers</span>
                <span className="text-xs text-muted-foreground">Reach barangay officials</span>
              </button>

              <button onClick={() => setActiveTab("announcements")} className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:border-accent/30 transition-all active:scale-[0.98] flex flex-col items-center gap-2 text-center">
                <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center">
                  <Bell className="text-accent" size={28} />
                </div>
                <span className="font-semibold text-sm">Announcements</span>
                <span className="text-xs text-muted-foreground">Latest news & updates</span>
              </button>

              <button onClick={() => setActiveTab("emergency")} className="bg-card rounded-2xl p-4 shadow-sm border border-border hover:border-destructive/30 transition-all active:scale-[0.98] flex flex-col items-center gap-2 text-center">
                <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center">
                  <Phone className="text-destructive" size={28} />
                </div>
                <span className="font-semibold text-sm">Emergency</span>
                <span className="text-xs text-muted-foreground">Quick emergency call</span>
              </button>
            </div>

            {/* Latest Announcement */}
            <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-base">Latest Announcement</h3>
                <button onClick={() => setActiveTab("announcements")} className="text-primary text-sm font-medium flex items-center gap-1">
                  View All <ChevronRight size={16} />
                </button>
              </div>
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-start gap-2 mb-2">
                  {announcements[0].important && <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full font-medium">Important</span>}
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} />{announcements[0].date}</span>
                </div>
                <h4 className="font-semibold text-sm mb-1">{announcements[0].title}</h4>
                <p className="text-xs text-muted-foreground line-clamp-2">{announcements[0].content}</p>
              </div>
            </div>
          </div>
        )}

        {/* Concerns Tab */}
        {activeTab === "concerns" && (
          <div className="p-4">
            {concernSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-secondary" size={40} />
                </div>
                <h2 className="text-xl font-bold text-secondary mb-2">Concern Submitted!</h2>
                <p className="text-muted-foreground">Thank you for your report. Our barangay officials will review it shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-1">Report a Concern</h2>
                <p className="text-sm text-muted-foreground mb-4">Let us know about issues in our barangay</p>

                <form onSubmit={handleConcernSubmit} className="space-y-4">
                  {/* Category Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <div className="grid grid-cols-2 gap-2">
                      {concernCategories.map((cat) => (
                        <button key={cat.value} type="button" onClick={() => setConcernForm({ ...concernForm, category: cat.value })} className={`p-3 rounded-xl border text-left transition-all ${concernForm.category === cat.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                          <span className="text-xl mb-1 block">{cat.icon}</span>
                          <span className="text-xs font-medium">{cat.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Name</label>
                    <input type="text" value={concernForm.name} onChange={(e) => setConcernForm({ ...concernForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Juan Dela Cruz" required />
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Contact Number</label>
                    <input type="tel" value={concernForm.contact} onChange={(e) => setConcernForm({ ...concernForm, contact: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="0917-123-4567" required />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Location / Sitio</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                      <input type="text" value={concernForm.location} onChange={(e) => setConcernForm({ ...concernForm, location: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="Sitio Malaking Bato" required />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Describe Your Concern</label>
                    <textarea value={concernForm.description} onChange={(e) => setConcernForm({ ...concernForm, description: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" rows={4} placeholder="Please describe the issue in detail..." required />
                  </div>

                  {/* Submit */}
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-base hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    <Send size={20} />
                    Submit Concern
                  </button>
                </form>
              </>
            )}
          </div>
        )}

        {/* Officers Tab */}
        {activeTab === "officers" && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-1">Barangay Officers</h2>
            <p className="text-sm text-muted-foreground mb-4">Contact our officials directly</p>

            <div className="space-y-3">
              {officers.map((officer) => (
                <div key={officer.id} className="bg-card rounded-2xl p-4 shadow-sm border border-border flex items-center gap-4">
                  <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center text-xl font-bold text-muted-foreground">
                    {officer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">{officer.name}</h3>
                    <p className="text-xs text-muted-foreground">{officer.position}</p>
                    <p className="text-xs text-primary font-medium mt-1">{officer.phone}</p>
                  </div>
                  <button onClick={() => handleCall(officer.phone)} className="w-12 h-12 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center hover:bg-secondary/90 active:scale-95 transition-all" aria-label={`Call ${officer.name}`}>
                    <Phone size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-1">Announcements</h2>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with barangay news</p>

            <div className="space-y-3">
              {announcements.map((announcement) => (
                <div key={announcement.id} className={`bg-card rounded-2xl p-4 shadow-sm border ${announcement.important ? "border-destructive/30" : "border-border"}`}>
                  <div className="flex items-start gap-2 mb-2">
                    {announcement.important && (
                      <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                        <AlertTriangle size={10} /> Important
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} />{announcement.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base mb-2">{announcement.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{announcement.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Tab */}
        {activeTab === "emergency" && (
          <div className="p-4">
            <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="text-destructive" size={20} />
                <h2 className="text-lg font-bold text-destructive">Emergency Hotlines</h2>
              </div>
              <p className="text-sm text-muted-foreground">For emergencies, please call the appropriate hotline below.</p>
            </div>

            <div className="space-y-3">
              {/* Barangay Emergency */}
              <button onClick={() => handleCall("0917-123-4567")} className="w-full bg-destructive text-destructive-foreground rounded-2xl p-5 shadow-lg hover:bg-destructive/90 active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone size={28} />
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-lg">Barangay Emergency</h3>
                    <p className="text-sm opacity-90">0917-123-4567</p>
                  </div>
                  <ChevronRight size={24} />
                </div>
              </button>

              {/* Police */}
              <button onClick={() => handleCall("911")} className="w-full bg-accent text-accent-foreground rounded-2xl p-5 shadow-lg hover:bg-accent/90 active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚔</span>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-lg">Police (PNP)</h3>
                    <p className="text-sm opacity-90">911</p>
                  </div>
                  <ChevronRight size={24} />
                </div>
              </button>

              {/* Fire */}
              <button onClick={() => handleCall("911")} className="w-full bg-primary text-primary-foreground rounded-2xl p-5 shadow-lg hover:bg-primary/90 active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚒</span>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-lg">Fire Department (BFP)</h3>
                    <p className="text-sm opacity-90">911</p>
                  </div>
                  <ChevronRight size={24} />
                </div>
              </button>

              {/* Medical */}
              <button onClick={() => handleCall("911")} className="w-full bg-secondary text-secondary-foreground rounded-2xl p-5 shadow-lg hover:bg-secondary/90 active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🚑</span>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-lg">Medical Emergency</h3>
                    <p className="text-sm opacity-90">911</p>
                  </div>
                  <ChevronRight size={24} />
                </div>
              </button>

              {/* NDRRMC */}
              <button onClick={() => handleCall("8911-5061")} className="w-full bg-card text-card-foreground rounded-2xl p-5 shadow-sm border border-border hover:border-primary/30 active:scale-[0.98] transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-2xl">🌊</span>
                  </div>
                  <div className="text-left flex-1">
                    <h3 className="font-bold text-base">NDRRMC</h3>
                    <p className="text-sm text-muted-foreground">8911-5061</p>
                  </div>
                  <ChevronRight size={24} className="text-muted-foreground" />
                </div>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border safe-area-bottom">
        <div className="flex justify-around items-center py-2">
          {[
            { tab: "home" as Tab, icon: Home, label: "Home" },
            { tab: "concerns" as Tab, icon: FileText, label: "Report" },
            { tab: "officers" as Tab, icon: Users, label: "Officers" },
            { tab: "announcements" as Tab, icon: Bell, label: "News" },
            { tab: "emergency" as Tab, icon: Phone, label: "Emergency", emergency: true },
          ].map(({ tab, icon: Icon, label, emergency }) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${activeTab === tab ? (emergency ? "text-destructive" : "text-primary") : "text-muted-foreground"}`}>
              <Icon size={22} strokeWidth={activeTab === tab ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
