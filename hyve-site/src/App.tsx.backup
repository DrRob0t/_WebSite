import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center"
      >
        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          Tech Stack Test
        </motion.h1>
        
        <div className="space-y-4 mb-6">
          <p className="text-gray-600">✅ <strong>Tailwind CSS 3.4.1</strong> - Styling & Layout</p>
          <p className="text-gray-600">✅ <strong>ShadCN UI</strong> - Component Library</p>
          <p className="text-gray-600">✅ <strong>Framer Motion 11.0.8</strong> - Animations</p>
        </div>

        <motion.div
          className="mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setCount((count) => count + 1)}
            className="w-full"
            size="lg"
          >
            Count is {count}
          </Button>
        </motion.div>

        <motion.p
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Click the button to test interactivity!
        </motion.p>
      </motion.div>
    </div>
  )
}

export default App
