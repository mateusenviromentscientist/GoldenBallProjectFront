import { useState } from 'react';
import { Trophy, LayoutDashboard, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <Trophy size={16} className="text-gray-900" />
          </div>
          <span className="font-bold text-gray-100 tracking-tight">Golden Ball</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 p-1"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-1" aria-label="Main navigation">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              isActive
                ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`
          }
          onClick={onClose}
          aria-label="Winners Table"
        >
          <LayoutDashboard size={16} />
          Winners Table
        </NavLink>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <p className="text-xs text-gray-600 text-center">Golden Ball Award</p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-60 shrink-0 border-r border-gray-800 bg-gray-950 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
            <Trophy size={13} className="text-gray-900" />
          </div>
          <span className="font-bold text-sm text-gray-100">Golden Ball</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800 rounded-lg transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Mobile navigation"
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </aside>
    </>
  );
}
