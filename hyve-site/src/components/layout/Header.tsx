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
import { Menu, X } from "lucide-react"
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

// Navigation items
const navigationItems = [
  { name: "Section1", href: "#section1" },
  { name: "Section2", href: "#section2" },
  { name: "Section3", href: "#section3" },
  { name: "Section4", href: "#section4" },
]

// Desktop Navigation
const DesktopNavigation = () => (
  <NavigationMenu className="hidden lg:flex">
    <NavigationMenuList className="space-x-2">
      {navigationItems.map((item) => (
        <NavigationMenuItem key={item.name}>
          <NavigationMenuLink
            href={item.href}
            className={cn(
              "group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
              "hover:bg-hyve-content hover:text-hyve-text-dark focus:bg-hyve-content focus:text-hyve-text-dark focus:outline-none",
              "font-sans text-hyve-text", // Using Moto Sans as requested
              "disabled:pointer-events-none disabled:opacity-50"
            )}
          >
            {item.name}
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
)

// Mobile Navigation
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)

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
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium py-2 px-4 rounded-md transition-colors",
                  "hover:bg-hyve-content hover:text-hyve-text-dark",
                  "font-sans text-hyve-text" // Using Moto Sans
                )}
              >
                {item.name}
              </a>
            ))}
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