import React from 'react';
import { motion } from 'framer-motion';
import { useUser, Role } from '../context/UserContext';

const roles: { role: Role; label: string; color: string; icon: string; description: string }[] = [
  { role: 'engineer', label: 'Engineer', color: 'orange', icon: '⚙️', description: 'Build and maintain equipment' },
  { role: 'scientist', label: 'Scientist', color: 'blue', icon: '🔬', description: 'Study Mars and gravity' },
  { role: 'explorer', label: 'Explorer', color: 'purple', icon: '🧭', description: 'Discover new frontiers' },
];

export const RoleSelection: React.FC = () => {
  const { state, setRole, setProgressStep, setWeight } = useUser();

  const handleRoleSelect = (selectedRole: Role) => {
    setRole(selectedRole);
    setProgressStep('simulator');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-black to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating stars background */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Welcome, {state.name}! 🌟
        </h1>
        <p className="text-center text-purple-200 mb-12 text-lg">
          Choose your role on the Mars mission
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((roleData) => (
            <motion.div
              key={roleData.role}
              onClick={() => handleRoleSelect(roleData.role)}
              className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                state.role === roleData.role
                  ? `bg-${roleData.color}-500/20 border-${roleData.color}-400`
                  : 'bg-black/30 border-purple-500/30 hover:border-purple-400'
              }`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-5xl mb-4 text-center">{roleData.icon}</div>
              <h3 className={`text-xl font-bold text-center mb-2 ${
                state.role === roleData.role ? `text-${roleData.color}-300` : 'text-white'
              }`}>
                {roleData.label}
              </h3>
              <p className="text-center text-gray-300 text-sm">{roleData.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Weight input */}
        <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-purple-500/30 mb-8">
          <label className="block text-white font-bold mb-4">
            What's your weight? (kg)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="30"
              max="150"
              value={state.weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="flex-1 h-2 bg-purple-900 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-2xl font-bold text-pink-400 min-w-20 text-right">
              {state.weight} kg
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-3">Slide to set your weight</p>
        </div>

        {state.role && (
          <motion.button
            onClick={() => setProgressStep('simulator')}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all glow-button text-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Continue to Gravity Simulator 🚀
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default RoleSelection;
