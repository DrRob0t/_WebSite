// src/App.tsx - Hyve Dynamics Brand Test
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

function App() {
  return (
    <div className="min-h-screen bg-hyve-background">
      {/* Background gradient matching Hyve brand */}
      <div className="absolute inset-0 bg-gradient-hyve opacity-60" />
      
      <div className="relative z-10 hyve-container hyve-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Test the custom fonts and colors */}
          <div className="hyve-ui-text text-hyve-accent mb-4">OUR VISION</div>
          
          <h1 className="hyve-hero-text mb-6">
            Transforming Industries Through{" "}
            <span className="hyve-text-gradient">Real-World Intelligence</span>
          </h1>
          
          <p className="hyve-body-text mb-8 max-w-2xl mx-auto">
            Hyve Dynamics envisions a future where real-world data replaces assumptions, 
            enabling smarter, more sustainable, and more efficient technological advancements.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="hyve-btn-primary">
                Discover Our Technology
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="hyve-btn-secondary">
                View Industries
              </Button>
            </motion.div>
          </div>
          
          {/* Color palette showcase */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-2xl mx-auto mb-12">
            <div className="hyve-card text-center">
              <div className="h-16 bg-hyve-background rounded-lg mb-2 border-2 border-hyve-content"></div>
              <p className="text-xs font-sans">Background</p>
              <p className="text-xs text-hyve-text">#F4F2F3</p>
            </div>
            
            <div className="hyve-card text-center">
              <div className="h-16 bg-hyve-content rounded-lg mb-2"></div>
              <p className="text-xs font-sans">Content</p>
              <p className="text-xs text-hyve-text">#CDE2E7</p>
            </div>
            
            <div className="hyve-card text-center">
              <div className="h-16 bg-hyve-accent rounded-lg mb-2"></div>
              <p className="text-xs font-sans">Accent</p>
              <p className="text-xs text-hyve-text">#7FB3BE</p>
            </div>
            
            <div className="hyve-card text-center">
              <div className="h-16 bg-hyve-text rounded-lg mb-2"></div>
              <p className="text-xs font-sans">Text</p>
              <p className="text-xs text-hyve-text">#166088</p>
            </div>
            
            <div className="hyve-card text-center">
              <div className="h-16 bg-hyve-header rounded-lg mb-2"></div>
              <p className="text-xs font-sans">Header</p>
              <p className="text-xs text-hyve-text">#102542</p>
            </div>
          </div>
          
          {/* Font showcase */}
          <div className="text-left max-w-2xl mx-auto hyve-card">
            <h3 className="font-heading text-xl font-bold text-hyve-header mb-4">
              Font System Test
            </h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-heading text-2xl font-bold text-hyve-header">
                  Peach Classy Heading Font
                </h4>
                <p className="text-xs text-hyve-text">Used for: Main headings, hero titles</p>
              </div>
              
              <div>
                <p className="font-body text-hyve-text">
                  Poppins body font provides excellent readability for longer content sections and descriptions.
                </p>
                <p className="text-xs text-hyve-text">Used for: Body text, descriptions</p>
              </div>
              
              <div>
                <span className="font-sans text-sm font-medium text-hyve-text uppercase tracking-wide">
                  MOTO SANS UI ELEMENTS
                </span>
                <p className="text-xs text-hyve-text">Used for: Navigation, buttons, badges</p>
              </div>
            </div>
          </div>

          {/* Installation success indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="hyve-card text-center">
              <div className="text-2xl mb-2">✅</div>
              <h4 className="font-heading font-bold text-hyve-header mb-2">Brand Colors</h4>
              <p className="text-sm text-hyve-text">Complete Hyve palette integrated</p>
            </div>
            
            <div className="hyve-card text-center">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-heading font-bold text-hyve-header mb-2">Custom Fonts</h4>
              <p className="text-sm text-hyve-text">Poppins loaded, fallbacks ready</p>
            </div>
            
            <div className="hyve-card text-center">
              <div className="text-2xl mb-2">🚀</div>
              <h4 className="font-heading font-bold text-hyve-header mb-2">Components</h4>
              <p className="text-sm text-hyve-text">ShadCN UI + Framer Motion + Vanta ready</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
