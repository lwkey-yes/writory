import { PenTool } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <PenTool className="h-6 w-6 text-gray-600" />
            <span className="text-lg font-semibold text-gray-900">Writory</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-600">
            <p>&copy; 2024 Writory. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <Link to="/about" className="hover:text-gray-900 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;