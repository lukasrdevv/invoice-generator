import { useState, useEffect, useCallback } from 'react';
import { type Invoice, type InvoiceItem, DEFAULT_INVOICE } from '../lib/types';

const STORAGE_KEY = 'invoice_data_v1';

export function useInvoice() {
    const [invoice, setInvoice] = useState<Invoice>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_INVOICE;
    });

    // Persistence
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(invoice));
    }, [invoice]);

    // Calculation Logic
    const calculateTotals = useCallback((currentInvoice: Invoice): Invoice => {
        const subtotal = currentInvoice.items.reduce((acc, item) => acc + item.amount, 0);
        const taxAmount = subtotal * (currentInvoice.taxRate / 100);
        const discountAmount = subtotal * (currentInvoice.discountRate / 100);
        const total = subtotal + taxAmount - discountAmount;

        return {
            ...currentInvoice,
            subtotal,
            taxAmount,
            discountAmount,
            total,
        };
    }, []);

    // Actions
    const updateInvoiceField = <K extends keyof Invoice>(field: K, value: Invoice[K]) => {
        setInvoice((prev) => calculateTotals({ ...prev, [field]: value }));
    };

    const updateSender = (field: keyof Invoice['sender'], value: string) => {
        setInvoice((prev) => ({
            ...prev,
            sender: { ...prev.sender, [field]: value },
        }));
    };

    const updateClient = (field: keyof Invoice['client'], value: string) => {
        setInvoice((prev) => ({
            ...prev,
            client: { ...prev.client, [field]: value },
        }));
    };

    const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
        setInvoice((prev) => {
            const newItems = [...prev.items];
            const item = { ...newItems[index], [field]: value };

            // Auto-calc amount if qty or rate changes
            if (field === 'quantity' || field === 'rate') {
                item.amount = Number(item.quantity) * Number(item.rate);
            }

            newItems[index] = item;
            return calculateTotals({ ...prev, items: newItems });
        });
    };

    const addItem = () => {
        setInvoice((prev) => {
            const newItem: InvoiceItem = {
                id: crypto.randomUUID(),
                description: '',
                quantity: 1,
                rate: 0,
                amount: 0,
            };
            return calculateTotals({ ...prev, items: [...prev.items, newItem] });
        });
    };

    const removeItem = (index: number) => {
        setInvoice((prev) => {
            if (prev.items.length <= 1) return prev; // Keep at least one item
            const newItems = prev.items.filter((_, i) => i !== index);
            return calculateTotals({ ...prev, items: newItems });
        });
    };

    return {
        invoice,
        updateInvoiceField,
        updateSender,
        updateClient,
        updateItem,
        addItem,
        removeItem,
    };
}
