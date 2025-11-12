import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BackgroundOption {
  id: string;
  name: string;
  emoji: string;
  imageUrl: string;
}

const backgroundOptions: BackgroundOption[] = [
  {
    id: 'birthday',
    name: 'Birthday',
    emoji: '🎂',
    imageUrl: 'https://images.pexels.com/photos/1729808/pexels-photo-1729808.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'wedding',
    name: 'Wedding',
    emoji: '💒',
    imageUrl: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'party',
    name: 'Party',
    emoji: '🎉',
    imageUrl: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'disco',
    name: 'Disco',
    emoji: '🪩',
    imageUrl: 'https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'superhero',
    name: 'Superhero',
    emoji: '🦸',
    imageUrl: 'https://images.pexels.com/photos/2653281/pexels-photo-2653281.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'adventure',
    name: 'Adventure',
    emoji: '🏃',
    imageUrl: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

interface BackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBackground: (background: BackgroundOption) => void;
}

export const BackgroundModal: React.FC<BackgroundModalProps> = ({ isOpen, onClose, onSelectBackground }) => {
  const [selectedBg, setSelectedBg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBackgroundClick = (bg: BackgroundOption) => {
    setSelectedBg(bg.id);
    onSelectBackground(bg);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '24px',
          width: '100%',
          height: '80vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          background: '#FFFFFF',
          borderRadius: '24px 24px 0 0',
          padding: '24px',
          display: 'flex',
          justifyContent: 'flex-end',
          flexShrink: 0
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={24} color="#64748B" strokeWidth={2} />
          </button>
        </div>

        <div style={{
          padding: '0 24px',
          flexShrink: 0
        }}>
          <h2 style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '32px',
            lineHeight: '40px',
            color: '#26275A',
            textAlign: 'center',
            margin: '0 0 16px'
          }}>
            Add Background
          </h2>

          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#64748B',
            textAlign: 'center',
            margin: '0 0 24px'
          }}>
            Select a preset background or upload your own custom photo for your event invitation.
          </p>
        </div>

        <ScrollArea style={{ flex: 1, padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 165px)',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {backgroundOptions.map((bg) => (
              <button
                key={bg.id}
                onClick={() => handleBackgroundClick(bg)}
                style={{
                  boxSizing: 'border-box',
                  position: 'relative',
                  width: '165px',
                  height: '123px',
                  border: selectedBg === bg.id ? '2px solid #66FFB8' : '2px solid rgba(38, 39, 90, 0.1)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  padding: 0,
                  background: 'transparent',
                  flex: 'none',
                  flexGrow: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                <img
                  src={bg.imageUrl}
                  alt={bg.name}
                  style={{
                    position: 'absolute',
                    width: '161.5px',
                    height: '120.12px',
                    left: '2px',
                    top: '2px',
                    objectFit: 'cover',
                    borderRadius: '0px'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  width: '161.5px',
                  height: '120.12px',
                  left: '2px',
                  top: '2px',
                  background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                  borderRadius: '0px'
                }}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '0px',
                    gap: '4px',
                    position: 'absolute',
                    width: '145.5px',
                    height: '28px',
                    left: '10px',
                    top: '86.12px',
                    borderRadius: '0px'
                  }}>
                    <span style={{
                      width: '18px',
                      height: '28px',
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '28px',
                      color: '#FFFFFF',
                      borderRadius: '0px',
                      flex: 'none',
                      order: 0,
                      flexGrow: 0
                    }}>{bg.emoji}</span>
                    <span style={{
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#FFFFFF',
                      borderRadius: '0px',
                      flex: 'none',
                      order: 1,
                      flexGrow: 0
                    }}>
                      {bg.name}
                    </span>
                  </div>
                </div>
                {selectedBg === bg.id && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#66FFB8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#26275A'
                    }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>

        <div style={{
          padding: '24px',
          flexShrink: 0
        }}>
          <button
            style={{
              width: '100%',
              padding: '20px',
              background: 'rgba(102, 255, 184, 0.1)',
              border: '2px dashed #66FFB8',
              borderRadius: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={24} color="#26275A" strokeWidth={2} />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '16px',
              color: '#26275A'
            }}>
              Upload custom photo
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
