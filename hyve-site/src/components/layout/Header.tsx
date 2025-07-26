import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Menu, ChevronRight, Plane, Car, Wind, Shield, Bot, FileText, Calendar, Mail, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"

// Logo component
const Logo = () => (
  <div className="flex items-center space-x-">
    <img 
      src="/src/assets/logo/HD-logo-dk.svg" 
      alt="Hyve Dynamics" 
      className="h-10 w-auto"
    />
  </div>
)

// Navigation structure
const industriesItems = [
  { 
    name: "Aerospace", 
    href: "/industries/aerospace",
    icon: Plane,
    description: "Advanced sensing for aviation and space applications"
  },
  { 
    name: "Motorsports", 
    href: "/industries/motorsports",
    icon: Car,
    description: "Real-time aerodynamic data for racing performance"
  },
  { 
    name: "Energy", 
    href: "/industries/energy",
    icon: Wind,
    description: "Optimizing renewable energy systems"
  },
  { 
    name: "Structural Health Monitoring", 
    href: "/industries/structural-health",
    icon: Shield,
    description: "Predictive maintenance for critical infrastructure"
  },
  { 
    name: "Robotics", 
    href: "/industries/robotics",
    icon: Bot,
    description: "Intelligent tactile sensing for autonomous systems"
  },
]

const insightsItems = [
  { 
    name: "Blog", 
    href: "/insights/blog",
    icon: Newspaper,
    description: "Latest news and technology updates"
  },
  { 
    name: "White Papers", 
    href: "/insights/white-papers",
    icon: FileText,
    description: "Technical deep dives and research"
  },
  { 
    name: "Events", 
    href: "/insights/events",
    icon: Calendar,
    description: "Conferences, webinars, and demos"
  },
  { 
    name: "Newsletter", 
    href: "/insights/newsletter",
    icon: Mail,
    description: "Subscribe to our monthly updates"
  },
]

// Desktop Navigation
const DesktopNavigation = () => (
  <NavigationMenu className="hidden lg:flex">
    <NavigationMenuList className="space-x-2">
      {/* Home */}
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/"
          className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
            "hover:bg-hyve-content hover:text-hyve-text-dark focus:bg-hyve-content focus:text-hyve-text-dark focus:outline-none",
            "font-body text-hyve-text"
          )}
        >
          Home
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Haptic Matrix */}
      <NavigationMenuItem>
        <NavigationMenuLink
          href="/haptic-matrix"
          className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
            "hover:bg-hyve-content hover:text-hyve-text-dark focus:bg-hyve-content focus:text-hyve-text-dark focus:outline-none",
            "font-body text-hyve-text"
          )}
        >
          Haptic Matrix
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Vision */}
      <NavigationMenuItem>
        <NavigationMenuLink
          href="#vision"
          className={cn(
            "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
            "hover:bg-hyve-content hover:text-hyve-text-dark focus:bg-hyve-content focus:text-hyve-text-dark focus:outline-none",
            "font-body text-hyve-text"
          )}
        >
          Vision
        </NavigationMenuLink>
      </NavigationMenuItem>

      {/* Industries Dropdown */}
      <NavigationMenuItem>
        <NavigationMenuTrigger className="font-body text-hyve-text hover:bg-hyve-content hover:text-hyve-text-dark">
          Industries
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-hyve-background">
            {industriesItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <NavigationMenuLink asChild>
                    <a
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200",
                        "hover:bg-hyve-content hover:text-hyve-text-dark focus:bg-hyve-content focus:text-hyve-text-dark",
                        "group hover:scale-[1.02]"
                      )}
                      href={item.href}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-hyve-accent/20 group-hover:bg-hyve-accent/30 transition-colors">
                          <Icon className="h-4 w-4 text-hyve-text group-hover:text-hyve-text-dark" />
                        </div>
                        <div className="text-sm font-medium leading-none">{item.name}</div>
                      </div>
                      <p className="line-clamp-2 text-xs leading-snug text-hyve-text/70 group-hover:text-hyve-text-dark/70">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              )
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>

      {/* Insights Dropdown */}
      <NavigationMenuItem>
        <NavigationMenuTrigger className="font-body text-hyve-text hover:bg-hyve-content hover:text-hyve-text-dark">
          Insights
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="grid w-[400px] gap-3 p-4 bg-hyve-background">
            {insightsItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <NavigationMenuLink asChild>
                    <a
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200",
                        "hover:bg-hyve-content hover:text-hyve-text-dark focus:bg-hyve-content focus:text-hyve-text-dark",
                        "group hover:scale-[1.02]"
                      )}
                      href={item.href}
                    >
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-hyve-interactive/20 group-hover:bg-hyve-interactive/30 transition-colors">
                          <Icon className="h-4 w-4 text-hyve-text group-hover:text-hyve-text-dark" />
                        </div>
                        <div className="text-sm font-medium leading-none">{item.name}</div>
                      </div>
                      <p className="line-clamp-2 text-xs leading-snug text-hyve-text/70 group-hover:text-hyve-text-dark/70">
                        {item.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              )
            })}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)

