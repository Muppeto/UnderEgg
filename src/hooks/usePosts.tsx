import { useState, useEffect } from 'react';
import { Post } from '../types';
import { mockPosts } from '../data/mockPosts';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate network request delay
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        // Set fewer likes on each post for the example
        const postsWithFewerLikes = mockPosts.map(post => ({
          ...post,
          likes: Math.floor(post.likes / 10) + Math.floor(Math.random() * 50)
        }));
        setPosts(postsWithFewerLikes);
        setLoading(false);
      } catch (err) {
        setError('Falha ao carregar os posts. Tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const likePost = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + 1 } 
          : post
      )
    );
  };

  const addComment = (postId: string, comment: Omit<Post['comments'][0], 'id' | 'timestamp' | 'likes'>) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newComment = {
            ...comment,
            id: `c${Date.now()}`,
            timestamp: new Date().toISOString(),
            likes: 0
          };
          return {
            ...post,
            comments: [...post.comments, newComment]
          };
        }
        return post;
      })
    );
  };

  const addPost = (newPost: Post) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return { posts, loading, error, likePost, addComment, addPost };
}
