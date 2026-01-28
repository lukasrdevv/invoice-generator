import { useRef } from 'react';
import { DashboardShell } from './components/layout/DashboardShell';
import { InvoiceForm } from './components/invoice/InvoiceForm';
import { InvoicePreview } from './components/invoice/InvoicePreview';
import { useInvoice } from './hooks/useInvoice';
import { usePDF } from './hooks/usePDF';
import { Download, Save } from 'lucide-react';

function App() {
  const invoiceData = useInvoice();
  const { generatePDF, isGenerating } = usePDF();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (previewRef.current) {
      generatePDF(previewRef.current, `Invoice-${invoiceData.invoice.invoiceNumber}.pdf`);
    }
  };

  return (
    <DashboardShell>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">New Invoice</h1>
          <p className="text-muted-foreground">Create and manage your professional invoices.</p>
        </div>
        <div className="flex gap-3">
          <button className="hidden cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-surface px-4 py-2 font-medium text-white transition hover:bg-surface-hover sm:flex">
            <Save size={18} />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-4 py-2 font-medium text-white shadow-lg shadow-primary/20 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Download size={18} />
            <span>{isGenerating ? 'Generating...' : 'Download PDF'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Editor Form */}
        <div className="space-y-6">
          <InvoiceForm data={invoiceData} />
        </div>

        {/* Preview Panel */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:h-fit">
          <div className="rounded-xl border border-white/5 bg-surface/50 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Live Preview</h2>
              <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-500">Auto-saved</span>
            </div>

            {/* Preview Container 
                 - Mobile: Horizontal scroll if needed
                 - Desktop: Scaled to fit
             */}
            <div className="w-full overflow-hidden rounded-lg bg-gray-100 shadow-2xl ring-1 ring-white/10">
              <div className="overflow-x-auto lg:origin-top lg:scale-[0.6] lg:overflow-visible">
                <div className="min-w-[800px] lg:min-w-0">
                  <InvoicePreview ref={previewRef} invoice={invoiceData.invoice} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

export default App;
