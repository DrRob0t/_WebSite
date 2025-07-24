// src/App.tsx - Hyve Dynamics with Header and Navigation
import { Layout } from "@/components/layout/Layout"
import { Button } from "@/components/ui/button"
import { CustomMeshBackground } from "@/components/ui/CustomMeshBackground"
import { motion } from "framer-motion"

function App() {
  // 🎛️ EASY DISABLE: Set to false to disable mesh background
  const enableMeshBackground = true

  return (
    <Layout>
      <CustomMeshBackground 
        enabled={enableMeshBackground}
        className="min-h-screen"
      >
          <div className="relative z-10 hyve-container hyve-section pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }} // Delay to let header animate first
          className="max-w-4xl mx-auto text-center"
        >
          {/* Test the header integration */}
          <div className="hyve-ui-text text-hyve-accent mb-4">WELCOME TO HYVE DYNAMICS</div>
          
                     <h1 className="hyve-hero-text mb-6">
             Custom Mesh Grid{" "}
             <span className="hyve-text-gradient">Successfully Integrated</span>
           </h1>
           
           <p className="hyve-body-text mb-8 max-w-2xl mx-auto">
             Beautiful perspective mesh grid with gentle wave motion. 
             Like a virtual ground extending to the horizon with organized, non-chaotic patterns.
           </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="hyve-btn-primary">
                Explore Sections
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="hyve-btn-secondary">
                View Mobile Menu
              </Button>
            </motion.div>
          </div>

          {/* Test sections for navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <motion.section
              id="section1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="hyve-card"
            >
              <h3 className="hyve-section-title">Section 1</h3>
              <p className="hyve-body-text">This is placeholder content for Section 1. Click the navigation link to scroll here.</p>
            </motion.section>

            <motion.section
              id="section2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="hyve-card"
            >
              <h3 className="hyve-section-title">Section 2</h3>
              <p className="hyve-body-text">This is placeholder content for Section 2. Test the responsive navigation across different screen sizes.</p>
            </motion.section>

            <motion.section
              id="section3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="hyve-card"
            >
              <h3 className="hyve-section-title">Section 3</h3>
              <p className="hyve-body-text">This is placeholder content for Section 3. The header uses a sticky design with scroll effects.</p>
            </motion.section>

            <motion.section
              id="section4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="hyve-card"
            >
              <h3 className="hyve-section-title">Section 4</h3>
              <p className="hyve-body-text">This is placeholder content for Section 4. All navigation uses the Moto Sans font as specified.</p>
            </motion.section>
          </div>

          {/* Header features showcase */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="hyve-card text-center">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-heading font-bold text-hyve-header mb-2">Responsive Design</h4>
              <p className="text-sm text-hyve-text">Adapts perfectly to all screen sizes with mobile menu</p>
            </div>
            
            <div className="hyve-card text-center">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-heading font-bold text-hyve-header mb-2">Hyve Branding</h4>
              <p className="text-sm text-hyve-text">Fully integrated with Hyve color palette and typography</p>
            </div>
            
                         <div className="hyve-card text-center">
               <div className="text-2xl mb-2">🌐</div>
               <h4 className="font-heading font-bold text-hyve-header mb-2">Custom Mesh Grid</h4>
               <p className="text-sm text-hyve-text">Perspective grid with gentle wave motion extending to horizon</p>
             </div>
                     </motion.div>
         </motion.div>
                       </div>
        </CustomMeshBackground>
      </Layout>
    )
  }

export default App
