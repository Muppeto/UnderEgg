import { Compass, Heart, House, Plus, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-14 bg-white z-50 shadow-sm flex items-center justify-around px-2 border-t border-gray-200">
      <button className="flex flex-col items-center justify-center text-yellow-500">
        <House className="w-6 h-6" />
        <span className="text-xs mt-0.5">Início</span>
      </button>
      
      <button className="flex flex-col items-center justify-center text-gray-500">
        <Compass className="w-6 h-6" />
        <span className="text-xs mt-0.5">Explorar</span>
      </button>
      
      <button className="flex items-center justify-center bg-yellow-500 text-white rounded-full w-12 h-12 shadow-md">
        <Plus className="w-6 h-6" />
      </button>
      
      <button className="flex flex-col items-center justify-center text-gray-500">
        <Heart className="w-6 h-6" />
        <span className="text-xs mt-0.5">Curtidas</span>
      </button>
      
      <button className="flex flex-col items-center justify-center text-gray-500">
        <User className="w-6 h-6" />
        <span className="text-xs mt-0.5">Perfil</span>
      </button>
    </footer>
  );
}
