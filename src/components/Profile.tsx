import { useState, useRef, useEffect } from 'react';
import { AlertTriangle, ArrowLeft, Calendar, Pen, Flame, Globe, Heart, Image, Lock, X } from 'lucide-react';

interface ProfileProps {
  onEditProfile: () => void;
  userProfile: any;
}

export default function Profile({ onEditProfile, userProfile }: ProfileProps) {
  const [activeTab, setActiveTab] = useState('posts');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  
  // Mock user data
  const user = {
    followers: 1204,
    following: 385,
    views: 24568,
    featured: 3,
    bio: 'Apenas compartilhando os melhores memes do Brasil! 😂🇧🇷',
  };
  
  // Mock posts with more variation in layout
  const userPosts = [
    { id: 'u1', image: 'https://picsum.photos/id/237/300/300', likes: 432, size: 'medium', trending: true },
    { id: 'u2', image: 'https://picsum.photos/id/1025/300/300', likes: 217, size: 'small' },
    { id: 'u3', image: 'https://picsum.photos/id/1074/300/300', likes: 189, size: 'small' },
    { id: 'u4', image: 'https://picsum.photos/id/1084/300/300', likes: 302, size: 'medium' },
    { id: 'u5', image: 'https://picsum.photos/id/169/300/300', likes: 251, size: 'medium', trending: true },
    { id: 'u6', image: 'https://picsum.photos/id/177/300/300', likes: 178, size: 'medium' },
    { id: 'u7', image: 'https://picsum.photos/id/145/300/300', likes: 324, size: 'small' },
    { id: 'u8', image: 'https://picsum.photos/id/133/300/300', likes: 189, size: 'small' },
    { id: 'u9', image: 'https://picsum.photos/id/250/300/300', likes: 276, size: 'small' },
    { id: 'u10', image: 'https://picsum.photos/id/240/300/300', likes: 156, size: 'medium' },
    { id: 'u11', image: 'https://picsum.photos/id/244/300/300', likes: 328, size: 'medium', trending: true },
    { id: 'u12', image: 'https://picsum.photos/id/248/300/300', likes: 214, size: 'small' },
    { id: 'u13', image: 'https://picsum.photos/id/252/300/300', likes: 199, size: 'small' },
    { id: 'u14', image: 'https://picsum.photos/id/256/300/300', likes: 267, size: 'medium' },
    { id: 'u15', image: 'https://picsum.photos/id/260/300/300', likes: 345, size: 'small' },
  ];
  
  // Mock liked posts with similar variation
  const likedPosts = [
    { id: 'l1', image: 'https://picsum.photos/id/26/300/300', likes: 845, size: 'medium' },
    { id: 'l2', image: 'https://picsum.photos/id/37/300/300', likes: 562, size: 'small' },
    { id: 'l3', image: 'https://picsum.photos/id/48/300/300', likes: 721, size: 'small' },
    { id: 'l4', image: 'https://picsum.photos/id/59/300/300', likes: 634, size: 'medium' },
    { id: 'l5', image: 'https://picsum.photos/id/66/300/300', likes: 419, size: 'medium' },
    { id: 'l6', image: 'https://picsum.photos/id/77/300/300', likes: 583, size: 'small' },
  ];
  
  // Mock lists (folders of saved posts)
  const userLists = [
    {
      id: 'l1',
      name: 'Memes Favoritos',
      count: 24,
      cover: 'https://picsum.photos/id/146/300/300',
      isPrivate: false
    },
    {
      id: 'l2',
      name: 'Para Compartilhar',
      count: 18,
      cover: 'https://picsum.photos/id/164/300/300',
      isPrivate: true
    },
    {
      id: 'l3',
      name: 'Inspiração',
      count: 12,
      cover: 'https://picsum.photos/id/188/300/300',
      isPrivate: false
    },
    {
      id: 'l4',
      name: 'Programação',
      count: 15,
      cover: 'https://picsum.photos/id/160/300/300',
      isPrivate: false
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const rect = tabsRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 56); // 56px is the header height
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handlePostClick = (post: any, index: number) => {
    setSelectedPost(post);
    setCurrentPostIndex(index);
  };

  const closePostView = () => {
    setSelectedPost(null);
  };
  
  const handleNextPost = () => {
    const posts = activeTab === 'posts' ? userPosts : likedPosts;
    setCurrentPostIndex((prevIndex) => (prevIndex + 1) % posts.length);
    setSelectedPost(posts[(currentPostIndex + 1) % posts.length]);
  };
  
  const handlePrevPost = () => {
    const posts = activeTab === 'posts' ? userPosts : likedPosts;
    setCurrentPostIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
    setSelectedPost(posts[(currentPostIndex - 1 + posts.length) % posts.length]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="px-2 py-3 grid grid-cols-3 gap-2 pb-16">
            {userPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={`relative group overflow-hidden rounded-lg 
                  ${post.size === 'small' ? 'col-span-1 aspect-square' : 'col-span-2 aspect-video'}`}
                onClick={() => handlePostClick(post, index)}
              >
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-white flex items-center space-x-1">
                    <Heart className="w-4 h-4 fill-white stroke-none" />
                    <span>{post.likes}</span>
                  </span>
                </div>
                {post.trending && (
                  <div className="absolute top-2 right-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case 'liked':
        return (
          <div className="px-2 py-3 grid grid-cols-3 gap-2 pb-16">
            {likedPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={`relative group overflow-hidden rounded-lg 
                  ${post.size === 'small' ? 'col-span-1 aspect-square' : 'col-span-2 aspect-video'}`}
                onClick={() => handlePostClick(post, index)}
              >
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-white flex items-center space-x-1">
                    <Heart className="w-4 h-4 fill-white stroke-none" />
                    <span>{post.likes}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
      case 'history':
        return (
          <div className="p-4 text-center text-gray-400 pb-16">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 mx-auto mb-2">
              <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="10"/>
            </svg>
            <p>Seu histórico de visualizações aparecerá aqui</p>
          </div>
        );
      case 'extras':
        return (
          <div className="p-4 space-y-4 pb-16">
            <h3 className="text-lg font-semibold">Seus Comentários</h3>
            <div className="space-y-3">
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Em <span className="font-medium text-white">Memes de Programação</span></p>
                <p className="mt-1">Muito eu quando tento debugar depois de 8 horas de código 😂</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Em <span className="font-medium text-white">Memes de Segunda</span></p>
                <p className="mt-1">A cara da minha cachorra quando falo que preciso trabalhar</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Em <span className="font-medium text-white">Memes Aleatórios</span></p>
                <p className="mt-1">KKKKKK sensacional esse meme, vou compartilhar com meus amigos</p>
              </div>
            </div>
          </div>
        );
      case 'lists':
        return (
          <div className="p-4 space-y-4 pb-16">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Suas Listas</h3>
              <div className="relative group">
                <button className="bg-transparent border border-gradient-primary rounded-full text-white text-xs px-3 py-1">
                  Personalizar
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg p-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-10">
                  <button className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    <span>Privar listas</span>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>Tornar público</span>
                  </button>
                  <div className="border-t border-gray-700 my-1"></div>
                  <button className="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2 text-purple-500">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    <span>Nova lista</span>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {userLists.map(list => (
                <div key={list.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="aspect-square w-full relative">
                    <img 
                      src={list.cover} 
                      alt={list.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-3 w-full">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm text-white truncate">{list.name}</h4>
                          {list.isPrivate ? (
                            <Lock className="w-4 h-4 text-gray-300" />
                          ) : (
                            <Globe className="w-4 h-4 text-gray-300" />
                          )}
                        </div>
                        <div className="flex items-center mt-1 justify-between">
                          <span className="text-xs text-gray-300">{list.count} memes</span>
                          <button className="text-xs text-purple-400 flex items-center">
                            <Pen className="w-3 h-3 mr-1" />
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full overflow-y-auto pb-20 scrollbar-hide">
      {/* Banner and profile info */}
      <div className="relative">
        {/* Banner */}
        <div className="h-36 relative">
          <img 
            src={userProfile.banner} 
            alt="Profile banner" 
            className="w-full h-full object-cover"
          />
          <button className="absolute bottom-2 right-2 bg-black/50 p-1.5 rounded-full">
            <Pen className="w-4 h-4 text-white" />
          </button>
        </div>
        
        {/* Profile picture */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <div className="relative">
            <div className={`w-32 h-32 rounded-full overflow-hidden ${
              userProfile.frame === 0 ? 'border-4 border-gray-900' : 
              userProfile.frame === 1 ? 'border-4 border-gradient-primary' :
              userProfile.frame === 2 ? 'border-4 border-gradient-gold' :
              userProfile.frame === 3 ? 'border-4 border-gradient-neon' :
              'border-4 border-gradient-rainbow'
            }`}>
              <img 
                src={userProfile.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-gradient-primary p-1.5 rounded-full">
              <Image className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Profile info */}
      <div className="mt-20 text-center px-4">
        <h1 className="text-xl font-bold">{userProfile.displayName}</h1>
        
        <p className="mt-2 text-sm">{user.bio}</p>
        
        <div className="flex justify-center space-x-6 mt-4">
          <div className="text-center">
            <p className="font-bold">{user.followers}</p>
            <p className="text-xs text-gray-400">Seguidores</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.following}</p>
            <p className="text-xs text-gray-400">Seguindo</p>
          </div>
          <div className="border-l border-gray-700"></div>
          <div className="text-center">
            <p className="font-bold">{user.views}</p>
            <p className="text-xs text-gray-400">Visualizações</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.featured}</p>
            <p className="text-xs text-gray-400">Destaques</p>
          </div>
        </div>
        
        <div className="mt-4">
          <button 
            className="bg-transparent border border-gradient-primary text-white rounded-full px-8 py-2 font-medium"
            onClick={onEditProfile}
          >
            Editar Perfil
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div 
        ref={tabsRef} 
        className={`mt-6 border-t border-gray-800 ${isSticky ? 'sticky top-14 bg-gray-900 z-10' : ''}`}
      >
        <div className="flex overflow-x-auto scrollbar-hide">
          <button
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'posts' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'liked' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('liked')}
          >
            Curtidos
          </button>
          <button
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'history' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('history')}
          >
            Histórico
          </button>
          <button
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'extras' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('extras')}
          >
            Extras
          </button>
          <button
            className={`flex-1 py-3 font-medium text-sm ${activeTab === 'lists' ? 'border-b-2 border-purple-500 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('lists')}
          >
            Listas
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      {renderTabContent()}

      {/* Post Detail View */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
          <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4">
            <button onClick={closePostView} className="text-gray-400 mr-4">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="bg-gradient-to-r from-purple-500 via-yellow-500 to-pink-500 bg-clip-text text-transparent font-bold">Perfil</h2>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-4 relative">
            <img 
              src={selectedPost.image} 
              alt="Post" 
              className="max-h-full max-w-full object-contain"
            />
            
            {/* Navigation arrows */}
            <button 
              className="absolute left-4 bg-black/50 rounded-full p-2 text-white"
              onClick={handlePrevPost}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            
            <button 
              className="absolute right-4 bg-black/50 rounded-full p-2 text-white"
              onClick={handleNextPost}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
            
            {selectedPost.trending && (
              <div className="absolute top-4 right-4 flex items-center bg-black/50 rounded-full px-3 py-1">
                <Flame className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-xs text-white">Em alta</span>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-gray-900">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-800">
                  <img 
                    src={userProfile.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-2">
                  <p className="font-medium text-sm">{userProfile.displayName}</p>
                  <p className="text-xs text-gray-400">2 dias atrás</p>
                </div>
              </div>
              
              <button className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                </svg>
              </button>
            </div>
            
            <div className="flex items-center space-x-8 justify-center py-2">
              <button className="flex flex-col items-center">
                <Heart className={`w-6 h-6 ${Math.random() > 0.5 ? 'text-red-500 fill-current' : 'text-white'}`} />
                <span className="text-xs mt-1 text-white">{selectedPost.likes}</span>
              </button>
              <button className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <span className="text-xs mt-1 text-white">{Math.floor(Math.random() * 20)}</span>
              </button>
              <button className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                  <path d="M22 3 2 15l10-5M22 3 13 21l-3-11"/>
                </svg>
                <span className="text-xs mt-1 text-white">Compartilhar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
