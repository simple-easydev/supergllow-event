import React, { createContext, useContext, useState, useCallback } from 'react';

interface ModalContextType {
  isInvitePreviewOpen: boolean;
  openInvitePreview: () => void;
  closeInvitePreview: () => void;
  toggleInvitePreview: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInvitePreviewOpen, setIsInvitePreviewOpen] = useState(false);

  const openInvitePreview = useCallback(() => {
    setIsInvitePreviewOpen(true);
  }, []);

  const closeInvitePreview = useCallback(() => {
    setIsInvitePreviewOpen(false);
  }, []);

  const toggleInvitePreview = useCallback(() => {
    setIsInvitePreviewOpen(prev => !prev);
  }, []);

  return (
    <ModalContext.Provider value={{
      isInvitePreviewOpen,
      openInvitePreview,
      closeInvitePreview,
      toggleInvitePreview,
    }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};
