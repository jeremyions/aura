'use client';

import Head from 'next/head';
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function Chat() {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('alpha-1');

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(opt => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const models = [
    { id: 'alpha-1', name: 'α-1' },
    { id: 'omega-1', name: 'Ω-1' }
  ];

  const options = [
    { icon: 'fa-code', text: 'Code', color: '#4f46e5', hoverColor: '#4338ca' },
    { icon: 'fa-chart-bar', text: 'Analyze Data', color: '#059669', hoverColor: '#047857' },
    { icon: 'fa-file-alt', text: 'Summarize Text', color: '#db2777', hoverColor: '#be185d' },
    { icon: 'fa-lightbulb', text: 'Make a Plan', color: '#3b82f6', hoverColor: '#2563eb' },
    { icon: 'fa-ellipsis-h', text: 'More', color: '#9333ea', hoverColor: '#7e22ce' }
  ];

  const chats = {
    today: [
      { id: 1, name: 'Femboy Fitness Ad', icon: 'fa-dumbbell' },
      { id: 2, name: 'AI Reinforcement Learning', icon: 'fa-robot' },
      { id: 3, name: 'Protein and Hair Health', icon: 'fa-flask' }
    ],
    yesterday: [
      { id: 4, name: 'AI News Sources', icon: 'fa-newspaper' },
      { id: 5, name: 'Social Media Ad Concepts', icon: 'fa-hashtag' },
      { id: 6, name: 'M2E Sparse Activation', icon: 'fa-network-wired' }
    ],
    previous: [
      { id: 7, name: 'AI Features Plan', icon: 'fa-list-check' },
      { id: 8, name: 'NVIDIA Revenue Breakdown', icon: 'fa-chart-line' }
    ]
  };

  const projects = [
    { id: 'chatgpt', name: 'ChatGPT', icon: 'fa-message' },
    { id: 'sora', name: 'Sora', icon: 'fa-video' },
    { id: 'photo1', name: 'Photo Realistic Image', icon: 'fa-image' },
    { id: 'law', name: 'Australian Law', icon: 'fa-scale-balanced' },
    { id: 'photo2', name: 'Photo Realistic Image 2', icon: 'fa-image' }
  ];

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Please sign in to access the chat.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex',
      height: '100vh',
      backgroundColor: '#1a1b1e',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Side Menu */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: isSideMenuOpen ? 0 : '-320px',
        width: '320px',
        height: '100%',
        backgroundColor: '#202123',
        transition: 'left 0.3s ease',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '0.75rem 0.5rem',
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button
            onClick={toggleSideMenu}
            style={{
              background: 'none',
              border: '1px solid #4A4B50',
              borderRadius: '0.375rem',
              color: '#ECECF1',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
          >
            <i className="fas fa-bars"></i>
          </button>
          <button
            onClick={() => console.log('New project')}
            style={{
              background: 'none',
              border: '1px solid #4A4B50',
              borderRadius: '0.375rem',
              color: '#ECECF1',
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>

        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Projects Section */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ 
              padding: '0.5rem', 
              fontSize: '0.8rem', 
              color: '#8e8ea0',
              fontWeight: '500',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Projects
            </div>
            {projects.map(project => (
              <div key={project.id} style={{
                padding: '0.75rem 0.5rem',
                color: '#ECECF1',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                borderRadius: '0.375rem',
                fontSize: '0.9rem',
                ':hover': {
                  backgroundColor: '#2A2B32'
                }
              }}>
                <i className={`fas ${project.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
                {project.name}
              </div>
            ))}
          </div>

          {/* Today's Chats */}
          <div>
            <div style={{ 
              padding: '0.5rem', 
              fontSize: '0.8rem', 
              color: '#8e8ea0',
              fontWeight: '500'
            }}>
              Today
            </div>
            {chats.today.map(chat => (
              <div key={chat.id} style={{
                padding: '0.75rem 0.5rem',
                color: '#ECECF1',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                borderRadius: '0.375rem',
                fontSize: '0.9rem',
                ':hover': {
                  backgroundColor: '#2A2B32'
                }
              }}>
                <i className={`fas ${chat.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
                {chat.name}
              </div>
            ))}
          </div>

          {/* Yesterday's Chats */}
          <div>
            <div style={{ 
              padding: '0.5rem', 
              fontSize: '0.8rem', 
              color: '#8e8ea0',
              fontWeight: '500'
            }}>
              Yesterday
            </div>
            {chats.yesterday.map(chat => (
              <div key={chat.id} style={{
                padding: '0.75rem 0.5rem',
                color: '#ECECF1',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                borderRadius: '0.375rem',
                fontSize: '0.9rem',
                ':hover': {
                  backgroundColor: '#2A2B32'
                }
              }}>
                <i className={`fas ${chat.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
                {chat.name}
              </div>
            ))}
          </div>

          {/* Previous 7 Days */}
          <div>
            <div style={{ 
              padding: '0.5rem', 
              fontSize: '0.8rem', 
              color: '#8e8ea0',
              fontWeight: '500'
            }}>
              Previous 7 Days
            </div>
            {chats.previous.map(chat => (
              <div key={chat.id} style={{
                padding: '0.75rem 0.5rem',
                color: '#ECECF1',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                borderRadius: '0.375rem',
                fontSize: '0.9rem',
                ':hover': {
                  backgroundColor: '#2A2B32'
                }
              }}>
                <i className={`fas ${chat.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
                {chat.name}
              </div>
            ))}
          </div>

          {/* Explore GPTs */}
          <div style={{
            marginTop: 'auto',
            borderTop: '1px solid #4A4B50',
            paddingTop: '0.5rem'
          }}>
            <div style={{
              padding: '0.75rem 0.5rem',
              color: '#ECECF1',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
              ':hover': {
                backgroundColor: '#2A2B32'
              }
            }}>
              <i className="fas fa-compass" style={{ width: '20px', textAlign: 'center' }}></i>
              Explore GPTs
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          gap: '1rem',
          borderBottom: '1px solid #2D2D2D'
        }}>
          <button 
            onClick={toggleSideMenu}
            style={{
              background: 'none',
              border: 'none',
              color: '#8e8ea0',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <i className="fas fa-grip-lines" style={{ fontSize: '1.2rem' }}></i>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button 
              onClick={() => console.log('New chat')}
              style={{
                background: '#2D2D2D',
                border: 'none',
                color: '#8e8ea0',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              <i className="fas fa-plus" style={{ fontSize: '0.9rem' }}></i>
              <span>New Chat</span>
            </button>

            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              style={{
                backgroundColor: '#2D2D2D',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              {models.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ flex: 1 }}></div>
        </div>

        {/* Main Content Area */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1.5rem',
          gap: '1.5rem'
        }}>
          <Head>
            <title>Auna - Your Human Ascension Companion</title>
            <link
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
              rel="stylesheet"
            />
          </Head>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 'calc(100vh - 100px)', 
            flexDirection: 'column', 
            textAlign: 'center', 
            backgroundColor: '#1a1b1e',
            gap: '1.5rem',
            marginTop: '-100px'
          }}>
            <h1 style={{ 
              color: 'var(--text-light)', 
              fontSize: '2.5rem',
              fontWeight: '600',
              margin: 0,
              position: 'relative',
              zIndex: 1
            }}>
              What can I help with?
            </h1>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              width: '100%', 
              maxWidth: '600px', 
              backgroundColor: '#2D2D2D', 
              borderRadius: '1.5rem', 
              padding: '0.75rem',
              gap: '0.75rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%', 
                gap: '0.5rem',
                borderBottom: '1px solid #4A4B50',
                paddingBottom: '0.75rem'
              }}>
                <input
                  type="text"
                  placeholder="Message Auna"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ 
                    flex: 1, 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--text-light)', 
                    fontSize: '1.1rem', 
                    outline: 'none',
                    padding: '0.5rem 0'
                  }}
                />
                <button
                  onClick={handleSend}
                  style={{ 
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#4f46e5',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  <i className="fas fa-paper-plane" style={{ fontSize: '0.9rem' }}></i>
                </button>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '1.5rem', 
                alignItems: 'center',
                width: '100%',
                padding: '0.25rem 0'
              }}>
                <div 
                  onClick={() => handleOptionClick('attach')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem', 
                    cursor: 'pointer',
                    color: selectedOptions.includes('attach') ? '#4f46e5' : '#8e8ea0',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <i className="fas fa-paperclip" style={{ fontSize: '1.1rem' }}></i>
                  <span style={{ fontSize: '0.9rem' }}>Attach</span>
                </div>
                <div 
                  onClick={() => handleOptionClick('search')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem', 
                    cursor: 'pointer',
                    color: selectedOptions.includes('search') ? '#4f46e5' : '#8e8ea0',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <i className="fas fa-globe" style={{ fontSize: '1.1rem' }}></i>
                  <span style={{ fontSize: '0.9rem' }}>Search</span>
                </div>
                <div 
                  onClick={() => handleOptionClick('image generation')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem', 
                    cursor: 'pointer',
                    color: selectedOptions.includes('image generation') ? '#d97706' : '#8e8ea0',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <i className="fas fa-image" style={{ fontSize: '1.1rem' }}></i>
                  <span style={{ fontSize: '0.9rem' }}>Image Gen</span>
                </div>
                <div 
                  onClick={() => handleOptionClick('video generation')}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem', 
                    cursor: 'pointer',
                    color: selectedOptions.includes('video generation') ? '#dc2626' : '#8e8ea0',
                    transition: 'color 0.2s ease'
                  }}
                >
                  <i className="fas fa-video" style={{ fontSize: '1.1rem' }}></i>
                  <span style={{ fontSize: '0.9rem' }}>Video Gen</span>
                </div>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '0.75rem', 
              flexWrap: 'nowrap', 
              maxWidth: '600px',
              width: '100%',
              marginBottom: '0.5rem'
            }}>
              {options.map((option, index) => (
                <span 
                  key={index}
                  onClick={() => handleOptionClick(option.text.toLowerCase())}
                  style={{ 
                    cursor: 'pointer', 
                    padding: '0.75rem 1rem', 
                    backgroundColor: selectedOptions.includes(option.text.toLowerCase()) ? option.hoverColor : option.color,
                    borderRadius: '0.75rem',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    flex: '1',
                    justifyContent: 'center',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <i className={`fas ${option.icon}`}></i>
                  {option.text}
                </span>
              ))}
            </div>
          </div>

          <style jsx>{`
            :root {
              --star-x: 50%;
              --star-y: 50%;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