// Mobile Navigation
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [insightsOpen, setInsightsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-hyve-content"
          >
            <Menu className="h-5 w-5 text-hyve-text" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] bg-hyve-background">
          <SheetHeader>
            <SheetTitle>
              <Logo />
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-8">
            {/* Home */}
            <a
              href="/"
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                "hover:bg-hyve-content hover:text-hyve-text-dark",
                "font-body text-hyve-text"
              )}
            >
              Home
            </a>

            {/* Haptic Matrix */}
            <a
              href="/haptic-matrix"
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                "hover:bg-hyve-content hover:text-hyve-text-dark",
                "font-body text-hyve-text"
              )}
            >
              Haptic Matrix
            </a>

            {/* Vision */}
            <a
              href="#vision"
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                "hover:bg-hyve-content hover:text-hyve-text-dark",
                "font-body text-hyve-text"
              )}
            >
              Vision
            </a>

            {/* Industries Dropdown */}
            <div>
              <button
                onClick={() => setIndustriesOpen(!industriesOpen)}
                className={cn(
                  "w-full text-lg font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-between",
                  "hover:bg-hyve-content hover:text-hyve-text-dark",
                  "font-body text-hyve-text"
                )}
              >
                Industries
                <ChevronRight className={cn("h-4 w-4 transition-transform", industriesOpen && "rotate-90")} />
              </button>
              {industriesOpen && (
                <div className="mt-2 space-y-1 pl-4">
                  {industriesItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-2 text-sm py-2 px-4 rounded-md transition-colors",
                          "hover:bg-hyve-content hover:text-hyve-text-dark",
                          "font-body text-hyve-text/80"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Insights Dropdown */}
            <div>
              <button
                onClick={() => setInsightsOpen(!insightsOpen)}
                className={cn(
                  "w-full text-lg font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-between",
                  "hover:bg-hyve-content hover:text-hyve-text-dark",
                  "font-body text-hyve-text"
                )}
              >
                Insights
                <ChevronRight className={cn("h-4 w-4 transition-transform", insightsOpen && "rotate-90")} />
              </button>
              {insightsOpen && (
                <div className="mt-2 space-y-1 pl-4">
                  {insightsItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-2 text-sm py-2 px-4 rounded-md transition-colors",
                          "hover:bg-hyve-content hover:text-hyve-text-dark",
                          "font-body text-hyve-text/80"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.name}
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// Main Header Component
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled 
          ? "bg-hyve-background/95 backdrop-blur-md shadow-hyve border-b border-hyve-content" 
          : "bg-hyve-background/80 backdrop-blur-sm"
      )}
    >
      <div className="hyve-container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/" className="flex items-center space-x-2">
              <Logo />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </motion.header>
  )
} 