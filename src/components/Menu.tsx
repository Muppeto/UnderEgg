import { useState, useRef, useEffect } from 'react';
import { CircleHelp, House, LogOut, MessageSquare, Moon, Plus, Settings, TrendingUp, Users } from 'lucide-react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  onCreatePost: () => void;
  userProfile: any;
}

export default function Menu({ isOpen, onClose, onNavigate, onCreatePost, userProfile }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Mock frequent contacts
  const frequentContacts = [
    { id: 'c1', name: 'Carlos', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 'c2', name: 'Márcia', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 'c3', name: 'Pedro', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 'c4', name: 'Ana', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 'c5', name: 'Luis', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex">
      <div 
        ref={menuRef}
        className="bg-gray-900 w-72 h-full p-4 animate-slide-in"
        style={{ animationDuration: '0.2s' }}
      >
        {/* App name at top */}
        <div className="flex justify-center mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent">
            DeezX
          </h1>
        </div>
        
        {/* User profile and create button centered */}
        <div className="flex flex-col items-center mb-5">
          <button 
            onClick={() => handleNavigate('profile')}
            className="w-20 h-20 rounded-full overflow-hidden border-2 border-gradient-primary shadow-lg shadow-purple-500/20 transition-transform hover:scale-105 mb-4"
          >
            <img 
              src={userProfile.avatar}
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </button>
          
          <button 
            onClick={() => {
              onCreatePost();
              onClose();
            }}
            className="bg-transparent text-white py-2.5 px-6 rounded-full flex items-center border border-white/20 hover:bg-white/10 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span>Criar</span>
          </button>
        </div>
        
        {/* Frequent contacts */}
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {frequentContacts.map(contact => (
            <button key={contact.id} className="flex flex-col items-center mr-4 min-w-[52px]">
              <div className="w-10 h-10 rounded-full overflow-hidden mb-1 border border-gray-700">
                <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-gray-400 truncate w-full text-center">{contact.name}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <button 
              onClick={() => handleNavigate('home')}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-left"
            >
              <House className="w-5 h-5 mr-3 text-white" />
              <span className="text-sm">Início</span>
            </button>
            <button 
              onClick={() => handleNavigate('trending')}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-left"
            >
              <TrendingUp className="w-5 h-5 mr-3 text-red-500" />
              <span className="text-sm">Em Alta</span>
            </button>
            <button 
              onClick={() => handleNavigate('following')}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-left"
            >
              <Users className="w-5 h-5 mr-3 text-blue-500" />
              <span className="text-sm">Seguindo</span>
            </button>
            <button 
              onClick={() => handleNavigate('messages')}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-left"
            >
              <MessageSquare className="w-5 h-5 mr-3 text-purple-500" />
              <span className="text-sm">Mensagens</span>
            </button>
          </div>
          
          <div className="pt-3 border-t border-gray-800 space-y-1">
            <button 
              onClick={() => handleNavigate('settings')}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-left"
            >
              <Settings className="w-5 h-5 mr-3 text-gray-400" />
              <span className="text-sm">Configurações</span>
            </button>
            <button 
              onClick={() => handleNavigate('theme')}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-left"
            >
              <Moon className="w-5 h-5 mr-3 text-indigo-400" />
              <span className="text-sm">Tema</span>
            </button>
            <button 
              onClick={() => handleNavigate('help')}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-left"
            >
              <CircleHelp className="w-5 h-5 mr-3 text-teal-400" />
              <span className="text-sm">Ajuda</span>
            </button>
          </div>
          
          <div className="pt-3 border-t border-gray-800">
            <button 
              onClick={() => handleNavigate('logout')}
              className="w-full flex items-center p-2 rounded-lg hover:bg-gray-800 text-left text-red-400"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
