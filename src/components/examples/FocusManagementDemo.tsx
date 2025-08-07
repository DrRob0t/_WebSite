import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

/**
 * Demo component showcasing proper focus management
 * This can be used for testing and documentation purposes
 */
export const FocusManagementDemo = () => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success(`Hello, ${name}!`)
    setOpen(false)
    setName('')
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Focus Management Demo</h2>

      <div className="space-y-4">
        <p className="text-gray-600">
          Try navigating with keyboard only (Tab, Shift+Tab, Escape, Enter)
        </p>

        {/* Dialog with proper focus management */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog (Press Enter)</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Focus Management Example</DialogTitle>
              <DialogDescription>
                Focus is trapped within this dialog. Press Tab to navigate, Escape to close.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="demo-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="demo-name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="col-span-3"
                    placeholder="Enter your name"
                    autoFocus // First input gets focus
                  />
                </div>

                <div className="text-sm text-gray-600 p-2 border rounded">
                  <p>Keyboard shortcuts:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>Tab: Next element</li>
                    <li>Shift+Tab: Previous element</li>
                    <li>Escape: Close dialog</li>
                    <li>Enter: Submit form</li>
                  </ul>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel (Esc)
                </Button>
                <Button type="submit">Submit (Enter)</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Additional focusable elements to test focus restoration */}
        <div className="flex gap-4">
          <Button variant="outline">Before Dialog</Button>
          <Button variant="outline">After Dialog</Button>
        </div>

        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Testing Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click "Before Dialog" button</li>
            <li>Press Tab to focus "Open Dialog" button</li>
            <li>Press Enter to open dialog</li>
            <li>Notice focus moves to the Name input</li>
            <li>Press Tab to cycle through dialog elements</li>
            <li>Press Escape to close dialog</li>
            <li>Notice focus returns to "Open Dialog" button</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
