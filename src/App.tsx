import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { PartyProvider } from './contexts/PartyContext';
import { HomeScreen } from './screens/HomeScreen';
import { PartyFormScreen } from './screens/PartyFormScreen';
import { GuestListScreen } from './screens/GuestListScreen';
import { PublicInviteView } from './screens/PublicInviteView';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PartyProvider>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/create" element={<PartyFormScreen />} />
            <Route path="/guests" element={<GuestListScreen />} />
            <Route path="/i/:inviteCode" element={<PublicInviteView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </PartyProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
