import { Bell, Menu, Search } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  currentPage: string;
  onNotification: () => void;
  onExplore: () => void;
}

export default function Header({ onMenuToggle, currentPage, onNotification, onExplore }: HeaderProps) {
  const [notificationCount, setNotificationCount] = useState(2);
  const [searchVisible, setSearchVisible] = useState(false);
  
  const handleNotificationClick = () => {
    setNotificationCount(0);
    onNotification();
  };

  const getPageColor = () => {
    switch(currentPage) {
      case 'início':
        return '';
      case 'em alta':
        return 'text-red-500';
      case 'seguindo':
        return 'text-blue-500';
      case 'mensagens':
        return 'text-purple-500';
      case 'configurações':
        return 'text-gray-400';
      case 'tema':
        return 'text-indigo-400';
      case 'ajuda':
        return 'text-teal-400';
      case 'perfil':
        return '';
      default:
        return 'text-white';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-gray-900 z-50 border-b border-gray-800 flex items-center justify-between px-4">
      <div className="flex items-center">
        <button onClick={onMenuToggle} className="hover:bg-gray-800 p-1 rounded-full">
          <Menu className="w-6 h-6 text-gray-300" />
        </button>
        {currentPage === 'início' || currentPage === 'perfil' ? (
          <h2 className="ml-4 text-lg font-semibold capitalize bg-gradient-to-r from-purple-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent">
            {currentPage === 'início' ? 'DeezX' : 'Perfil'}
          </h2>
        ) : (
          <h2 className={`ml-4 text-lg font-semibold capitalize ${getPageColor()}`}>
            {currentPage}
          </h2>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="text-gray-300 hover:bg-gray-800 p-1 rounded-full" onClick={onExplore}>
          <Search className="w-6 h-6" />
        </button>
        <button 
          className="relative hover:bg-gray-800 p-1 rounded-full" 
          onClick={handleNotificationClick}
        >
          <Bell className="w-6 h-6 text-gray-300" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
