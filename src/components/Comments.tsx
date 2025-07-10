import { useState, useRef, useEffect } from 'react';
import { CircleAlert, Heart, Image, Send, X } from 'lucide-react';
import { Comment as CommentType } from '../types';
import { formatDistanceToNow } from '../utils/formatDate';

interface CommentsProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  comments: CommentType[];
  onAddComment: (postId: string, comment: any) => void;
}

export default function Comments({ 
  isOpen, 
  onClose, 
  postId, 
  comments, 
  onAddComment 
}: CommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [showSavedPosts, setShowSavedPosts] = useState(false);
  const [selectedList, setSelectedList] = useState<string | null>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Mock saved lists
  const savedLists = [
    {
      id: 'l1',
      name: 'Memes Favoritos',
      posts: [
        { id: 'p1', image: 'https://picsum.photos/id/237/300/300' },
        { id: 'p2', image: 'https://picsum.photos/id/238/300/300' },
        { id: 'p3', image: 'https://picsum.photos/id/239/300/300' },
      ]
    },
    {
      id: 'l2',
      name: 'Para Compartilhar',
      posts: [
        { id: 'p4', image: 'https://picsum.photos/id/240/300/300' },
        { id: 'p5', image: 'https://picsum.photos/id/241/300/300' },
      ]
    },
    {
      id: 'l3',
      name: 'Inspiração',
      posts: [
        { id: 'p6', image: 'https://picsum.photos/id/242/300/300' },
        { id: 'p7', image: 'https://picsum.photos/id/243/300/300' },
        { id: 'p8', image: 'https://picsum.photos/id/244/300/300' },
      ]
    },
  ];
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commentsRef.current && !commentsRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      
      // Focus the input field when opened
      if (inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Usar um usuário mockado como o usuário atual
      const currentUser = {
        id: '1',
        username: 'memezada',
        avatar: 'https://i.pravatar.cc/150?img=1',
      };
      
      onAddComment(postId, {
        user: currentUser,
        text: newComment,
      });
      
      setNewComment('');
    }
  };

  const handleSendSavedPost = (post: any) => {
    // Usar um usuário mockado como o usuário atual
    const currentUser = {
      id: '1',
      username: 'memezada',
      avatar: 'https://i.pravatar.cc/150?img=1',
    };
    
    onAddComment(postId, {
      user: currentUser,
      text: `<img src="${post.image}" alt="Meme" class="w-full max-w-[200px] rounded-lg" />`,
    });
    
    setShowSavedPosts(false);
    setSelectedList(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div 
        ref={commentsRef}
        className="bg-gray-800 w-full sm:w-96 sm:max-w-md sm:rounded-2xl h-[90vh] sm:h-[80vh] flex flex-col animate-slide-up"
        style={{ animationDuration: '0.3s' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold text-white">Comentários</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Comments list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Ainda não há comentários.</p>
              <p className="text-sm">Seja o primeiro a comentar!</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={comment.user.avatar} 
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-700 rounded-2xl p-3">
                    <p className="font-semibold text-sm">{comment.user.username}</p>
                    {comment.text.startsWith('<img') ? (
                      <div dangerouslySetInnerHTML={{ __html: comment.text }} className="mt-2" />
                    ) : (
                      <p className="text-sm mt-1">{comment.text}</p>
                    )}
                  </div>
                  <div className="flex items-center mt-1 space-x-4 text-xs text-gray-400">
                    <span>{formatDistanceToNow(new Date(comment.timestamp))}</span>
                    <button className="flex items-center space-x-1">
                      <Heart className="w-3 h-3" />
                      <span>{comment.likes}</span>
                    </button>
                    <button>Responder</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Saved posts selector */}
        {showSavedPosts && (
          <div className="p-3 border-t border-gray-700 bg-gray-750">
            <div className="mb-2">
              <h3 className="text-sm font-semibold mb-2">Escolha uma lista</h3>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {savedLists.map(list => (
                  <button
                    key={list.id}
                    onClick={() => setSelectedList(list.id)}
                    className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${
                      selectedList === list.id 
                        ? 'bg-gradient-primary text-white' 
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {list.name}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedList && (
              <div>
                <h4 className="text-xs text-gray-400 mb-2">Posts salvos</h4>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {savedLists.find(list => list.id === selectedList)?.posts.map(post => (
                    <button
                      key={post.id}
                      onClick={() => handleSendSavedPost(post)}
                      className="aspect-square rounded-lg overflow-hidden"
                    >
                      <img 
                        src={post.image} 
                        alt="Saved post" 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setShowSavedPosts(false)}
              className="mt-2 w-full text-center text-xs text-gray-400"
            >
              Cancelar
            </button>
          </div>
        )}
        
        {/* Comment input */}
        <div className="p-3 border-t border-gray-700">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="https://i.pravatar.cc/150?img=1" 
                alt="Your avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 bg-gray-700 rounded-full flex items-center overflow-hidden pr-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Adicione um comentário..."
                className="flex-1 bg-transparent border-none p-3 text-sm focus:outline-none text-white"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowSavedPosts(true)}
                className="text-gray-400 mr-1"
              >
                <Image className="w-5 h-5" />
              </button>
              <button 
                type="submit" 
                disabled={!newComment.trim()}
                className={`${newComment.trim() ? 'text-yellow-500' : 'text-gray-500'}`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
