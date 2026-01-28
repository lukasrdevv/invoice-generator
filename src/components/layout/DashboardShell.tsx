import type { ReactNode } from 'react';
import { LayoutDashboard, FileText, Settings, Plus, Command, Bell, Search } from 'lucide-react';
import { cn } from '../../lib/utils';

interface DashboardShellProps {
    children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-background text-white selection:bg-primary/30">
            {/* Sidebar - Glassmorphism */}
            <aside className="hidden w-64 flex-col border-r border-white/5 bg-surface/50 backdrop-blur-xl md:flex">
                <div className="flex h-16 items-center border-b border-white/5 px-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/40">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-display text-lg font-bold tracking-tight">InvoicePro</span>
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-1 p-4">
                    <div className="mb-2 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Menu
                    </div>
                    <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                    <NavItem icon={<FileText size={18} />} label="Invoices" />
                    <NavItem icon={<Settings size={18} />} label="Settings" />
                </div>

                <div className="border-t border-white/5 p-4">
                    <button className="flex w-full items-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition hover:bg-primary/20">
                        <Plus size={18} />
                        <span>New Invoice</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b border-white/5 bg-surface/30 px-6 backdrop-blur-md">
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <Command size={18} />
                        <span className="text-sm">Cmd + K to search...</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="rounded-full bg-white/5 p-2 text-muted-foreground hover:text-white">
                            <Search size={18} />
                        </button>
                        <button className="rounded-full bg-white/5 p-2 text-muted-foreground hover:text-white">
                            <Bell size={18} />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 ring-2 ring-white/10" />
                    </div>
                </header>

                {/* Scrollable Area */}
                <main className="flex-1 overflow-y-auto bg-background p-6 md:p-8">
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

function NavItem({ icon, label, active = false }: { icon: ReactNode; label: string; active?: boolean }) {
    return (
        <button
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                active
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
