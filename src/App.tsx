import { useEffect, useState } from 'react';
import './index.css'
import Header from './components/Header';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Menu from './components/Menu';
import CreatePostModal from './components/CreatePostModal';
import ShareModal from './components/ShareModal';
import { usePosts } from './hooks/usePosts';
import { Post as PostType } from './types';
import Messages from './components/Messages';

export function App() {
  const [currentPage, setCurrentPage] = useState('início');
  const [currentTheme, setCurrentTheme] = useState('theme-dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [createPostModalOpen, setCreatePostModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [exploreModalOpen, setExploreModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const { posts, addPost } = usePosts();
  const [userProfile, setUserProfile] = useState({
    displayName: 'Meme Master',
    email: 'usuario@email.com',
    username: 'memezada',
    frame: 0, // 0-4 for different frames
    avatar: 'https://i.pravatar.cc/150?img=11',
    banner: 'https://picsum.photos/id/1076/1000/300'
  });

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      // Clean up
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    // Apply theme to body
    document.body.className = currentTheme;
  }, [currentTheme]);

  const handleCreatePost = (newPost: PostType) => {
    setIsPublishing(true);
    
    // Simulate publishing delay
    setTimeout(() => {
      addPost(newPost);
      setIsPublishing(false);
      setPublishSuccess(true);
      
      // Close success message after 2 seconds
      setTimeout(() => {
        setPublishSuccess(false);
        setCreatePostModalOpen(false);
        setCurrentPage('início');
      }, 2000);
    }, 1500);
  };

  const handleNavigate = (page: string) => {
    switch(page) {
      case 'home':
        setCurrentPage('início');
        break;
      case 'profile':
        setCurrentPage('perfil');
        break;
      case 'trending':
        setCurrentPage('em alta');
        break;
      case 'following':
        setCurrentPage('seguindo');
        break;
      case 'messages':
        setCurrentPage('mensagens');
        break;
      case 'settings':
        setSettingsModalOpen(true);
        break;
      case 'theme':
        setCurrentPage('tema');
        break;
      case 'help':
        setCurrentPage('ajuda');
        break;
      case 'explore':
        setExploreModalOpen(true);
        break;
      default:
        setCurrentPage(page);
    }
  };

  const handleNotification = () => {
    setNotificationModalOpen(true);
  };

  const handleEditProfile = () => {
    setEditProfileModalOpen(true);
  };

  const saveProfileChanges = (newProfile: any) => {
    setUserProfile({...userProfile, ...newProfile});
    setEditProfileModalOpen(false);
  };

  const handleShareModal = () => {
    setShareModalOpen(true);
  };

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
  };

  return (
    <div className={`flex flex-col h-screen bg-gray-900 ${currentTheme}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      <Header 
        onMenuToggle={() => setMenuOpen(true)} 
        currentPage={currentPage}
        onNotification={handleNotification}
        onExplore={() => setExploreModalOpen(true)}
      />
      
      <main className="flex-1 overflow-hidden pt-14">
        {currentPage === 'início' && <Feed />}
        {currentPage === 'perfil' && <Profile onEditProfile={handleEditProfile} userProfile={userProfile} />}
        {currentPage === 'mensagens' && <Messages />}
        {currentPage === 'tema' && (
          <div className="h-full overflow-y-auto p-4">
            <h2 className="text-xl font-bold mb-6">Escolha um tema</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleThemeChange('theme-dark')} 
                className={`p-4 rounded-lg ${currentTheme === 'theme-dark' ? 'border-2 border-purple-500' : 'border border-gray-700'}`}
              >
                <div className="h-32 bg-gradient-to-r from-purple-500 via-yellow-500 to-pink-500 rounded-lg mb-2"></div>
                <p className="font-medium">Padrão</p>
                <p className="text-sm text-gray-400">Tema roxo, amarelo e rosa</p>
              </button>
              
              <button 
                onClick={() => handleThemeChange('theme-neon')} 
                className={`p-4 rounded-lg ${currentTheme === 'theme-neon' ? 'border-2 border-cyan-500' : 'border border-gray-700'}`}
              >
                <div className="h-32 bg-gradient-to-r from-cyan-500 via-lime-500 to-yellow-500 rounded-lg mb-2"></div>
                <p className="font-medium">Neon</p>
                <p className="text-sm text-gray-400">Cores vibrantes e futuristas</p>
              </button>
              
              <button 
                onClick={() => handleThemeChange('theme-sunset')} 
                className={`p-4 rounded-lg ${currentTheme === 'theme-sunset' ? 'border-2 border-orange-500' : 'border border-gray-700'}`}
              >
                <div className="h-32 bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 rounded-lg mb-2"></div>
                <p className="font-medium">Pôr do Sol</p>
                <p className="text-sm text-gray-400">Tons quentes e aconchegantes</p>
              </button>
              
              <button 
                onClick={() => handleThemeChange('theme-ocean')} 
                className={`p-4 rounded-lg ${currentTheme === 'theme-ocean' ? 'border-2 border-blue-500' : 'border border-gray-700'}`}
              >
                <div className="h-32 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-lg mb-2"></div>
                <p className="font-medium">Oceano</p>
                <p className="text-sm text-gray-400">Tons de azul relaxantes</p>
              </button>
              
              <button 
                onClick={() => handleThemeChange('theme-monochrome')} 
                className={`p-4 rounded-lg ${currentTheme === 'theme-monochrome' ? 'border-2 border-gray-400' : 'border border-gray-700'}`}
              >
                <div className="h-32 bg-gradient-to-r from-gray-300 via-gray-500 to-gray-600 rounded-lg mb-2"></div>
                <p className="font-medium">Monocromático</p>
                <p className="text-sm text-gray-400">Elegante e minimalista</p>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Menu Modal */}
      <Menu 
        isOpen={menuOpen} 
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
        onCreatePost={() => setCreatePostModalOpen(true)}
        userProfile={userProfile}
      />

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={createPostModalOpen}
        onClose={() => setCreatePostModalOpen(false)}
        onCreatePost={handleCreatePost}
      />

      {/* Share Modal */}
      <ShareModal 
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />

      {/* Publishing Loader */}
      {isPublishing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg flex flex-col items-center">
            <div className="w-10 h-10 border-2 border-t-transparent border-purple-500 rounded-full animate-spinner mb-4"></div>
            <p className="text-lg">Publicando seu post...</p>
          </div>
        </div>
      )}

      {/* Publish Success Message */}
      {publishSuccess && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-lg flex flex-col items-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <p className="text-lg">Post publicado com sucesso!</p>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {notificationModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-16">
          <div className="bg-gray-900 w-full max-w-md rounded-lg overflow-hidden animate-zoom-in h-[80vh]">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Notificações</h2>
              <button onClick={() => setNotificationModalOpen(false)} className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 max-h-full overflow-y-auto">
              <div className="space-y-4">
                <div className="flex space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?img=2" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">humorBR</span> curtiu seu post</p>
                    <p className="text-xs text-gray-400">há 2h</p>
                  </div>
                </div>
                <div className="flex space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?img=3" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">risadasInfinitas</span> começou a te seguir</p>
                    <p className="text-xs text-gray-400">há 5h</p>
                  </div>
                </div>
                <div className="flex space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?img=4" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">tioDoPave</span> comentou em seu post</p>
                    <p className="text-xs text-gray-400">há 8h</p>
                  </div>
                </div>
                <div className="flex space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?img=7" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">humorTotal</span> mencionou você em um comentário</p>
                    <p className="text-xs text-gray-400">há 11h</p>
                  </div>
                </div>
                <div className="flex space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?img=8" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">memeland</span> curtiu seu comentário</p>
                    <p className="text-xs text-gray-400">há 13h</p>
                  </div>
                </div>
                <div className="flex space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?img=9" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">brazuca</span> compartilhou seu post</p>
                    <p className="text-xs text-gray-400">há 1d</p>
                  </div>
                </div>
                <div className="flex space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?img=10" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">memelovers</span> começou a te seguir</p>
                    <p className="text-xs text-gray-400">há 1d</p>
                  </div>
                </div>
                <div className="flex space-x-3 p-2 hover:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src="https://i.pravatar.cc/150?img=12" alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-sm"><span className="font-semibold">tiozão</span> comentou em seu post</p>
                    <p className="text-xs text-gray-400">há 2d</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explore Modal */}
      {exploreModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center pt-16">
          <div className="bg-gray-900 w-full max-w-md rounded-lg overflow-hidden animate-zoom-in h-[80vh]">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Explorar</h2>
              <button onClick={() => setExploreModalOpen(false)} className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 max-h-full overflow-y-auto">
              <div className="relative mb-4">
                <input 
                  type="text" 
                  placeholder="Pesquisar usuários ou tags..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </div>
              
              {/* Perfis sugeridos em destaque */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Perfis em destaque</h3>
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-1 border-2 border-gradient-primary">
                      <img src="https://i.pravatar.cc/150?img=5" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium truncate w-full text-center">memeQueen</p>
                    <button className="text-xs px-2 py-0.5 rounded-full bg-gradient-primary text-white mt-1">
                      Seguir
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-1 border-2 border-gradient-primary">
                      <img src="https://i.pravatar.cc/150?img=6" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium truncate w-full text-center">risadasBR</p>
                    <button className="text-xs px-2 py-0.5 rounded-full bg-gradient-primary text-white mt-1">
                      Seguir
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-1 border-2 border-gradient-primary">
                      <img src="https://i.pravatar.cc/150?img=7" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium truncate w-full text-center">humorTotal</p>
                    <button className="text-xs px-2 py-0.5 rounded-full bg-gradient-primary text-white mt-1">
                      Seguir
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-1 border-2 border-gradient-primary">
                      <img src="https://i.pravatar.cc/150?img=8" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium truncate w-full text-center">brasilMemes</p>
                    <button className="text-xs px-2 py-0.5 rounded-full bg-gradient-primary text-white mt-1">
                      Seguir
                    </button>
                  </div>
                  
                  <div className="flex flex-col items-center min-w-[80px]">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-1 border-2 border-gradient-primary">
                      <img src="https://i.pravatar.cc/150?img=9" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-sm font-medium truncate w-full text-center">zoeirasLOL</p>
                    <button className="text-xs px-2 py-0.5 rounded-full bg-gradient-primary text-white mt-1">
                      Seguir
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Tags em alta</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-500/20 text-purple-500 px-3 py-1 rounded-full text-sm">#meme</span>
                  <span className="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-full text-sm">#risadas</span>
                  <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm">#animais</span>
                  <span className="bg-pink-500/20 text-pink-500 px-3 py-1 rounded-full text-sm">#programador</span>
                  <span className="bg-red-500/20 text-red-500 px-3 py-1 rounded-full text-sm">#brasil</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Galeria de Memes</h3>
                <div className="grid grid-cols-3 gap-1">
                  <div className="aspect-square bg-gray-800 rounded-md overflow-hidden">
                    <img src="https://picsum.photos/id/237/150/150" alt="Meme" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-800 rounded-md overflow-hidden">
                    <img src="https://picsum.photos/id/238/150/150" alt="Meme" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-800 rounded-md overflow-hidden">
                    <img src="https://picsum.photos/id/239/150/150" alt="Meme" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-800 rounded-md overflow-hidden">
                    <img src="https://picsum.photos/id/240/150/150" alt="Meme" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-800 rounded-md overflow-hidden">
                    <img src="https://picsum.photos/id/241/150/150" alt="Meme" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square bg-gray-800 rounded-md overflow-hidden">
                    <img src="https://picsum.photos/id/242/150/150" alt="Meme" className="w-full h-full object-cover" />
                  </div>
                </div>
                <button className="w-full mt-2 text-sm text-gradient">Ver mais</button>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Perfis sugeridos</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=5" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">memeQueen</p>
                        <p className="text-xs text-gray-400">1.2k seguidores</p>
                      </div>
                    </div>
                    <button className="bg-gradient-primary text-white text-xs px-3 py-1 rounded-full">
                      Seguir
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=6" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">risadasBR</p>
                        <p className="text-xs text-gray-400">4.5k seguidores</p>
                      </div>
                    </div>
                    <button className="bg-gradient-primary text-white text-xs px-3 py-1 rounded-full">
                      Seguir
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=7" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">humorTotal</p>
                        <p className="text-xs text-gray-400">2.8k seguidores</p>
                      </div>
                    </div>
                    <button className="bg-gradient-primary text-white text-xs px-3 py-1 rounded-full">
                      Seguir
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=8" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">brasilMemes</p>
                        <p className="text-xs text-gray-400">6.1k seguidores</p>
                      </div>
                    </div>
                    <button className="bg-gradient-primary text-white text-xs px-3 py-1 rounded-full">
                      Seguir
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src="https://i.pravatar.cc/150?img=9" alt="User" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">zoeirasLOL</p>
                        <p className="text-xs text-gray-400">3.7k seguidores</p>
                      </div>
                    </div>
                    <button className="bg-gradient-primary text-white text-xs px-3 py-1 rounded-full">
                      Seguir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {settingsModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 w-full max-w-md rounded-lg overflow-hidden animate-zoom-in">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Configurações</h2>
              <button onClick={() => setSettingsModalOpen(false)} className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div className="border-b border-gray-800 pb-4">
                  <h3 className="font-semibold mb-3">Conta</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Email</span>
                      <span className="text-gray-400">{userProfile.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nome de exibição</span>
                      <span className="text-gray-400">{userProfile.displayName}</span>
                    </div>
                    <button className="text-gradient text-sm">Alterar senha</button>
                  </div>
                </div>
                
                <div className="border-b border-gray-800 pb-4">
                  <h3 className="font-semibold mb-3">Notificações</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Notificações push</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-primary"></div>
                      </label>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Notificações por email</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-800 pb-4">
                  <h3 className="font-semibold mb-3">Privacidade</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Perfil privado</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-primary"></div>
                      </label>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Mostrar visualizações</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gradient-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Suporte</h3>
                  <div className="space-y-2">
                    <button className="text-gradient text-sm">Ajuda e Suporte</button>
                    <button className="text-gradient text-sm">Reportar um problema</button>
                    <button className="text-gradient text-sm">Termos de Uso</button>
                    <button className="text-gradient text-sm">Política de Privacidade</button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button className="w-full py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500/10 transition-colors">
                    Sair da conta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Profile Modal */}
      {editProfileModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-gray-900 w-full max-w-md rounded-lg overflow-hidden animate-zoom-in">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Editar Perfil</h2>
              <button onClick={() => setEditProfileModalOpen(false)} className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                saveProfileChanges({
                  displayName: formData.get('displayName'),
                  email: formData.get('email'),
                  frame: parseInt(formData.get('frame') as string)
                });
              }}>
                <div className="mb-6 flex flex-col items-center">
                  <div className="relative mb-3">
                    <div className={`w-24 h-24 rounded-full overflow-hidden ${
                      userProfile.frame === 0 ? 'border-2 border-white' : 
                      userProfile.frame === 1 ? 'border-2 border-gradient-primary' :
                      userProfile.frame === 2 ? 'border-3 border-gradient-gold' :
                      userProfile.frame === 3 ? 'border-3 border-gradient-neon' :
                      'border-3 border-gradient-rainbow'
                    }`}>
                      <img 
                        src={userProfile.avatar} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button type="button" className="absolute bottom-0 right-0 bg-gradient-primary p-1.5 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                      </svg>
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-3">Moldura de Perfil</p>
                  <div className="flex space-x-2">
                    <label className="cursor-pointer">
                      <input type="radio" name="frame" value="0" className="sr-only peer" defaultChecked={userProfile.frame === 0} />
                      <div className="w-8 h-8 rounded-full border-2 border-white peer-checked:ring-2 peer-checked:ring-purple-500"></div>
                    </label>
                    
                    <label className="cursor-pointer">
                      <input type="radio" name="frame" value="1" className="sr-only peer" defaultChecked={userProfile.frame === 1} />
                      <div className="w-8 h-8 rounded-full border-2 border-gradient-primary peer-checked:ring-2 peer-checked:ring-purple-500"></div>
                    </label>
                    
                    <label className="cursor-pointer">
                      <input type="radio" name="frame" value="2" className="sr-only peer" defaultChecked={userProfile.frame === 2} />
                      <div className="w-8 h-8 rounded-full border-2 border-gradient-gold peer-checked:ring-2 peer-checked:ring-purple-500"></div>
                    </label>
                    
                    <label className="cursor-pointer">
                      <input type="radio" name="frame" value="3" className="sr-only peer" defaultChecked={userProfile.frame === 3} />
                      <div className="w-8 h-8 rounded-full border-2 border-gradient-neon peer-checked:ring-2 peer-checked:ring-purple-500"></div>
                    </label>
                    
                    <label className="cursor-pointer">
                      <input type="radio" name="frame" value="4" className="sr-only peer" defaultChecked={userProfile.frame === 4} />
                      <div className="w-8 h-8 rounded-full border-2 border-gradient-rainbow peer-checked:ring-2 peer-checked:ring-purple-500"></div>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-1">
                      Nome de Exibição
                    </label>
                    <input
                      type="text"
                      id="displayName"
                      name="displayName"
                      defaultValue={userProfile.displayName}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={userProfile.email}
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      defaultValue="Apenas compartilhando os melhores memes do Brasil! 😂🇧🇷"
                      className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setEditProfileModalOpen(false)}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-primary hover:opacity-90 rounded-lg text-white font-medium"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
