import { Header } from "./Header"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-hyve-background">
      <Header />
      <main className="relative">
        {children}
      </main>
    </div>
  )
} 