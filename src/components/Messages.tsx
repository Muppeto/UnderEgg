import { useState } from 'react';
import { ArrowLeft, Info, Phone, Search, Video } from 'lucide-react';

export default function Messages() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock contacts
  const contacts = [
    {
      id: '1',
      name: 'João Silva',
      avatar: 'https://i.pravatar.cc/150?img=12',
      lastMessage: 'Viu esse meme? 😂',
      time: '14:30',
      unread: 2
    },
    {
      id: '2',
      name: 'Maria Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=13',
      lastMessage: 'Me manda mais daqueles memes de gato',
      time: '12:05',
      unread: 0
    },
    {
      id: '3',
      name: 'Pedro Santos',
      avatar: 'https://i.pravatar.cc/150?img=14',
      lastMessage: 'KKKKKKKK muito bom',
      time: 'Ontem',
      unread: 0
    },
    {
      id: '4',
      name: 'Ana Costa',
      avatar: 'https://i.pravatar.cc/150?img=15',
      lastMessage: 'Obrigada por compartilhar!',
      time: 'Ontem',
      unread: 0
    },
    {
      id: '5',
      name: 'Lucas Mendes',
      avatar: 'https://i.pravatar.cc/150?img=16',
      lastMessage: 'Vou postar um parecido',
      time: 'Seg',
      unread: 0
    },
    {
      id: '6',
      name: 'Grupo de Memes',
      avatar: 'https://i.pravatar.cc/150?img=17',
      lastMessage: 'Lucas: Olha esse aqui gente',
      time: 'Seg',
      unread: 5,
      isGroup: true
    },
    {
      id: '7',
      name: 'Camila Alves',
      avatar: 'https://i.pravatar.cc/150?img=18',
      lastMessage: 'Ri muito com esse último post',
      time: 'Sáb',
      unread: 0
    },
    {
      id: '8',
      name: 'Rodrigo Lima',
      avatar: 'https://i.pravatar.cc/150?img=19',
      lastMessage: 'Bora jogar hoje?',
      time: 'Sex',
      unread: 0
    }
  ];
  
  // Mock messages for selected chat
  const mockMessages = {
    '1': [
      { id: 'm1', sender: 'them', text: 'E aí, tudo bem?', time: '14:20' },
      { id: 'm2', sender: 'me', text: 'Tudo tranquilo e você?', time: '14:22' },
      { id: 'm3', sender: 'them', text: 'Também! Viu esse meme?', time: '14:25' },
      { id: 'm4', sender: 'them', text: '[Imagem]', time: '14:25', image: 'https://picsum.photos/id/237/200/200' },
      { id: 'm5', sender: 'them', text: 'Viu esse meme? 😂', time: '14:30' },
    ],
    '2': [
      { id: 'm1', sender: 'me', text: 'Olha esse meme de gato que achei', time: '11:30' },
      { id: 'm2', sender: 'me', text: '[Imagem]', time: '11:30', image: 'https://picsum.photos/id/40/200/200' },
      { id: 'm3', sender: 'them', text: 'Muito bom! 😹', time: '11:45' },
      { id: 'm4', sender: 'them', text: 'Me manda mais daqueles memes de gato', time: '12:05' },
    ],
    '3': [
      { id: 'm1', sender: 'me', text: 'Acabei de postar um meme novo', time: 'Ontem 20:15' },
      { id: 'm2', sender: 'them', text: 'Deixa eu ver', time: 'Ontem 20:30' },
      { id: 'm3', sender: 'them', text: 'KKKKKKKK muito bom', time: 'Ontem 20:32' },
    ]
  };
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedContact = contacts.find(c => c.id === activeChat);
  const chatMessages = activeChat ? mockMessages[activeChat as keyof typeof mockMessages] || [] : [];
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // Send message functionality would be implemented here
  };
  
  return (
    <div className="flex h-full bg-gray-900">
      {/* Contacts list */}
      <div className={`w-full ${activeChat ? 'hidden md:block' : ''} md:w-1/3 border-r border-gray-800 h-full overflow-y-auto`}>
        <div className="p-4">
          <div className="relative mb-4">
            <input 
              type="text"
              placeholder="Buscar contatos..."
              className="w-full bg-gray-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          
          <div className="space-y-1">
            {filteredContacts.map(contact => (
              <button
                key={contact.id}
                className={`w-full flex items-center p-3 rounded-lg hover:bg-gray-800 ${activeChat === contact.id ? 'bg-gray-800' : ''}`}
                onClick={() => setActiveChat(contact.id)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {contact.unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {contact.unread}
                    </span>
                  )}
                </div>
                <div className="ml-3 flex-1 flex flex-col items-start overflow-hidden">
                  <div className="flex justify-between w-full">
                    <span className="font-medium">{contact.name}</span>
                    <span className="text-xs text-gray-400">{contact.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate w-full text-left">
                    {contact.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Chat area */}
      {activeChat ? (
        <div className="w-full md:w-2/3 flex flex-col h-full">
          {/* Chat header */}
          <div className="p-3 border-b border-gray-800 flex items-center">
            <button 
              className="md:hidden p-1 mr-2 text-gray-400"
              onClick={() => setActiveChat(null)}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={selectedContact?.avatar} 
                alt={selectedContact?.name}
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="font-medium">{selectedContact?.name}</p>
              <p className="text-xs text-gray-400">Online</p>
            </div>
            <div className="flex space-x-3">
              <button className="text-gray-400 hover:text-white">
                <Phone className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Video className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatMessages.map(message => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'them' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mr-2">
                    <img 
                      src={selectedContact?.avatar} 
                      alt={selectedContact?.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className={`max-w-[70%] ${message.sender === 'me' ? 'bg-yellow-600 rounded-l-lg rounded-tr-lg' : 'bg-gray-800 rounded-r-lg rounded-tl-lg'}`}>
                  {message.image && (
                    <div className="rounded-t-lg overflow-hidden">
                      <img src={message.image} alt="Message attachment" className="w-full h-auto" />
                    </div>
                  )}
                  <div className="p-3">
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-yellow-200' : 'text-gray-400'}`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Message input */}
          <div className="p-3 border-t border-gray-800">
            <form onSubmit={handleSendMessage} className="flex items-center">
              <button type="button" className="p-2 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M16 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><polyline points="15 12 19 12 15 12"/><line x1="19" x2="15" y1="8" y2="12"/><line x1="19" x2="15" y1="16" y2="12"/>
                </svg>
              </button>
              <input 
                type="text"
                placeholder="Digite uma mensagem..."
                className="flex-1 bg-gray-800 text-white rounded-full py-2 px-4 mx-2 focus:outline-none focus:ring-1 focus:ring-yellow-500"
              />
              <button type="button" className="p-2 text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M7 22a5 5 0 0 1-2-4"/><path d="M7 16.93c.96.43 1.96.74 2.99.91"/><path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2"/><path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14v0z"/>
                </svg>
              </button>
              <button type="submit" className="p-2 text-yellow-500 hover:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex w-2/3 items-center justify-center">
          <div className="text-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16 mx-auto mb-4">
              <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>
            </svg>
            <p className="text-lg mb-2">Suas mensagens</p>
            <p>Selecione um contato para começar a conversar</p>
          </div>
        </div>
      )}
    </div>
  );
}
