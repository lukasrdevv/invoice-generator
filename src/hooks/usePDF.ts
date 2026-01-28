import { useState } from 'react';
import html2canvas from 'html2canvas';
import { PDFDocument } from 'pdf-lib';

interface UsePDFReturn {
    generatePDF: (element: HTMLElement | null, fileName?: string) => Promise<void>;
    isGenerating: boolean;
}

export function usePDF(): UsePDFReturn {
    const [isGenerating, setIsGenerating] = useState(false);

    const generatePDF = async (element: HTMLElement | null, fileName = 'invoice.pdf') => {
        if (!element) return;

        try {
            setIsGenerating(true);

            // 1. Capture the element as a canvas (high quality)
            const canvas = await html2canvas(element, {
                scale: 2, // High resolution
                useCORS: true, // Handle images if any
                logging: false,
                backgroundColor: '#ffffff', // Ensure white background for print
            });

            // 2. Convert to PNG data URL
            const imgData = canvas.toDataURL('image/png');

            // 3. Create a new PDF document using pdf-lib
            const pdfDoc = await PDFDocument.create();

            // Calculate dimensions (A4 size matches usually)
            // A4 is 595.28 x 841.89 points
            const pageWidth = 595.28;
            const pageHeight = 841.89;

            const page = pdfDoc.addPage([pageWidth, pageHeight]);

            // Embed the image
            const pngImage = await pdfDoc.embedPng(imgData);

            // Fit image into the page (maintain aspect ratio)
            const pngDims = pngImage.scaleToFit(pageWidth, pageHeight);

            // Draw the image centered
            page.drawImage(pngImage, {
                x: (pageWidth - pngDims.width) / 2, // Center horizontally
                y: pageHeight - pngDims.height, // Align to top
                width: pngDims.width,
                height: pngDims.height,
            });

            // 4. Save and Download
            const pdfBytes = await pdfDoc.save();

            // Create a blob and trigger download
            // Fixed: Cast pdfBytes to any (or BlobPart) to avoid strict TS error with Uint8Array vs SharedArrayBuffer
            const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Failed to generate PDF:', error);
            alert('Failed to generate PDF. Check console for details.');
        } finally {
            setIsGenerating(false);
        }
    };

    return { generatePDF, isGenerating };
}
