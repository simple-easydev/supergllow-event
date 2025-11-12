import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditIcon, ArrowRightIcon } from '@/components/icons';

const SLIDER_IMAGES = [
  {
    image: '/fa64ce12aac0ffb262ee5862d03bfcf880785c1a copy.png',
    category: 'Video',
    title: 'How does it work'
  },
  {
    image: '/f98f7181bab27234c162ea67f31c5da27cff7fd6 copy.png',
    category: 'Customers',
    title: 'Our customers love it'
  },
  {
    image: '/08b8d89c15adcab9f66ab9e2d3844e93ebeb5079.jpg',
    category: 'Example invite',
    title: 'See it for yourself'
  }
];

export const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-gradient-to-b from-[#7FFFD4] via-[#20B2AA] to-[#1a2942] min-h-screen">
      <div style={{ height: '80px' }}></div>
      <div className="px-6" style={{ marginTop: '16px' }}>
        <h1
          className="text-center"
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: '30px',
            lineHeight: '36px',
            letterSpacing: '0px',
            color: '#26275A'
          }}
        >
          Superglow
        </h1>
      </div>

      {/* Slider Section */}
      <div style={{ marginTop: '16px' }}>
        <div
          ref={scrollRef}
          className="overflow-x-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            userSelect: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollBehavior: 'smooth'
          }}
        >
          <div className="flex gap-4" style={{ paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px', minWidth: 'max-content' }}>
            {SLIDER_IMAGES.map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 rounded-2xl overflow-hidden shadow-lg relative"
                style={{
                  width: '252px',
                  height: '315px'
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover pointer-events-none"
                />
                <div className="absolute inset-0 flex flex-col pointer-events-none" style={{ padding: '11.2px', gap: '5.6px' }}>
                  <div className="w-fit">
                    <span
                      className="text-white text-center"
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 500,
                        fontSize: '12.6px',
                        lineHeight: '19.6px',
                        letterSpacing: '0px'
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <div className="flex-1"></div>
                  <div
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.01)',
                      borderRadius: '11.2px',
                      backdropFilter: 'blur(5.6px)',
                      WebkitBackdropFilter: 'blur(5.6px)',
                      width: '229.6px',
                      height: '42.8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 500,
                        fontSize: '21px',
                        lineHeight: '25.2px',
                        letterSpacing: '0px',
                        color: '#FFFFFF'
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-6" style={{ marginTop: '16px' }}>
        <p
          className="text-center"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '26px',
            letterSpacing: '0px',
            color: '#FFFFFF'
          }}
        >
          Create beautiful invitations for your <span style={{ fontWeight: 500 }}>daughters 4th birthday</span>. Anyone can receive invitations. Create and send invitation free, no strings attached.
        </p>
      </div>

      {/* Email Input Section */}
      <div className="flex justify-center" style={{ marginTop: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 12px',
            gap: '10px',
            width: '361px',
            height: '56px',
            borderRadius: '0px'
          }}
        >
          <div
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '4px 12px',
              gap: '12px',
              width: '337px',
              height: '36px',
              borderRadius: '8px',
              flexGrow: 1
            }}
          >
            <span
              style={{
                width: '148px',
                height: '19px',
                fontFamily: 'Inter',
                fontStyle: 'normal',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',
                color: '#FFFFFF',
                flexGrow: 0
              }}
            >
              john@example.com
            </span>
            <div
              style={{
                width: '11.2px',
                height: '11.2px',
                borderRadius: '14px',
                flexGrow: 0
              }}
            >
              <EditIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="flex justify-center" style={{ marginTop: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
        <button
          onClick={() => navigate('/create')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '16px 24px',
            gap: '12px',
            width: '280px',
            height: '40px',
            background: '#66FFB8',
            borderRadius: '28px',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0px',
            color: '#26275A'
          }}
        >
          Create your party Invite
          <ArrowRightIcon />
        </button>
      </div>

      {/* Terms Text */}
      <div className="flex justify-center" style={{ marginTop: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
        <p
          style={{
            width: '302px',
            height: '32px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '16px',
            letterSpacing: '0px',
            textAlign: 'center',
            color: '#64748B',
            margin: 0
          }}
        >
          By creating your invite, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {/* Learn More Button */}
      <div className="flex justify-center" style={{ marginTop: '16px', paddingLeft: '16px', paddingRight: '16px' }}>
        <button
          onClick={() => window.open('https://superglow.com', '_blank')}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0px',
            textAlign: 'center',
            color: '#FFFFFF',
            margin: 0,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Learn more about Superglow
        </button>
      </div>
    </div>
  );
};
