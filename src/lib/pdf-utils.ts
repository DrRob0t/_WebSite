import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

interface GeneratePDFOptions {
  elementId: string
  filename: string
  title?: string
  excludeSelectors?: string[]
}

/**
 * Generates a PDF from a DOM element
 * @param options - Configuration options for PDF generation
 */
export async function generatePDF(options: GeneratePDFOptions): Promise<void> {
  const { elementId, filename, title, excludeSelectors = [] } = options

  try {
    // Get the element to convert
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`)
    }

    // Temporarily hide elements we don't want in the PDF
    const hiddenElements: Array<{ element: HTMLElement; originalDisplay: string }> = []
    
    excludeSelectors.forEach(selector => {
      const elementsToHide = element.querySelectorAll(selector) as NodeListOf<HTMLElement>
      elementsToHide.forEach(el => {
        hiddenElements.push({
          element: el,
          originalDisplay: el.style.display
        })
        el.style.display = 'none'
      })
    })

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#F4F2F3', // Hyve background color
      logging: false,
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
    } as any)

    // Restore hidden elements
    hiddenElements.forEach(({ element, originalDisplay }) => {
      element.style.display = originalDisplay
    })

    // Calculate PDF dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // Add title if provided
    if (title) {
      pdf.setFontSize(16)
      pdf.setTextColor(42, 48, 60) // Hyve header color
      pdf.text(title, 20, 20)
      pdf.setFontSize(10)
      pdf.setTextColor(61, 70, 87) // Hyve text color
      pdf.text(`Generated on ${new Date().toLocaleDateString()}`, 20, 30)
      pdf.text('Confidential - For Authorized Recipients Only', 20, 275)
    }

    // Convert canvas to image and add to PDF
    const imgData = canvas.toDataURL('image/png')
    let position = title ? 40 : 0

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      // Add confidential footer to each page
      if (title) {
        pdf.setFontSize(10)
        pdf.setTextColor(61, 70, 87)
        pdf.text('Confidential - For Authorized Recipients Only', 20, 275)
      }
    }

    // Save the PDF
    pdf.save(filename)

  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Generates a newsletter PDF with Hyve Dynamics branding
 */
export async function generateNewsletterPDF(
  elementId: string, 
  newsletterTitle: string,
  date: string
): Promise<void> {
  const filename = `Hyve-Dynamics-${newsletterTitle.replace(/[^a-zA-Z0-9]/g, '-')}-${date}.pdf`
  
  await generatePDF({
    elementId,
    filename,
    title: `Hyve Dynamics - ${newsletterTitle}`,
    excludeSelectors: [
      '[data-exclude-from-pdf]', // Generic exclusion selector
      '.no-print', // Standard no-print class
      'button', // Exclude all buttons
      '.scroll-to-top', // Scroll to top button
      'header', // Main header
      'nav', // Navigation
      '.back-navigation', // Back links
    ]
  })
}
