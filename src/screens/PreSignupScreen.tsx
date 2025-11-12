import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, LogoIcon, XIcon } from '@/components/icons';

interface PreSignupScreenProps {
  onClose?: () => void;
}

export const PreSignupScreen: React.FC<PreSignupScreenProps> = ({ onClose }) => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const navigate = useNavigate();

  if (showSignupForm) {
    return (
      <div className="w-full py-8 px-6 flex flex-col items-center gap-6 relative rounded-3xl overflow-hidden bg-white max-w-md">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-blue-950/10 rounded-full transition-colors z-10"
            aria-label="Close dialog"
          >
            <XIcon className="w-5 h-5" />
          </button>
        )}

        <div className="w-full flex flex-col items-center gap-6">
          <div className="w-full flex flex-col items-center gap-2">
            <h2 className="text-center text-blue-950 text-2xl font-semibold font-heading leading-8">
              Sign Up for Superglow
            </h2>
            <p className="text-center text-slate-500 text-base leading-6">
              Create your account to continue
            </p>
          </div>

          <form className="w-full flex flex-col gap-4" onSubmit={(e) => {
            e.preventDefault();
            // Close the dialog and navigate to account page
            if (onClose) onClose();
            navigate('/account');
          }}>
            <div className="flex flex-col gap-2">
              <label htmlFor="fullName" className="text-blue-950 text-sm font-medium leading-5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 10C12.0711 10 13.75 8.32107 13.75 6.25C13.75 4.17893 12.0711 2.5 10 2.5C7.92893 2.5 6.25 4.17893 6.25 6.25C6.25 8.32107 7.92893 10 10 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.0834 17.5C17.0834 14.2783 13.8726 11.6666 10.0001 11.6666C6.12758 11.6666 2.91675 14.2783 2.91675 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-blue-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-blue-950 text-sm font-medium leading-5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6.66675L9.0755 11.0501C9.63533 11.4237 10.3647 11.4237 10.9245 11.0501L17.5 6.66675M4.16667 15.8334H15.8333C16.7538 15.8334 17.5 15.0872 17.5 14.1667V5.83341C17.5 4.91294 16.7538 4.16675 15.8333 4.16675H4.16667C3.24619 4.16675 2.5 4.91294 2.5 5.83341V14.1667C2.5 15.0872 3.24619 15.8334 4.16667 15.8334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-blue-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full h-12 px-6 py-3 bg-emerald-300 rounded-3xl flex justify-center items-center gap-2 shadow-[0px_4px_12px_rgba(102,255,184,0.3)] hover:shadow-[0px_6px_16px_rgba(102,255,184,0.4)] transition-shadow"
            >
              <span className="text-blue-950 text-sm font-medium leading-5">Create Account</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334" stroke="#26275A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <p className="text-center text-slate-500 text-xs leading-4">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-4 flex flex-col items-center gap-6 relative rounded-3xl overflow-hidden bg-white">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-0 right-0 p-2 hover:bg-blue-950/10 rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}

      <LogoIcon />

      <div className="w-full flex flex-col items-center gap-4 px-4">
        <h2 className="text-center text-blue-950 text-2xl font-semibold font-heading leading-8">
          Create Your Superglow Account
        </h2>
        <p className="text-center text-slate-500 text-base leading-6">
          Join Superglow to send invitations, track RSVPs, and manage all your events in one beautiful dashboard.
        </p>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div className="w-full p-4 bg-green-50 rounded-[10px] border border-emerald-300/20 flex items-start gap-3">
          <div className="size-8 bg-emerald-300 rounded-full flex justify-center items-center flex-shrink-0">
            <span className="text-blue-950 text-lg">✨</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-blue-950 text-base font-medium leading-6">Beautiful Invitations</div>
            <div className="text-slate-500 text-sm leading-5">Create & send stunning custom invites</div>
          </div>
        </div>

        <div className="w-full p-4 bg-green-50 rounded-[10px] border border-emerald-300/20 flex items-start gap-3">
          <div className="size-8 bg-emerald-300 rounded-full flex justify-center items-center flex-shrink-0">
            <span className="text-blue-950 text-lg">📊</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-blue-950 text-base font-medium leading-6">See RSVPs</div>
            <div className="text-slate-500 text-sm leading-5">See who's coming in real-time</div>
          </div>
        </div>

        <div className="w-full p-4 bg-green-50 rounded-[10px] border border-emerald-300/20 flex items-start gap-3">
          <div className="size-8 bg-emerald-300 rounded-full flex justify-center items-center flex-shrink-0">
            <span className="text-blue-950 text-lg">🎁</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-blue-950 text-base font-medium leading-6">Manage Thank You's</div>
            <div className="text-slate-500 text-sm leading-5">All your events in one dashboard</div>
          </div>
        </div>

        <div className="w-full p-4 bg-green-50 rounded-[10px] border border-emerald-300/20 flex items-start gap-3">
          <div className="size-8 bg-emerald-300 rounded-full flex justify-center items-center flex-shrink-0">
            <span className="text-blue-950 text-lg">🎁</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-blue-950 text-base font-medium leading-6">Create lasting memories</div>
            <div className="text-slate-500 text-sm leading-5">Share all of the captured memories</div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setShowSignupForm(true)}
        className="w-full h-10 px-6 py-2 bg-emerald-300 rounded-3xl flex justify-center items-center gap-2.5"
      >
        <span className="text-blue-950 text-sm font-medium leading-5">Get Started</span>
        <ArrowRightIcon/>
      </button>

      <p className="text-center text-slate-500 text-xs leading-4">
        Free forever • No credit card required
      </p>
    </div>
  );
};

export default PreSignupScreen;
