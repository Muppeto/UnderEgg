import { useState, useRef, useEffect } from 'react';
import { Camera, Check, CirclePlus, Image, Smile, Tag, X } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost: (post: any) => void;
}

export default function CreatePostModal({ 
  isOpen, 
  onClose, 
  onCreatePost 
}: CreatePostModalProps) {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setCaption('');
      setTags('');
      setPreviewImage(null);
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isOpen]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Restore scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Show loading state
    setIsSubmitting(true);
    
    // If no image is selected, use a placeholder
    const imageUrl = previewImage || 'https://picsum.photos/id/237/600/800';
    
    // Create a new post object
    const newPost = {
      id: `post-${Date.now()}`,
      user: {
        id: '1',
        username: 'memezada',
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      content: {
        type: 'image',
        data: imageUrl,
        alt: 'Post image',
      },
      caption: caption,
      timestamp: new Date().toISOString(),
      likes: Math.floor(Math.random() * 100), // Random number of likes between 0-99
      comments: [],
      tags: tags.split(' ').filter(tag => tag.startsWith('#')).map(tag => tag.substring(1)),
    };
    
    // Simulate network delay
    setTimeout(() => {
      onCreatePost(newPost);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Close modal after showing success message
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-gray-800 rounded-lg w-full max-w-md animate-zoom-in"
        style={{ animationDuration: '0.2s' }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-bold text-white">Criar Post</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Image preview area */}
            <div className={`border-2 border-dashed border-gray-600 rounded-lg p-4 text-center ${previewImage ? 'h-64' : 'h-40'}`}>
              {previewImage ? (
                <div className="h-full flex items-center justify-center">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <Image className="w-12 h-12 mb-2" />
                  <p className="mb-2">Arraste uma imagem ou</p>
                  <label className="bg-transparent border border-gradient-primary text-white px-4 py-2 rounded-full cursor-pointer">
                    Selecionar Arquivo
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              )}
            </div>
            
            {/* Caption input */}
            <div>
              <label htmlFor="caption" className="block text-sm font-medium text-gray-300 mb-1">
                Legenda
              </label>
              <textarea
                id="caption"
                rows={3}
                placeholder="Escreva uma legenda para seu meme..."
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            
            {/* Tags input */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-1">
                Tags
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="tags"
                  type="text"
                  placeholder="Adicione tags com # (ex: #meme #humor)"
                  className="w-full p-2 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            
            {isSuccess ? (
              <button
                type="button"
                className="px-4 py-2 bg-green-600 rounded-lg text-white font-medium flex items-center"
                disabled
              >
                <Check className="w-4 h-4 mr-2" />
                Publicado!
              </button>
            ) : (
              <button
                type="submit"
                className="px-4 py-2 bg-transparent border border-gradient-primary rounded-lg text-white font-medium flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publicando...
                  </>
                ) : (
                  <>
                    <CirclePlus className="w-4 h-4 mr-2" />
                    Publicar
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
