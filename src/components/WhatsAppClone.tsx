"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Map, MessageCircle, MoreHorizontal, Users, Play, Search, Plus, Settings } from 'lucide-react';

// Define the Friend type
interface Friend {
  id: number;
  name: string;
  message: string;
  time: string;
  image: string;
}

const SnapchatStyleApp = () => {
  const [activeScreen, setActiveScreen] = useState('chat');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showReply, setShowReply] = useState(false);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Update the friends array to use the Friend type
  const friends: Friend[] = [
    { id: 1, name: 'Yi N', message: 'Sent', time: '2m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdm6KtsRZaI88FU5IJeL-7-FJ-VPwMaszJu6RAz6JWa-HpwL0_4uUMQGAP1od2tLnuHM&usqp=CAU' },
    { id: 2, name: 'Lili', message: 'Received', time: '15m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzvOtUjNCT6i_dJmp8lMVrf1Fuwo0re6dZwUTZ9vpK7d3bfZhSSGhtJb1j28Y9dUSBviw&usqp=CAU' },
    { id: 3, name: 'Team Snapchat', message: 'New Snap and Chat', time: '25m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxgdJ5rTMSqBuShpOrU7Rha_Xafy1ECUve2MPvNGGI3qMmItV2OrvarbktsHIWVl1DM2k&usqp=CAU' },
    { id: 4, name: 'Robert Jonas', message: 'Typing...', time: '1h', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8tJeuSriHSY26Yn3cXaEyQmAU2f2_QCJ9jDFFaRcKbMj-EFKyR335b6bQq1K9RGvxxOE&usqp=CAU' },
  ];

  const initialMessages = [
    { id: 1, text: "Hey! How's it going?", sender: 'Friend' },
    { id: 2, text: "I'm on my way!", sender: 'Friend' },
  ];

  const predefinedReplies = [
    "I am on my way!",
    "I will reply to you soon!",
    "Let's catch up later!",
    "Sounds good!",
  ];

  // Update the handleFriendClick function to use the Friend type
  const handleFriendClick = (friend: Friend) => {
    setSelectedFriend(friend);
    setMessages(initialMessages);
    setShowReply(false);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'You' }]);
      setNewMessage('');

      setTimeout(() => {
        const reply = predefinedReplies[Math.floor(Math.random() * predefinedReplies.length)];
        setMessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, text: reply, sender: 'Friend' }]);
        setShowReply(true);
      }, 2000);
    }
  };

  const handleBackToFriends = () => {
    setSelectedFriend(null);
    setMessages([]);
  };

  const ChatScreen = () => (
    <div className="h-full bg-white flex flex-col">
      {selectedFriend ? (
        <>
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold">{selectedFriend.name}</h2>
            <button onClick={handleBackToFriends} className="text-gray-500">Back</button>
          </div>
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {messages.map(message => (
              <div key={message.id} className={`flex ${message.sender === 'Friend' ? 'justify-start' : 'justify-end'}`}>
                <div className={`p-2 rounded-lg ${message.sender === 'Friend' ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="border rounded-full p-2 w-full"
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage} className="bg-blue-500 text-white rounded-full px-4 py-2 mt-2">
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {friends.map(friend => (
            <div key={friend.id} className="flex items-center space-x-3 cursor-pointer" onClick={() => handleFriendClick(friend)}>
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src={friend.image} alt={friend.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{friend.name}</h3>
                <p className="text-sm text-gray-500">{friend.message} • {friend.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const StoriesScreen = () => {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Stories Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-gray-600" />
            <h2 className="font-bold text-xl">Stories</h2>
          </div>
          <Search className="w-6 h-6 text-gray-600" />
        </div>

        {/* My Story Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                <img src="https://helios-i.mashable.com/imagery/articles/062xtbp9K05XUiYf9heKk3p/hero-image.fill.size_1200x1200.v1632873909.png" alt="My Story" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold">My Story</h3>
              <p className="text-sm text-gray-500">Add to my story</p>
            </div>
          </div>
        </div>

        {/* Friends Stories */}
        <div className="flex-1 overflow-y-auto">
          {/* Friends Stories Section */}
          <div className="p-4 border-b">
            <h3 className="font-bold text-gray-800 mb-4">Friends' Stories</h3>
            <div className="space-y-4">
              {friends.map(friend => (
                <div key={friend.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full border-2 border-purple-500 p-0.5">
                      <div className="w-full h-full rounded-full overflow-hidden">
                        <img src={friend.image} alt={friend.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-purple-500 rounded-full border-2 border-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{friend.name}</h4>
                    <p className="text-xs text-gray-500">Posted {friend.time} ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discover Section */}
          <div className="p-4">
            <h3 className="font-bold text-gray-800 mb-4">Discover</h3>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-lg overflow-hidden shadow-sm">
                  <div className="aspect-video bg-gray-100 relative">
                    <iframe 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                      alt="Discover" 
                      className="w-full h-full object-cover" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                      <p className="text-white text-sm font-medium">Trending Story</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For You Section */}
          <div className="p-4 border-t">
            <h3 className="font-bold text-gray-800 mb-4">For You</h3>
            <div className="space-y-4">
              {friends.map(friend => (
                <div key={`subscription-${friend.id}`} className="flex items-center space-x-3">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                    <img src={friend.image} alt={friend.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{friend.name}'s Show</h4>
                    <p className="text-xs text-gray-500">New episode available</p>
                    <button className="mt-2 text-sm text-blue-500 font-medium">Watch Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'chat':
        return <ChatScreen />;
      case 'map':
        return (
          <div className="h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509198!2d144.9537353153163!3d-37.81627997975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11f3b3%3A0x5045675218ceed0!2sMelbourne%20CBD%2C%20Melbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1633031234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        );
      case 'camera':
        return (
          <div className="flex items-center justify-center h-full">
            <video ref={videoRef} autoPlay className="w-full h-full" />
            <button onClick={startCamera} className="absolute bottom-4 bg-blue-500 text-white rounded-full px-4 py-2">
              Start Camera
            </button>
          </div>
        );
      case 'stories':
        return <StoriesScreen />;
      case 'spotlight':
        return <SpotlightScreen />;
      default:
        return <ChatScreen />;
    }
  };

  const startCamera = async () => {
    if (videoRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleAdminToggle = () => {
    setIsAdminVisible(prev => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-400">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhMQZ4EQx0IctcptoeK9yxdh5qjTT6H4guwQ&s" alt="Splash Logo" className="w-24 h-24" />
      </div>
    );
  }

  const SpotlightScreen = () => (
    <div className="h-full bg-white flex flex-col overflow-y-auto">
      {/* Top Navigation */}
      <div className="p-4 flex justify-between items-center border-b">
        <div className="text-sm font-semibold text-gray-500">Following</div>
        <div className="text-lg font-bold">Spotlight</div>
        <div className="text-sm font-semibold text-gray-500">Trending</div>
      </div>

      {/* Spotlight Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Single Spotlight Post */}
        <div className="relative h-[calc(100vh-8rem)] bg-black">
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            alt="Spotlight content" 
            className="w-full h-full object-cover" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
          
          {/* Overlay Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            {/* User Info */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/api/placeholder/40/40" alt="User" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold">@username</h4>
                <p className="text-gray-200 text-sm">Original Audio</p>
              </div>
              <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">
                Follow
              </button>
            </div>

            {/* Caption */}
            <p className="text-white mb-4">
              Check out this amazing view! 🌟 #SpotlightTime #Trending
            </p>

            {/* Interaction Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="text-white flex flex-col items-center">
                  <div className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center">
                    ❤️
                  </div>
                  <span className="text-xs mt-1">326.5K</span>
                </button>
                <button className="text-white flex flex-col items-center">
                  <div className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center">
                    💬
                  </div>
                  <span className="text-xs mt-1">1.2K</span>
                </button>
                <button className="text-white flex flex-col items-center">
                  <div className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center">
                    ⤴️
                  </div>
                  <span className="text-xs mt-1">Share</span>
                </button>
              </div>
              <button className="text-white flex flex-col items-center">
                <div className="w-8 h-8 bg-black/40 rounded-full flex items-center justify-center">
                  ⚡
                </div>
                <span className="text-xs mt-1">Remix</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center">
        <img src="https://helios-i.mashable.com/imagery/articles/062xtbp9K05XUiYf9heKk3p/hero-image.fill.size_1200x1200.v1632873909.png" alt="Icon" className="w-8 h-8 rounded-full" />
        <button onClick={handleSearchToggle} className="ml-2">
          <Search className="w-6 h-6 text-gray-500" />
        </button>
        {isSearchOpen && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full p-2 ml-2"
            placeholder="Search..."
          />
        )}
        <div className="flex-1 text-center">
          <h1 className="text-lg font-bold">Chat</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={handleAdminToggle} className="text-gray-500">
            Admin
          </button>
          <Users className="w-6 h-6 text-gray-500" />
          <MoreHorizontal className="w-6 h-6 text-gray-500" />
        </div>
      </div>

      {/* Admin Section */}
      {isAdminVisible && (
        <div className="p-4 bg-gray-100">
          <h2 className="font-bold">Admin Panel</h2>
          {/* Add admin functionalities here */}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderActiveScreen()}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {friends
            .filter(friend => friend.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(friend => (
              <div key={friend.id} className="flex items-center space-x-3 cursor-pointer" onClick={() => handleFriendClick(friend)}>
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                  <img src={friend.image} alt={friend.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{friend.name}</h3>
                  <p className="text-sm text-gray-500">{friend.message} • {friend.time}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t flex justify-around items-center p-4">
        <button 
          onClick={() => setActiveScreen('map')} 
          className={`flex flex-col items-center ${activeScreen === 'map' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Map className="w-6 h-6" />
          <span className="text-xs mt-1">Map</span>
        </button>
        <button 
          onClick={() => setActiveScreen('chat')} 
          className={`flex flex-col items-center ${activeScreen === 'chat' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs mt-1">Chat</span>
        </button>
        <button 
          onClick={() => setActiveScreen('camera')} 
          className={`flex flex-col items-center ${activeScreen === 'camera' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Camera className="w-6 h-6" />
          <span className="text-xs mt-1">Camera</span>
        </button>
        <button 
          onClick={() => setActiveScreen('stories')} 
          className={`flex flex-col items-center ${activeScreen === 'stories' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs mt-1">Stories</span>
        </button>
        <button 
          onClick={() => setActiveScreen('spotlight')} 
          className={`flex flex-col items-center ${activeScreen === 'spotlight' ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Play className="w-6 h-6" />
          <span className="text-xs mt-1">Spotlight</span>
        </button>
      </div>
    </div>
  );
};

export default SnapchatStyleApp;