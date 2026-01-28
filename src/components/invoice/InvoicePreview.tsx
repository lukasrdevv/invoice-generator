import { forwardRef } from 'react';
import type { Invoice } from '../../lib/types';
import { formatCurrency } from '../../lib/utils';
// import { cn } from '../../lib/utils'; // Usage if needed

interface InvoicePreviewProps {
    invoice: Invoice;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(({ invoice }, ref) => {
    return (
        <div className="flex w-full justify-center bg-[#f3f4f6] p-8">
            {/* A4 Paper Aspect Ratio Container */}
            <div
                ref={ref}
                className="aspect-[210/297] w-full max-w-[800px] bg-[#ffffff] p-12 text-[#000000] shadow-lg"
                style={{ minHeight: '1123px' }} // Approximate A4 height @ 96 DPI
            >
                {/* Header */}
                <div className="mb-8 flex justify-between border-b border-[#e5e7eb] pb-8">
                    <div>
                        <h1 className="text-4xl font-bold uppercase tracking-wide text-[#1f2937]">Invoice</h1>
                        <div className="mt-2 text-[#4b5563]">#{invoice.invoiceNumber}</div>
                    </div>
                    <div className="text-right">
                        {invoice.sender.logo && <img src={invoice.sender.logo} alt="Logo" className="mb-2 h-12 w-auto object-contain" />}
                        <div className="font-bold text-[#1f2937]">{invoice.sender.name || 'Sender Name'}</div>
                        <div className="whitespace-pre-line text-sm text-[#4b5563]">{invoice.sender.address}</div>
                        <div className="text-sm text-[#4b5563]">{invoice.sender.email}</div>
                    </div>
                </div>

                {/* Details Row */}
                <div className="mb-8 flex justify-between">
                    <div>
                        <h3 className="mb-2 text-sm font-bold uppercase text-[#6b7280]">Bill To:</h3>
                        <div className="font-bold text-[#1f2937]">{invoice.client.name || 'Client Name'}</div>
                        <div className="whitespace-pre-line text-sm text-[#4b5563]">{invoice.client.address}</div>
                        <div className="text-sm text-[#4b5563]">{invoice.client.email}</div>
                    </div>
                    <div className="text-right">
                        <div className="mb-1">
                            <span className="text-sm font-bold text-[#6b7280]">Date:</span>
                            <span className="ml-4 font-medium">{invoice.date}</span>
                        </div>
                        <div>
                            <span className="text-sm font-bold text-[#6b7280]">Due Date:</span>
                            <span className="ml-4 font-medium">{invoice.dueDate}</span>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <table className="mb-8 w-full text-left">
                    <thead>
                        <tr className="border-b-2 border-[#e5e7eb]">
                            <th className="py-2 text-sm font-bold uppercase text-[#4b5563]">Description</th>
                            <th className="py-2 text-right text-sm font-bold uppercase text-[#4b5563]">Qty</th>
                            <th className="py-2 text-right text-sm font-bold uppercase text-[#4b5563]">Rate</th>
                            <th className="py-2 text-right text-sm font-bold uppercase text-[#4b5563]">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item) => (
                            <tr key={item.id} className="border-b border-[#f3f4f6] last:border-0">
                                <td className="py-3">{item.description || 'Item description'}</td>
                                <td className="py-3 text-right">{item.quantity}</td>
                                <td className="py-3 text-right">{formatCurrency(item.rate, invoice.currency)}</td>
                                <td className="py-3 text-right font-medium">{formatCurrency(item.amount, invoice.currency)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end">
                    <div className="w-1/2">
                        <div className="flex justify-between border-b border-[#f3f4f6] py-2 text-[#4b5563]">
                            <span>Subtotal</span>
                            <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
                        </div>
                        {/* Tax & Discount placeholders - logic is in hook but UI can hide if 0 */}
                        {invoice.taxRate > 0 && (
                            <div className="flex justify-between border-b border-[#f3f4f6] py-2 text-[#4b5563]">
                                <span>Tax ({invoice.taxRate}%)</span>
                                <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
                            </div>
                        )}
                        {invoice.discountRate > 0 && (
                            <div className="flex justify-between border-b border-[#f3f4f6] py-2 text-[#4b5563]">
                                <span>Discount ({invoice.discountRate}%)</span>
                                <span>-{formatCurrency(invoice.discountAmount, invoice.currency)}</span>
                            </div>
                        )}
                        <div className="flex justify-between border-b border-[#1f2937] py-2 text-xl font-bold text-[#111827]">
                            <span>Total</span>
                            <span>{formatCurrency(invoice.total, invoice.currency)}</span>
                        </div>
                    </div>
                </div>

                {/* Notes & Terms */}
                <div className="mt-12 border-t border-[#e5e7eb] pt-8">
                    {invoice.notes && (
                        <div className="mb-6">
                            <h3 className="mb-2 text-sm font-bold uppercase text-[#6b7280]">Notes</h3>
                            <p className="text-sm text-[#4b5563]">{invoice.notes}</p>
                        </div>
                    )}
                    {invoice.terms && (
                        <div>
                            <h3 className="mb-2 text-sm font-bold uppercase text-[#6b7280]">Terms</h3>
                            <p className="text-sm text-[#4b5563]">{invoice.terms}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

InvoicePreview.displayName = 'InvoicePreview';
