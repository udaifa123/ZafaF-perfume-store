import React from "react";
import { Heart } from "lucide-react";

export default function AdminFooter() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400">
      <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
        {/* LEFT */}
        <p className="text-sm">
          © {new Date().getFullYear()} ZafaF Admin Panel. All rights reserved.
        </p>

        {/* RIGHT */}
        <p className="text-sm flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in
          India
        </p>
      </div>
    </footer>
  );
}
