import { useState } from 'react';
import { AlertTriangle, ArrowRight, Heart, MessageCircle, Send } from 'lucide-react';
import { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  isActive: boolean;
}

export default function Post({ post, onLike, onComment, isActive }: PostProps) {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const handleLike = () => {
    if (!liked) {
      onLike(post.id);
      setLiked(true);
    }
  };

  const handleComment = () => {
    onComment(post.id);
  };

  const toggleFollow = () => {
    setFollowing(!following);
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  return (
    <div className="relative h-full bg-gray-900 flex justify-center">
      {/* User info at top */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white">
            <img 
              src={post.user.avatar} 
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-xs text-white">{post.user.username}</p>
          </div>
        </div>
        <button 
          onClick={toggleFollow}
          className={`text-xs px-2 py-0.5 rounded-full ${following ? 'bg-gray-700 text-white' : 'bg-transparent border border-gradient-primary text-white'}`}
        >
          {following ? 'Seguindo' : 'Seguir'}
        </button>
      </div>

      {/* Post content */}
      <div className="w-full max-w-md h-full relative">
        {post.content.type === 'image' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <img 
              src={post.content.data} 
              alt={post.content.alt || 'Post image'} 
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
        
        {/* Post details at bottom */}
        <div className="absolute bottom-4 left-4 right-16 z-10">
          {/* Caption */}
          {post.caption && (
            <p className="mt-2 text-white text-sm">
              {post.caption}
            </p>
          )}
          
          {/* Tags */}
          {post.tags.length > 0 && (
            <p className="mt-1 text-xs text-blue-400">
              {post.tags.map(tag => `#${tag}`).join(' ')}
            </p>
          )}
        </div>
        
        {/* Interaction buttons (vertical on the right side) - positioned higher */}
        <div className="absolute right-6 bottom-52 flex flex-col items-center space-y-6">
          {/* Like button */}
          <button 
            onClick={handleLike}
            className="flex flex-col items-center"
          >
            <Heart className={`w-6 h-6 ${liked ? 'text-red-500 fill-current' : 'text-white'}`} />
            <span className="text-xs mt-1 text-white">{post.likes}</span>
          </button>
          
          {/* Comment button */}
          <button
            onClick={handleComment} 
            className="flex flex-col items-center"
          >
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="text-xs mt-1 text-white">{post.comments.length}</span>
          </button>
          
          {/* Share button */}
          <button 
            className="flex flex-col items-center"
            onClick={handleShare}
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Share Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
          <div className="bg-gray-900 w-full max-w-md rounded-t-2xl md:rounded-2xl overflow-hidden animate-slide-up">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Compartilhar</h2>
              <button onClick={() => setShareModalOpen(false)} className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Pesquisar usuários..."
                  className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none"
                />
              </div>
              
              {/* Contacts */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Contatos</h3>
                <div className="grid grid-cols-4 gap-3">
                  <button className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-1">
                      <img src="https://i.pravatar.cc/150?img=1" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs truncate w-full text-center">Carlos</span>
                  </button>
                  
                  <button className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-1">
                      <img src="https://i.pravatar.cc/150?img=2" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs truncate w-full text-center">Márcia</span>
                  </button>
                  
                  <button className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-1">
                      <img src="https://i.pravatar.cc/150?img=3" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs truncate w-full text-center">Pedro</span>
                  </button>
                  
                  <button className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden mb-1">
                      <img src="https://i.pravatar.cc/150?img=4" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs truncate w-full text-center">Ana</span>
                  </button>
                </div>
              </div>
              
              {/* Social networks (smaller) */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Redes sociais</h3>
                <div className="flex justify-around">
                  <button className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                      </svg>
                    </div>
                    <span className="text-xs">Facebook</span>
                  </button>
                  
                  <button className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                      </svg>
                    </div>
                    <span className="text-xs">Twitter</span>
                  </button>
                  
                  <button className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                    </div>
                    <span className="text-xs">WhatsApp</span>
                  </button>
                  
                  <button className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 flex items-center justify-center mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                    </div>
                    <span className="text-xs">Instagram</span>
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-400 mb-2">Mais opções</h3>
                <div className="space-y-2">
                  <button className="w-full flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-gray-400">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
                    </svg>
                    <span>Salvar na lista</span>
                  </button>
                  
                  <button className="w-full flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-3 text-gray-400">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                    </svg>
                    <span>Copiar link</span>
                  </button>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-800">
                <button className="w-full flex items-center justify-center p-3 text-red-500">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  <span>Denunciar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Define Search component for use in the share modal
function Search({ className = "", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
