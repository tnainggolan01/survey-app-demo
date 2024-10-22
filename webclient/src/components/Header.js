import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, FileSpreadsheet, Menu, X } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path ? "text-blue-600" : "text-gray-600";
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="w-full px-4 overflow-x-auto">
        <div className="flex items-center h-16">
          {/* Logo and App Name - Taking up 1/4 of the space */}
          <div className="w-1/4">
            <Link href="/" className="flex items-center">
              <span className="text-blue-600 text-2xl font-bold">Care</span>
              <span className="text-gray-800 text-2xl font-bold">Quest</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centered in the middle 1/2 of the space */}
          <nav className="flex justify-center items-center w-1/2 space-x-8">
            <Link
              href="/"
              className={`hidden md:flex items-center space-x-1 ${isActive(
                "/"
              )} hover:text-blue-500 transition-colors`}
            >
              <ClipboardList size={20} />
              <span>Questionnaires</span>
            </Link>
            <Link
              href="/response/list"
              className={`hidden md:flex items-center space-x-1 ${isActive(
                "/response/list"
              )} hover:text-blue-500 transition-colors`}
            >
              <FileSpreadsheet size={20} />
              <span>Responses</span>
            </Link>
          </nav>

          {/* Empty space for the last 1/4 */}
          <div className="w-1/4 flex justify-end md:justify-end">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`flex items-center space-x-2 ${isActive(
                  "/"
                )} hover:text-blue-500 transition-colors p-2 rounded-lg`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ClipboardList size={20} />
                <span>Questionnaires</span>
              </Link>
              <Link
                href="/response/list"
                className={`flex items-center space-x-2 ${isActive(
                  "/response/list"
                )} hover:text-blue-500 transition-colors p-2 rounded-lg`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileSpreadsheet size={20} />
                <span>Responses</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
