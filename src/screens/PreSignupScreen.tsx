import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, LogoIcon, XIcon } from '@/components/icons';
import { supabase } from '@/lib/supabase';

interface PreSignupScreenProps {
  onClose?: () => void;
}

export const PreSignupScreen: React.FC<PreSignupScreenProps> = ({ onClose }) => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showSigninForm, setShowSigninForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  if (showSigninForm) {
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
              Sign In to Superglow
            </h2>
            <p className="text-center text-slate-500 text-base leading-6">
              Enter your email to continue
            </p>
          </div>

          <form className="w-full flex flex-col gap-4" onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            setSuccess('');
            setIsSubmitting(true);

            try {
              // Validate email
              if (!email.trim()) {
                setError('Please enter your email');
                setIsSubmitting(false);
                return;
              }

              // Send magic link using Supabase Auth
              const { error: magicLinkError } = await supabase.auth.signInWithOtp({
                email: email.trim().toLowerCase(),
                options: {
                  emailRedirectTo: `${window.location.origin}/account-detail`,
                }
              });

              if (magicLinkError) {
                console.error('Magic link error:', magicLinkError);
                setError('Failed to send sign-in link. Please try again.');
                setIsSubmitting(false);
                return;
              }

              // Success - show confirmation message
              setSuccess('Check your email! We sent you a magic link to sign in.');
              setIsSubmitting(false);
            } catch (err) {
              console.error('Error sending magic link:', err);
              setError('An unexpected error occurred. Please try again.');
              setIsSubmitting(false);
            }
          }}>
            {error && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="w-full p-3 bg-green-50 border border-emerald-300 rounded-xl text-green-700 text-sm">
                {success}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label htmlFor="signin-email" className="text-blue-950 text-sm font-medium leading-5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 6.66675L9.0755 11.0501C9.63533 11.4237 10.3647 11.4237 10.9245 11.0501L17.5 6.66675M4.16667 15.8334H15.8333C16.7538 15.8334 17.5 15.0872 17.5 14.1667V5.83341C17.5 4.91294 16.7538 4.16675 15.8333 4.16675H4.16667C3.24619 4.16675 2.5 4.91294 2.5 5.83341V14.1667C2.5 15.0872 3.24619 15.8334 4.16667 15.8334Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  id="signin-email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-blue-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || !!success}
              className="w-full h-12 px-6 py-3 bg-emerald-300 rounded-3xl flex justify-center items-center gap-2 shadow-[0px_4px_12px_rgba(102,255,184,0.3)] hover:shadow-[0px_6px_16px_rgba(102,255,184,0.4)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-blue-950 text-sm font-medium leading-5">
                {isSubmitting ? 'Sending Link...' : success ? 'Link Sent!' : 'Send Magic Link'}
              </span>
              {!isSubmitting && !success && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334" stroke="#26275A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            <div className="w-full text-center">
              <button
                type="button"
                onClick={() => {
                  setShowSigninForm(false);
                  setShowSignupForm(true);
                  setError('');
                  setEmail('');
                }}
                className="text-blue-950 text-sm font-medium leading-5 hover:underline"
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

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

          <form className="w-full flex flex-col gap-4" onSubmit={async (e) => {
            e.preventDefault();
            setError('');
            setSuccess('');
            setIsSubmitting(true);

            try {
              // Validate inputs
              if (!fullName.trim() || !email.trim()) {
                setError('Please fill in all fields');
                setIsSubmitting(false);
                return;
              }

              // Check if email already exists in users table
              const { data: existingUser, error: checkError } = await supabase
                .from('users')
                .select('email')
                .eq('email', email.trim().toLowerCase())
                .maybeSingle();

              if (checkError) {
                console.error('Error checking user:', checkError);
                setError('Failed to verify email. Please try again.');
                setIsSubmitting(false);
                return;
              }

              if (existingUser) {
                setError('This email is already registered. Please sign in instead.');
                setIsSubmitting(false);
                return;
              }

              // Send verification link using Supabase Auth
              const { error: signUpError } = await supabase.auth.signInWithOtp({
                email: email.trim().toLowerCase(),
                options: {
                  emailRedirectTo: `${window.location.origin}/account-detail`,
                  data: {
                    user_name: fullName.trim(),
                  }
                }
              });

              if (signUpError) {
                console.error('Sign up error:', signUpError);
                setError('Failed to create account. Please try again.');
                setIsSubmitting(false);
                return;
              }

              // Success - show confirmation message
              setSuccess('Check your email! We sent you a verification link to complete your sign up.');
              setIsSubmitting(false);
            } catch (err) {
              console.error('Error creating user:', err);
              setError('An unexpected error occurred. Please try again.');
              setIsSubmitting(false);
            }
          }}>
            {error && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="w-full p-3 bg-green-50 border border-emerald-300 rounded-xl text-green-700 text-sm">
                {success}
              </div>
            )}

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
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-blue-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl text-blue-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting || !!success}
              className="w-full h-12 px-6 py-3 bg-emerald-300 rounded-3xl flex justify-center items-center gap-2 shadow-[0px_4px_12px_rgba(102,255,184,0.3)] hover:shadow-[0px_6px_16px_rgba(102,255,184,0.4)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-blue-950 text-sm font-medium leading-5">
                {isSubmitting ? 'Sending Link...' : success ? 'Link Sent!' : 'Create Account'}
              </span>
              {!isSubmitting && !success && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334" stroke="#26275A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>

            <p className="text-center text-slate-500 text-xs leading-4">
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>

            <div className="w-full text-center">
              <button
                type="button"
                onClick={() => {
                  setShowSignupForm(false);
                  setShowSigninForm(true);
                  setError('');
                  setFullName('');
                  setEmail('');
                }}
                className="text-blue-950 text-sm font-medium leading-5 hover:underline"
              >
                Already have an account? Sign In
              </button>
            </div>
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

      <div className="w-full flex flex-col gap-3">
        <button 
          onClick={() => setShowSignupForm(true)}
          className="w-full h-10 px-6 py-2 bg-emerald-300 rounded-3xl flex justify-center items-center gap-2.5"
        >
          <span className="text-blue-950 text-sm font-medium leading-5">Get Started</span>
          <ArrowRightIcon/>
        </button>

        <button 
          onClick={() => setShowSigninForm(true)}
          className="w-full h-10 px-6 py-2 bg-white border border-blue-950/20 rounded-3xl flex justify-center items-center gap-2.5 hover:bg-blue-950/5 transition-colors"
        >
          <span className="text-blue-950 text-sm font-medium leading-5">Sign In</span>
        </button>
      </div>

      <p className="text-center text-slate-500 text-xs leading-4">
        Free forever • No credit card required
      </p>
    </div>
  );
};

export default PreSignupScreen;
