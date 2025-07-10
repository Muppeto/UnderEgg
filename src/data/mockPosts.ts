import { Post } from '../types';

const mockUsers = [
  {
    id: '1',
    username: 'memezada',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    username: 'humorBR',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    username: 'risadasInfinitas',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    username: 'tioDoPave',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: '5',
    username: 'memeQueen',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user: mockUsers[0],
    content: {
      type: 'image',
      data: 'https://picsum.photos/id/237/600/800',
      alt: 'Cachorro preto olhando para a câmera',
    },
    caption: 'Quando minha mãe pergunta se eu já estudei hoje',
    timestamp: '2025-07-09T18:25:43.511Z',
    likes: 3452,
    comments: [
      {
        id: 'c1',
        user: mockUsers[1],
        text: 'Nossa, muito eu! 😂',
        timestamp: '2025-07-09T18:30:43.511Z',
        likes: 124,
      },
      {
        id: 'c2',
        user: mockUsers[2],
        text: 'Minha cara todo dia!',
        timestamp: '2025-07-09T18:35:43.511Z',
        likes: 89,
      },
    ],
    tags: ['meme', 'cachorro', 'estudos'],
  },
  {
    id: '2',
    user: mockUsers[1],
    content: {
      type: 'image',
      data: 'https://picsum.photos/id/1/600/800',
      alt: 'Pessoa na montanha observando o horizonte',
    },
    caption: 'Eu após 5 minutos de academia já planejando minha nova vida fitness',
    timestamp: '2025-07-09T17:15:43.511Z',
    likes: 5231,
    comments: [
      {
        id: 'c3',
        user: mockUsers[3],
        text: 'E no dia seguinte nunca mais volta 🤣',
        timestamp: '2025-07-09T17:25:43.511Z',
        likes: 231,
      },
    ],
    tags: ['meme', 'academia', 'fitness'],
  },
  {
    id: '3',
    user: mockUsers[2],
    content: {
      type: 'image',
      data: 'https://picsum.photos/id/20/600/800',
      alt: 'Prateleiras com muitos livros',
    },
    caption: 'Minha lista de livros para ler nas férias vs. o que realmente leio',
    timestamp: '2025-07-09T16:10:43.511Z',
    likes: 2187,
    comments: [
      {
        id: 'c4',
        user: mockUsers[4],
        text: 'Literalmente minha vida 📚',
        timestamp: '2025-07-09T16:15:43.511Z',
        likes: 134,
      },
      {
        id: 'c5',
        user: mockUsers[0],
        text: 'Quem nunca né? Começo 10 e não termino nenhum',
        timestamp: '2025-07-09T16:20:43.511Z',
        likes: 98,
      },
    ],
    tags: ['livros', 'ferias', 'realidade'],
  },
  {
    id: '4',
    user: mockUsers[3],
    content: {
      type: 'image',
      data: 'https://picsum.photos/id/42/600/800',
      alt: 'Pessoa usando computador',
    },
    caption: 'Programador em reunião tentando explicar por que a tarefa vai demorar mais do que o estimado',
    timestamp: '2025-07-09T15:05:43.511Z',
    likes: 4720,
    comments: [
      {
        id: 'c6',
        user: mockUsers[1],
        text: 'Como programador, confirmo que é assim mesmo 💻',
        timestamp: '2025-07-09T15:10:43.511Z',
        likes: 245,
      },
    ],
    tags: ['programador', 'trabalho', 'ti'],
  },
  {
    id: '5',
    user: mockUsers[4],
    content: {
      type: 'image',
      data: 'https://picsum.photos/id/96/600/800',
      alt: 'Paisagem de praia',
    },
    caption: 'Eu esperando o fim de semana chegar vs. O fim de semana passando',
    timestamp: '2025-07-09T14:00:43.511Z',
    likes: 6853,
    comments: [
      {
        id: 'c7',
        user: mockUsers[2],
        text: 'Final de semana passa em 5 minutos, é impressionante',
        timestamp: '2025-07-09T14:05:43.511Z',
        likes: 321,
      },
      {
        id: 'c8',
        user: mockUsers[0],
        text: 'Segunda-feira já está me encarando 😭',
        timestamp: '2025-07-09T14:10:43.511Z',
        likes: 178,
      },
    ],
    tags: ['fimdesemana', 'tempo', 'segunda'],
  },
  {
    id: '6',
    user: mockUsers[0],
    content: {
      type: 'image',
      data: 'https://picsum.photos/id/116/600/800',
      alt: 'Montanhas com neblina',
    },
    caption: 'Meu humor na segunda-feira de manhã',
    timestamp: '2025-07-09T13:30:43.511Z',
    likes: 3127,
    comments: [
      {
        id: 'c9',
        user: mockUsers[3],
        text: 'Nem me fale, odeio segundas 😩',
        timestamp: '2025-07-09T13:35:43.511Z',
        likes: 145,
      },
    ],
    tags: ['segunda', 'trabalho', 'humor'],
  },
  {
    id: '7',
    user: mockUsers[2],
    content: {
      type: 'image',
      data: 'https://picsum.photos/id/169/600/800',
      alt: 'Laptop em uma mesa',
    },
    caption: 'Quando você tem 10 tarefas para fazer e decide tirar uma soneca',
    timestamp: '2025-07-09T12:15:43.511Z',
    likes: 5421,
    comments: [
      {
        id: 'c10',
        user: mockUsers[1],
        text: 'Prioridades, gente! 😴',
        timestamp: '2025-07-09T12:20:43.511Z',
        likes: 267,
      },
      {
        id: 'c11',
        user: mockUsers[4],
        text: 'A procrastinação é minha especialidade',
        timestamp: '2025-07-09T12:25:43.511Z',
        likes: 198,
      },
    ],
    tags: ['procrastinacao', 'soneca', 'tarefas'],
  },
];
