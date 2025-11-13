import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyCard } from '@/components/PartyCard';
import { supabase, Party } from '@/lib/supabase';

export const AccountDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [parties, setParties] = useState<Party[]>([]);

  useEffect(() => {
    const fetchUserParties = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          console.log('No valid session, redirecting to home');
          navigate('/', { replace: true });
          return;
        }

        // Session is valid, user is authenticated
        console.log('=== AUTHENTICATED USER ===');
        console.log('Session:', session);
        console.log('User ID:', session.user.id);
        console.log('Email:', session.user.email);
        console.log('User metadata:', session.user.user_metadata);
        console.log('==========================');
        
        // Fetch user's parties
        const { data: partiesData, error: partiesError } = await supabase
          .from('parties')
          .select('*')
          .eq('user_id', session.user.id)
          .order('event_date', { ascending: true });

        if (partiesError) {
          console.error('Error fetching parties:', partiesError);
        } else {
          console.log('Fetched parties:', partiesData);
          setParties(partiesData || []);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error checking auth:', err);
        navigate('/', { replace: true });
      }
    };

    fetchUserParties();
  }, [navigate]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(180deg, #66FFB8 0%, #26275A 100%)',
        }}
      >
        <div className="text-white text-xl font-heading">Loading...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0px',
        gap: '0px',
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: 'linear-gradient(180deg, #66FFB8 0%, #26275A 100%), #FFFFFF',
        borderRadius: '0px'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0px 32px',
          gap: '63.24px',
          width: '100%',
          height: '80px',
          borderRadius: '0px',
          flex: 'none',
          order: 0,
          alignSelf: 'stretch',
          flexGrow: 0
        }}
      >
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontStyle: 'normal',
                fontWeight: 500,
                fontSize: '18px',
                lineHeight: '23px',
                color: '#26275A'
              }}
            >
              Upcoming
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="#26275A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dropdown Modal */}
          {isDropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                onClick={() => setIsDropdownOpen(false)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 40
                }}
              />
              
              {/* Dropdown Content */}
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: '8px',
                  width: '144px',
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '8px',
                  outline: '0.5px solid rgba(240, 253, 244, 1)',
                  outlineOffset: '-0.5px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  zIndex: 50
                }}
              >
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    color: '#26275A',
                    padding: 0
                  }}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    color: '#26275A',
                    padding: 0
                  }}
                >
                  Past
                </button>
                <div style={{ height: 0, outline: '0.5px solid rgba(38, 39, 90, 0.2)', outlineOffset: '-0.25px' }} />
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    color: '#26275A',
                    padding: 0
                  }}
                >
                  Hosting
                </button>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    color: '#26275A',
                    padding: 0
                  }}
                >
                  Invites
                </button>
              </div>
            </>
          )}
        </div>

        <button
          onClick={() => navigate('/create')}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center'
          }}
          aria-label="Create new party"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M5 12H19" stroke="#26275A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Content Area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0px 0px 16px',
          width: '100%',
          flex: 1,
          overflow: 'auto'
        }}
      >
        <h1
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '30px',
            textAlign: 'center',
            color: '#26275A',
            margin: 0,
            marginTop: '12px'
          }}
        >
          Superglow
        </h1>

        {parties.length > 0 ? (
          <div style={{ width: '100%', marginTop: '12px', overflow: 'visible' }}>
            <div style={{ overflowX: 'scroll', overflowY: 'visible', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="[&::-webkit-scrollbar]:hidden">
              <div style={{ display: 'flex', gap: '16px', padding: '40px 16px 32px' }}>
                {parties.map((party) => (
                  <div key={party.id} style={{ cursor: 'pointer', flexShrink: 0, width: 'calc(100vw - 32px)' }} onClick={() => navigate(`/party/${party.id}`)}>
                    <PartyCard
                      partyName={party.party_name}
                      eventDate={party.event_date}
                      startTime={party.start_time}
                      location={party.location}
                      temperature={party.temperature || '22'}
                      coverImageUrl={party.cover_image_url || '/party-background.png'}
                      showHostLabel={true}
                      guestInitials={[]}
                      height="h-[480px]"
                    />
                  </div>
                ))}
                <div style={{ width: '8px', flexShrink: 0 }} />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', marginTop: '32px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#26275A', opacity: 0.6 }}>
              No parties yet. Create your first party!
            </p>
          </div>
        )}

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '26px',
            textAlign: 'center',
            color: '#FFFFFF',
            margin: 0,
            marginTop: '12px',
            padding: '0 16px'
          }}
        >
          Create beautiful invitations for your next event. Anyone can receive invitations. Create and send invitation free, no strings attached.
        </p>
      </div>

      {/* Bottom Tab Navigation */}
      <div className="absolute bottom-5 left-0 right-0 px-5">
        <div style={{ paddingTop: '2px', paddingBottom: '2px', paddingLeft: '3px', paddingRight: '3px' }} className="bg-white rounded-[32px] flex justify-center items-center gap-0.5">
        {/* Home - Active */}
        <button className="flex-1 px-6 py-1 bg-blue-950 rounded-[100px] flex flex-col justify-center items-center">
          <div className="size-6 flex justify-center items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M9.44072 14.4469C9.46731 14.5131 9.51354 14.5697 9.5732 14.6089C9.63286 14.6482 9.70309 14.6682 9.77447 14.6664C9.84586 14.6646 9.91497 14.6409 9.97254 14.5987C10.0301 14.5565 10.0734 14.4976 10.0965 14.4301L14.646 1.1316C14.6684 1.06958 14.6727 1.00247 14.6583 0.938109C14.644 0.873751 14.6116 0.81481 14.565 0.768185C14.5184 0.721559 14.4594 0.689176 14.3951 0.674826C14.3307 0.660475 14.2636 0.66475 14.2016 0.68715L0.903104 5.23663C0.83556 5.25979 0.776717 5.30306 0.734474 5.36063C0.692232 5.4182 0.668611 5.48732 0.666783 5.5587C0.664954 5.63008 0.685006 5.70032 0.724246 5.75997C0.763486 5.81963 0.820036 5.86586 0.886306 5.89245L6.43667 8.11819C6.61213 8.18844 6.77155 8.2935 6.90531 8.42702C7.03907 8.56054 7.14441 8.71977 7.21498 8.89511L9.44072 14.4469Z" stroke="#66FFB8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.5626 0.770996L6.90545 8.42741" stroke="#66FFB8" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-white text-xs font-medium font-['Inter'] leading-4">Home</div>
        </button>

        {/* Contacts */}
        <button className="flex-1 px-6 py-1 rounded-[100px] flex flex-col justify-center items-center gap-0.5">
          <div className="size-6 flex justify-center items-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10.6667 14V12.6667C10.6667 11.9594 10.3857 11.2811 9.88561 10.781C9.38552 10.281 8.70724 10 7.99999 10H3.99999C3.29275 10 2.61447 10.281 2.11438 10.781C1.61428 11.2811 1.33333 11.9594 1.33333 12.6667V14" stroke="#26275A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10.6667 2.08545C11.2385 2.2337 11.7449 2.56763 12.1065 3.03482C12.468 3.50202 12.6641 4.07604 12.6641 4.66678C12.6641 5.25752 12.468 5.83154 12.1065 6.29874C11.7449 6.76594 11.2385 7.09987 10.6667 7.24812" stroke="#26275A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.6667 13.9998V12.6664C14.6662 12.0756 14.4696 11.5016 14.1076 11.0346C13.7456 10.5677 13.2388 10.2341 12.6667 10.0864" stroke="#26275A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.99999 7.33333C7.47275 7.33333 8.66666 6.13943 8.66666 4.66667C8.66666 3.19391 7.47275 2 5.99999 2C4.52724 2 3.33333 3.19391 3.33333 4.66667C3.33333 6.13943 4.52724 7.33333 5.99999 7.33333Z" stroke="#26275A" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-blue-950 text-xs font-medium font-['Inter'] leading-4">Contacts</div>
        </button>

        {/* Activity */}
        <button className="flex-1 px-6 py-1 rounded-[100px] flex flex-col justify-center items-center gap-0.5">
          <div className="size-6 flex justify-center items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 18.6668C11.6333 18.6668 11.3194 18.5363 11.0583 18.2752C10.7972 18.0141 10.6667 17.7002 10.6667 17.3335H13.3333C13.3333 17.7002 13.2028 18.0141 12.9417 18.2752C12.6806 18.5363 12.3667 18.6668 12 18.6668ZM6.66667 16.6668V15.3335H8.00001V10.6668C8.00001 9.74461 8.27778 8.92516 8.83334 8.2085C9.38889 7.49183 10.1111 7.02238 11 6.80016V6.3335C11 6.05572 11.0972 5.81961 11.2917 5.62516C11.4861 5.43072 11.7222 5.3335 12 5.3335C12.2778 5.3335 12.5139 5.43072 12.7083 5.62516C12.9028 5.81961 13 6.05572 13 6.3335V6.55016C12.8778 6.79461 12.7889 7.04461 12.7333 7.30016C12.6778 7.55572 12.6556 7.81683 12.6667 8.0835C12.5556 8.06127 12.4472 8.04183 12.3417 8.02516C12.2361 8.0085 12.1222 8.00016 12 8.00016C11.2667 8.00016 10.6389 8.26127 10.1167 8.7835C9.59445 9.30572 9.33334 9.9335 9.33334 10.6668V15.3335H14.6667V11.0502C14.8667 11.1391 15.0806 11.2085 15.3083 11.2585C15.5361 11.3085 15.7667 11.3335 16 11.3335V15.3335H17.3333V16.6668H6.66667ZM16 10.0002C15.4444 10.0002 14.9722 9.80572 14.5833 9.41683C14.1944 9.02794 14 8.55572 14 8.00016C14 7.44461 14.1944 6.97238 14.5833 6.5835C14.9722 6.19461 15.4444 6.00016 16 6.00016C16.5556 6.00016 17.0278 6.19461 17.4167 6.5835C17.8056 6.97238 18 7.44461 18 8.00016C18 8.55572 17.8056 9.02794 17.4167 9.41683C17.0278 9.80572 16.5556 10.0002 16 10.0002Z" fill="#26275A"/>
            </svg>
          </div>
          <div className="text-blue-950 text-xs font-medium font-['Inter'] leading-4">Activity</div>
        </button>

        {/* More */}
        <button className="flex-1 px-6 py-1 rounded-[100px] flex flex-col justify-center items-center gap-0.5">
          <div className="size-6 flex justify-center items-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7.99984 13.3332C7.63317 13.3332 7.31928 13.2026 7.05817 12.9415C6.79706 12.6804 6.6665 12.3665 6.6665 11.9998C6.6665 11.6332 6.79706 11.3193 7.05817 11.0582C7.31928 10.7971 7.63317 10.6665 7.99984 10.6665C8.3665 10.6665 8.68039 10.7971 8.9415 11.0582C9.20262 11.3193 9.33317 11.6332 9.33317 11.9998C9.33317 12.3665 9.20262 12.6804 8.9415 12.9415C8.68039 13.2026 8.3665 13.3332 7.99984 13.3332ZM11.9998 13.3332C11.6332 13.3332 11.3193 13.2026 11.0582 12.9415C10.7971 12.6804 10.6665 12.3665 10.6665 11.9998C10.6665 11.6332 10.7971 11.3193 11.0582 11.0582C11.3193 10.7971 11.6332 10.6665 11.9998 10.6665C12.3665 10.6665 12.6804 10.7971 12.9415 11.0582C13.2026 11.3193 13.3332 11.6332 13.3332 11.9998C13.3332 12.3665 13.2026 12.6804 12.9415 12.9415C12.6804 13.2026 12.3665 13.3332 11.9998 13.3332ZM15.9998 13.3332C15.6332 13.3332 15.3193 13.2026 15.0582 12.9415C14.7971 12.6804 14.6665 12.3665 14.6665 11.9998C14.6665 11.6332 14.7971 11.3193 15.0582 11.0582C15.3193 10.7971 15.6332 10.6665 15.9998 10.6665C16.3665 10.6665 16.6804 10.7971 16.9415 11.0582C17.2026 11.3193 17.3332 11.6332 17.3332 11.9998C17.3332 12.3665 17.2026 12.6804 16.9415 12.9415C16.6804 13.2026 16.3665 13.3332 15.9998 13.3332Z" fill="#26275A"/>
            </svg>
          </div>
          <div className="text-blue-950 text-xs font-medium font-['Inter'] leading-4">More</div>
        </button>
        </div>
      </div>
    </div>
  );
};
