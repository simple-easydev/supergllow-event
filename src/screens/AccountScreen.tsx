import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AccountScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-300 to-purple-900 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pt-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#26275A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          onClick={() => navigate('/create')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Create new party"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="#26275A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Party Card */}
      <div className="bg-gradient-to-br from-orange-200/60 to-orange-300/60 backdrop-blur-md rounded-3xl overflow-hidden mb-6 shadow-lg">
        <div className="relative h-64 bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&auto=format&fit=crop)'}}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl font-bold font-heading mb-3">Sam's Superhero Party</h1>
            <div className="flex items-center gap-2 mb-2">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 8H17M7 2V4M13 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-base">Jun 14, 1:00 pm</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M16 16C16 13.2386 13.3137 11 10 11C6.68629 11 4 13.2386 4 16" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span className="text-base">Riverside Park</span>
              </div>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M10 6V10L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span className="text-base">31°</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Invite Settings */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6">
        <h2 className="text-white text-xl font-semibold font-heading mb-4">Guest Invite Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-white text-base">Allow additional guests</span>
            <button className="w-14 h-8 bg-white rounded-full relative transition-colors">
              <div className="absolute left-1 top-1 w-6 h-6 bg-slate-300 rounded-full transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white text-base">Collect Dietaries</span>
            <button className="w-14 h-8 bg-white rounded-full relative transition-colors">
              <div className="absolute left-1 top-1 w-6 h-6 bg-slate-300 rounded-full transition-transform" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white text-base">Require parent attendance</span>
            <button className="w-14 h-8 bg-white rounded-full relative transition-colors">
              <div className="absolute left-1 top-1 w-6 h-6 bg-slate-300 rounded-full transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Send Link Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 mb-6">
        <div className="flex gap-2 mb-4">
          <button className="flex-1 bg-blue-950 text-white py-3 px-4 rounded-2xl font-medium">
            Send Link
          </button>
          <button className="flex-1 text-white/50 py-3 px-4 rounded-2xl font-medium">
            Build Guest List
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2 text-white mb-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 14C12.2091 14 14 12.2091 14 10C14 7.79086 12.2091 6 10 6C7.79086 6 6 7.79086 6 10C6 12.2091 7.79086 14 10 14Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 14L18 18M6 14L2 18M14 6L18 2M6 6L2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-base">Send RSVP link</span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <button className="flex flex-col items-center gap-2 bg-blue-950 rounded-2xl py-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L10.89 13.26C11.5391 13.6761 12.4609 13.6761 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#66FFB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-sm">Email</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-blue-950 rounded-2xl py-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H15L12 19L9 16Z" stroke="#66FFB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-sm">Text</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-blue-950 rounded-2xl py-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H9M15 4H19C20.1046 4 21 4.89543 21 6V10M21 14V19C21 20.1046 20.1046 21 19 21H14" stroke="#66FFB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-sm">Copy</span>
            </button>
            <button className="flex flex-col items-center gap-2 bg-blue-950 rounded-2xl py-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59 13.51L6 16.1V18H7.9L10.49 15.41M11 13.95L12.52 12.43L13.72 11.23M8.59 13.51L11.95 10.15L12.52 9.58L13.72 11.23M8.59 13.51L13.72 11.23M20 12.66L17.41 10.07L15.82 11.66M14.76 8L17.41 10.65L15.82 12.24" stroke="#66FFB8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-white text-sm">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Done Button */}
      <button className="w-full bg-emerald-300 text-blue-950 py-4 px-6 rounded-3xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg mb-4">
        Done
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <p className="text-center text-white/60 text-sm px-8">
        You can manage guests and resend invitations anytime from the event page
      </p>
    </div>
  );
};

export default AccountScreen;
