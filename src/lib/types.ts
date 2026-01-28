export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface InvoiceSender {
    name: string;
    address: string;
    email: string;
    logo?: string;
}

export interface InvoiceClient {
    name: string;
    address: string;
    email: string;
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    date: string;
    dueDate: string;

    sender: InvoiceSender;
    client: InvoiceClient;

    items: InvoiceItem[];

    subtotal: number;
    taxRate: number;
    taxAmount: number;
    discountRate: number;
    discountAmount: number;
    total: number;

    currency: string;
    notes: string;
    terms: string;
}

export const ACESSIBLE_CURRENCIES = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'EUR', symbol: '€', label: 'Euro' },
    { code: 'GBP', symbol: '£', label: 'British Pound' },
];

export const DEFAULT_INVOICE: Invoice = {
    id: '', // Generated on save or init
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    sender: {
        name: '',
        address: '',
        email: '',
    },
    client: {
        name: '',
        address: '',
        email: '',
    },
    items: [
        { id: '1', description: 'Web Development Services', quantity: 1, rate: 100, amount: 100 }
    ],
    subtotal: 100,
    taxRate: 0,
    taxAmount: 0,
    discountRate: 0,
    discountAmount: 0,
    total: 100,
    currency: 'USD',
    notes: 'Thank you for your business!',
    terms: 'Payment due within 14 days.',
};
