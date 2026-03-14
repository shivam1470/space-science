import { UserProvider, useUser } from './context/UserContext';
import IntroScreen from './components/IntroScreen';
import RoleSelection from './components/RoleSelection';
import GravitySimulator from './components/GravitySimulator';
import BackpackGame from './components/BackpackGame';
import MissionComplete from './components/MissionComplete';
import './index.css';

function AppContent() {
  const { state } = useUser();

  const renderScreen = () => {
    switch (state.progressStep) {
      case 'intro':
        return <IntroScreen />;
      case 'role':
        return <RoleSelection />;
      case 'simulator':
        return <GravitySimulator />;
      case 'game':
        return <BackpackGame />;
      case 'complete':
        return <MissionComplete />;
      default:
        return <IntroScreen />;
    }
  };

  return renderScreen();
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
