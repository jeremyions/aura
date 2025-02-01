'use client';

import Head from 'next/head';
import { useState } from 'react';
import { useUser, UserButton } from '@clerk/nextjs';

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
      { id: 1, name: 'Understanding Contract Law', icon: 'fa-scale-balanced' },
      { id: 2, name: 'Legal Precedents Research', icon: 'fa-gavel' },
      { id: 3, name: 'Case Study Analysis', icon: 'fa-file-lines' },
      { id: 4, name: 'Court Procedure Review', icon: 'fa-landmark' },
      { id: 5, name: 'Legal Ethics Discussion', icon: 'fa-balance-scale' }
    ],
    yesterday: [
      { id: 6, name: 'Workout Plan Creation', icon: 'fa-dumbbell' },
      { id: 7, name: 'Nutrition Analysis', icon: 'fa-apple-whole' },
      { id: 8, name: 'Training Schedule', icon: 'fa-calendar-check' },
      { id: 9, name: 'Progress Tracking', icon: 'fa-chart-line' },
      { id: 10, name: 'Recovery Strategies', icon: 'fa-bed' },
      { id: 11, name: 'Supplement Review', icon: 'fa-pills' }
    ],
    previous: [
      { id: 12, name: 'AI Market Analysis', icon: 'fa-chart-pie' },
      { id: 13, name: 'Tech Trends Review', icon: 'fa-microchip' },
      { id: 14, name: 'Startup Evaluation', icon: 'fa-rocket' },
      { id: 15, name: 'Investment Strategy', icon: 'fa-money-bill-trend-up' },
      { id: 16, name: 'Competition Analysis', icon: 'fa-chess' },
      { id: 17, name: 'Future Predictions', icon: 'fa-crystal-ball' },
      { id: 18, name: 'Industry Report', icon: 'fa-file-chart-column' },
      { id: 19, name: 'Market Opportunities', icon: 'fa-bullseye' },
      { id: 20, name: 'Risk Assessment', icon: 'fa-shield-halved' },
      { id: 21, name: 'Innovation Tracking', icon: 'fa-lightbulb' }
    ]
  };

  const projects = [
    { id: 1, name: 'Australian Law', icon: 'fa-scale-balanced' },
    { id: 2, name: 'Fanboy Fitness', icon: 'fa-dumbbell' },
    { id: 3, name: 'AI News', icon: 'fa-newspaper' }
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
      {/* Top Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: '#202123',
        borderBottom: '1px solid #4A4B50',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        gap: '1rem',
        zIndex: 30
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
          onClick={() => console.log('New chat')}
          style={{
            background: 'none',
            border: '1px solid #4A4B50',
            borderRadius: '0.375rem',
            color: '#ECECF1',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem'
          }}
        >
          <i className="fas fa-plus"></i>
          New chat
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            style={{
              background: 'none',
              border: '1px solid #4A4B50',
              borderRadius: '0.375rem',
              color: '#ECECF1',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            {models.map(model => (
              <option key={model.id} value={model.id} style={{ background: '#202123' }}>
                {model.name}
              </option>
            ))}
          </select>
          
          <div style={{ 
            width: '32px', 
            height: '32px',
            borderRadius: '0.375rem',
            overflow: 'hidden'
          }}>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{
        position: 'fixed',
        top: '60px',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#1a1b1e',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        overflow: 'auto'
      }}>
        <div style={{
          maxWidth: '800px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <h1 style={{
            color: '#ECECF1',
            fontSize: window.innerWidth < 768 ? '1.75rem' : '2.5rem',
            fontWeight: '600',
            margin: 0,
            textAlign: 'center'
          }}>
            What can I help with?
          </h1>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            width: '100%', 
            maxWidth: window.innerWidth < 768 ? '100%' : '600px', 
            backgroundColor: '#2D2D2D', 
            borderRadius: '1rem', 
            padding: window.innerWidth < 768 ? '0.75rem' : '0.75rem',
            gap: '0.75rem'
          }}>
            {/* Input and Send Button */}
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
                placeholder="Message AURA"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ 
                  flex: 1, 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--text-light)', 
                  fontSize: '0.9375rem',
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
                <i className="fas fa-paper-plane" style={{ fontSize: '0.875rem' }}></i>
              </button>
            </div>
            
            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'left', 
              gap: '1.5rem',
              width: '100%',
              padding: '0 0.75rem'
            }}>
              <div 
                onClick={() => handleOptionClick('attach')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  cursor: 'pointer',
                  color: selectedOptions.includes('attach') ? '#4f46e5' : '#8e8ea0',
                  transition: 'color 0.2s ease',
                  padding: '0.25rem 0.25rem'
                }}
              >
                <i className="fas fa-paperclip" style={{ fontSize: '0.875rem' }}></i>
                <span style={{ fontSize: '0.875rem' }}>Attach</span>
              </div>
              <div 
                onClick={() => handleOptionClick('search')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  cursor: 'pointer',
                  color: selectedOptions.includes('search') ? '#4f46e5' : '#8e8ea0',
                  transition: 'color 0.2s ease',
                  padding: '0.25rem 0.25rem'
                }}
              >
                <i className="fas fa-globe" style={{ fontSize: '0.875rem' }}></i>
                <span style={{ fontSize: '0.875rem' }}>Search</span>
              </div>
              <div 
                onClick={() => handleOptionClick('image generation')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  cursor: 'pointer',
                  color: selectedOptions.includes('image generation') ? '#4f46e5' : '#8e8ea0',
                  transition: 'color 0.2s ease',
                  padding: '0.25rem 0.25rem'
                }}
              >
                <i className="fas fa-image" style={{ fontSize: '0.875rem' }}></i>
                <span style={{ fontSize: '0.875rem' }}>Image Gen</span>
              </div>
              <div 
                onClick={() => handleOptionClick('video generation')}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  cursor: 'pointer',
                  color: selectedOptions.includes('video generation') ? '#4f46e5' : '#8e8ea0',
                  transition: 'color 0.2s ease',
                  padding: '0.25rem 0.25rem'
                }}
              >
                <i className="fas fa-video" style={{ fontSize: '0.875rem' }}></i>
                <span style={{ fontSize: '0.875rem' }}>Video Gen</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '1rem'
          }}>
            <button
              onClick={() => console.log('Analyze Data')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(90deg, #2E1B4D, #4424A9)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-2px)', opacity: 0.95 }
              }}
            >
              <i className="fas fa-chart-line"></i>
              Analyze Data
            </button>
            <button
              onClick={() => console.log('Summarize Text')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(90deg, #4424A9, #6B4984)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-2px)', opacity: 0.95 }
              }}
            >
              <i className="fas fa-align-left"></i>
              Summarize Text
            </button>
            <button
              onClick={() => console.log('Make a Plan')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(90deg, #6B4984, #8A4FFF)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-2px)', opacity: 0.95 }
              }}
            >
              <i className="fas fa-list-check"></i>
              Make a Plan
            </button>
            <button
              onClick={() => console.log('Research Topic')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(90deg, #8A4FFF, #9B6B9D)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-2px)', opacity: 0.95 }
              }}
            >
              <i className="fas fa-microscope"></i>
              Research Topic
            </button>
            <button
              onClick={() => console.log('Write Code')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(90deg, #9B6B9D, #B784FF)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-2px)', opacity: 0.95 }
              }}
            >
              <i className="fas fa-code"></i>
              Write Code
            </button>
            <button
              onClick={() => console.log('Brainstorm Ideas')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(90deg, #B784FF, #FF7E5F)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-2px)', opacity: 0.95 }
              }}
            >
              <i className="fas fa-lightbulb"></i>
              Brainstorm Ideas
            </button>
            <button
              onClick={() => console.log('Explain Concept')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(90deg, #FF7E5F, #FF9D7D)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-2px)', opacity: 0.95 }
              }}
            >
              <i className="fas fa-chalkboard-teacher"></i>
              Explain Concept
            </button>
            <button
              onClick={() => console.log('Compare Options')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                background: 'linear-gradient(90deg, #FF9D7D, #FF7E5F)',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.875rem',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-2px)', opacity: 0.95 }
              }}
            >
              <i className="fas fa-code-compare"></i>
              Compare Options
            </button>
          </div>
        </div>
      </div>

      {/* Side Menu */}
      <div style={{
        position: 'fixed',
        top: '60px',
        left: isSideMenuOpen ? 0 : '-320px',
        width: '320px',
        height: 'calc(100vh - 60px)',
        backgroundColor: '#202123',
        transition: 'left 0.3s ease',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Scrollable Chat History */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Chat History Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
          </div>
        </div>

        {/* Static Projects Section */}
        <div style={{
          borderTop: '1px solid #4A4B50',
          padding: '0.75rem 0.5rem',
          backgroundColor: '#202123'
        }}>
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

        {/* Fixed Explore GPTs at bottom */}
        <div style={{
          borderTop: '1px solid #4A4B50',
          padding: '0.75rem 0.5rem',
          backgroundColor: '#202123'
        }}>
          <div style={{
            color: '#ECECF1',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer',
            borderRadius: '0.375rem',
            fontSize: '0.9rem',
            padding: '0.5rem',
            ':hover': {
              backgroundColor: '#2A2B32'
            }
          }}>
            <i className="fas fa-compass" style={{ width: '20px', textAlign: 'center' }}></i>
            Explore GPTs
          </div>
        </div>
      </div>

      <style jsx>{`
        :root {
          --star-x: 50%;
          --star-y: 50%;
        }
      `}</style>
    </div>
  );
}
