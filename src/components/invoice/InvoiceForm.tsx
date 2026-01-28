import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useInvoice } from '../../hooks/useInvoice';


// Helper type for props
type UseInvoiceReturn = ReturnType<typeof useInvoice>;

interface InvoiceFormProps {
    data: UseInvoiceReturn;
}

export function InvoiceForm({ data }: InvoiceFormProps) {
    const { invoice, updateSender, updateClient, updateInvoiceField, updateItem, addItem, removeItem } = data;

    return (
        <div className="flex flex-col gap-6">
            {/* Invoice Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="grid gap-2">
                        <Label>Invoice Number</Label>
                        <Input
                            value={invoice.invoiceNumber}
                            onChange={(e) => updateInvoiceField('invoiceNumber', e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Date</Label>
                        <Input
                            type="date"
                            value={invoice.date}
                            onChange={(e) => updateInvoiceField('date', e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Due Date</Label>
                        <Input
                            type="date"
                            value={invoice.dueDate}
                            onChange={(e) => updateInvoiceField('dueDate', e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Currency</Label>
                        {/* Simple select for MVP */}
                        <select
                            className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            value={invoice.currency}
                            onChange={(e) => updateInvoiceField('currency', e.target.value)}
                        >
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Sender & Client */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>From (Sender)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input value={invoice.sender.name} onChange={(e) => updateSender('name', e.target.value)} placeholder="Your Company" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input value={invoice.sender.email} onChange={(e) => updateSender('email', e.target.value)} placeholder="email@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input value={invoice.sender.address} onChange={(e) => updateSender('address', e.target.value)} placeholder="123 Street, City" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>To (Client)</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Client Name</Label>
                            <Input value={invoice.client.name} onChange={(e) => updateClient('name', e.target.value)} placeholder="Client Company" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input value={invoice.client.email} onChange={(e) => updateClient('email', e.target.value)} placeholder="client@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input value={invoice.client.address} onChange={(e) => updateClient('address', e.target.value)} placeholder="456 Client Rd" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Items */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Line Items</CardTitle>
                    <button
                        onClick={addItem}
                        className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
                    >
                        <Plus size={16} /> Add Item
                    </button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Header Row */}
                    <div className="hidden grid-cols-12 gap-4 text-sm font-medium text-muted-foreground md:grid">
                        <div className="col-span-6">Description</div>
                        <div className="col-span-2 text-right">Qty</div>
                        <div className="col-span-2 text-right">Rate</div>
                        <div className="col-span-2 text-right">Amount</div>
                    </div>

                    {invoice.items.map((item, index) => (
                        <div key={item.id} className="grid grid-cols-12 gap-2 md:gap-4">
                            <div className="col-span-12 md:col-span-6">
                                <Input
                                    value={item.description}
                                    onChange={(e) => updateItem(index, 'description', e.target.value)}
                                    placeholder="Description"
                                />
                            </div>
                            <div className="col-span-3 md:col-span-2">
                                <Input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                                    className="text-right"
                                    placeholder="Qty"
                                />
                            </div>
                            <div className="col-span-3 md:col-span-2">
                                <Input
                                    type="number"
                                    value={item.rate}
                                    onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
                                    className="text-right"
                                    placeholder="Rate"
                                />
                            </div>
                            <div className="col-span-3 flex items-center justify-end gap-2 md:col-span-2">
                                <span className="text-sm font-medium tabular-nums text-white">
                                    {/* Using Amount directly or calc? Hook updates amount. */}
                                    {item.amount.toFixed(2)}
                                </span>
                                <button
                                    onClick={() => removeItem(index)}
                                    className="ml-2 text-muted-foreground hover:text-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Notes */}
            <Card>
                <CardHeader>
                    <CardTitle>Notes & Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label>Notes</Label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            value={invoice.notes}
                            onChange={(e) => updateInvoiceField('notes', e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Terms</Label>
                        <textarea
                            className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            value={invoice.terms}
                            onChange={(e) => updateInvoiceField('terms', e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
