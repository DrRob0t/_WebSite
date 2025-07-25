// src/App.tsx - Hyve Dynamics with Header and Navigation
import { Layout } from "@/components/layout/Layout"
import { CustomMeshBackground } from "@/components/ui/CustomMeshBackground"

function App() {
  // 🎛️ EASY DISABLE: Set to false to disable mesh background
  const enableMeshBackground = true

  return (
    <Layout>
      <div className="min-h-screen relative">
        <CustomMeshBackground 
          enabled={enableMeshBackground}
          className="min-h-screen"
        >
          {/* Empty content area - just header and footer remain */}
          <div className="min-h-[60vh]" />
        </CustomMeshBackground>
      </div>
    </Layout>
  )
}

export default App
