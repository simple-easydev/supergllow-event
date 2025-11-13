import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { PartyProvider } from './contexts/PartyContext';
import { ModalProvider } from './contexts/ModalContext';
import { HomeScreen } from './screens/HomeScreen';
import { PartyFormScreen } from './screens/PartyFormScreen';
import { GuestListScreen } from './screens/GuestListScreen';
import { AccountScreen } from './screens/AccountScreen';
import { InviteDetailScreen } from './screens/InviteDetailScreen';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <PartyProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/create" element={<PartyFormScreen />} />
              <Route path="/account" element={<AccountScreen />} />
              <Route path="/guests" element={<GuestListScreen />} />
              <Route path="/i/:inviteCode" element={<InviteDetailScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ModalProvider>
        </PartyProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
