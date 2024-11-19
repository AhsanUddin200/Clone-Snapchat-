"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Map, MessageCircle, MoreHorizontal, Users, Play, Search, Plus, Settings } from 'lucide-react';

const SnapchatStyleApp = () => {
  const [activeScreen, setActiveScreen] = useState('chat');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showReply, setShowReply] = useState(false);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const friends = [
    { id: 1, name: 'Yi N', message: 'Sent', time: '2m', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxdm6KtsRZaI88FU5IJeL-7-FJ-VPwMaszJu6RAz6JWa-HpwL0_4uUMQGAP1od2tLnuHM&usqp=CAU' },
    { id: 2, name: 'Lili', message: 'Received', time: '15m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzvOtUjNCT6i_dJmp8lMVrf1Fuwo0re6dZwUTZ9vpK7d3bfZhSSGhtJb1j28Y9dUSBviw&usqp=CAU' },
    { id: 3, name: 'Team Snapchat', message: 'New Snap and Chat', time: '25m', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxgdJ5rTMSqBuShpOrU7Rha_Xafy1ECUve2MPvNGGI3qMmItV2OrvarbktsHIWVl1DM2k&usqp=CAU' },
    { id: 4, name: 'Robert Jonas', message: 'Typing...', time: '1h', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8tJeuSriHSY26Yn3cXaEyQmAU2f2_QCJ9jDFFaRcKbMj-EFKyR335b6bQq1K9RGvxxOE&usqp=CAU' },
    { id: 5, name: 'Aliza', message: 'sleep', time: '8h', image: 'data:image/jpeg;base64,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' },
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

  const handleFriendClick = (friend) => {
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