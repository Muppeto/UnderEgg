import { useState, useRef, useEffect } from 'react';
import Post from './Post';
import { usePosts } from '../hooks/usePosts';
import { Loader } from 'lucide-react';
import Comments from './Comments';

export default function Feed() {
  const { posts, loading, error, likePost, addComment } = usePosts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const postRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    postRefs.current = postRefs.current.slice(0, posts.length);
  }, [posts.length]);
  
  // Handle swipe to implement "one post at a time" TikTok-like view
  useEffect(() => {
    const handleScroll = () => {
      if (feedRef.current && posts.length > 0) {
        const rect = feedRef.current.getBoundingClientRect();
        const containerCenter = rect.top + rect.height / 2;
        
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        postRefs.current.forEach((postRef, index) => {
          if (postRef) {
            const postRect = postRef.getBoundingClientRect();
            const postCenter = postRect.top + postRect.height / 2;
            const distance = Math.abs(containerCenter - postCenter);
            
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          }
        });
        
        setCurrentIndex(closestIndex);
      }
    };

    const feedElement = feedRef.current;
    if (feedElement) {
      feedElement.addEventListener('scroll', handleScroll);
      return () => feedElement.removeEventListener('scroll', handleScroll);
    }
  }, [posts.length]);

  const handleOpenComments = (postId: string) => {
    setActivePostId(postId);
    setIsCommentsOpen(true);
  };

  const handleCloseComments = () => {
    setIsCommentsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-20">
        <div className="animate-spin mb-4">
          <Loader className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="text-gray-400">Carregando memes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-20 px-4 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-full">
          Tentar novamente
        </button>
      </div>
    );
  }

  const activePost = posts.find(post => post.id === activePostId);

  return (
    <>
      <div 
        ref={feedRef}
        className="h-full overflow-y-auto scrollbar-hide snap-y snap-mandatory"
      >
        {posts.map((post, index) => (
          <div
            key={post.id}
            ref={el => postRefs.current[index] = el}
            className="h-[calc(100vh-56px)] snap-start snap-always"
          >
            <Post 
              post={post} 
              onLike={likePost}
              onComment={handleOpenComments}
              isActive={index === currentIndex}
            />
          </div>
        ))}
      </div>

      {/* Comments Modal */}
      {activePost && (
        <Comments
          isOpen={isCommentsOpen}
          onClose={handleCloseComments}
          postId={activePost.id}
          comments={activePost.comments}
          onAddComment={addComment}
        />
      )}
    </>
  );
}
