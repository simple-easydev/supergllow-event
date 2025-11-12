import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Party, supabase } from '../lib/supabase';

interface PartyContextType {
  party: Party | null;
  setParty: (party: Party | null) => void;
  updateParty: (updates: Partial<Party>) => void;
  savePartyDraft: () => void;
  loadPartyDraft: () => void;
  clearPartyDraft: () => void;
}

const PartyContext = createContext<PartyContextType | undefined>(undefined);

const DRAFT_KEY = 'superglow_draft_party';

export const PartyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [party, setParty] = useState<Party | null>(null);

  const updateParty = (updates: Partial<Party>) => {
    setParty((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const savePartyDraft = () => {
    if (party) {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(party));
    }
  };

  const loadPartyDraft = () => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setParty(parsedDraft);
      } catch (error) {
        console.error('Failed to parse draft:', error);
      }
    }
  };

  const clearPartyDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
  };

  // Auto-save draft every 2 seconds
  useEffect(() => {
    if (party) {
      const timer = setTimeout(() => {
        savePartyDraft();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [party]);

  return (
    <PartyContext.Provider
      value={{
        party,
        setParty,
        updateParty,
        savePartyDraft,
        loadPartyDraft,
        clearPartyDraft,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};

export const useParty = () => {
  const context = useContext(PartyContext);
  if (context === undefined) {
    throw new Error('useParty must be used within a PartyProvider');
  }
  return context;
};
