export interface User {
  id: string;
  username: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  user: User;
  content: {
    type: 'image' | 'video' | 'text';
    data: string;
    alt?: string;
  };
  caption?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  tags: string[];
}
