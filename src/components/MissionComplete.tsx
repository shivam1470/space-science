import React from 'react';
import { motion } from 'framer-motion';
import { useUser, Role } from '../context/UserContext';

const roleColors: Record<Role, string> = {
  engineer: 'from-orange-600 to-orange-400',
  scientist: 'from-blue-600 to-blue-400',
  explorer: 'from-purple-600 to-purple-400',
};

const roleEmojis: Record<Role, string> = {
  engineer: '⚙️',
  scientist: '🔬',
  explorer: '🧭',
};

export const MissionComplete: React.FC = () => {
  const { state, resetState } = useUser();

  const handleRestart = () => {
    resetState();
  };

  const jumpMultiplier = 2.6;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-black to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              opacity: 1,
            }}
            animate={{
              y: window.innerHeight + 50,
              opacity: 0,
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              ease: 'easeIn',
            }}
          >
            {['🎉', '⭐', '🌟', '✨', '🚀'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Mission Badge */}
        <motion.div
          className="mb-8"
          animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-8xl inline-block">🏆</div>
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
          Mission Accomplished!
        </h1>

        {/* Astronaut Profile Card */}
        <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 border-2 border-gradient-to-r from-purple-500 to-pink-500 mb-8">
          <motion.div
            className="text-7xl mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            👨‍🚀
          </motion.div>

          <div className={`bg-gradient-to-r ${state.role ? roleColors[state.role] : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent mb-4`}>
            <p className="text-4xl font-bold">
              {state.role ? roleEmojis[state.role] : '🎓'} {state.name} the {state.role ? state.role.charAt(0).toUpperCase() + state.role.slice(1) : 'Astronaut'}
            </p>
          </div>

          <div className="bg-purple-900/30 rounded-lg p-6 my-6 border border-purple-500/30">
            <p className="text-xl text-gray-200 mb-4">
              🌍 On <span className="text-blue-400 font-bold">Earth</span>, you weigh <span className="font-bold">{state.weight} kg</span>
            </p>
            <p className="text-xl text-gray-200">
              🔴 On <span className="text-red-400 font-bold">Mars</span>, you can jump <span className="text-pink-400 font-bold">{jumpMultiplier}× higher</span>!
            </p>
          </div>

          {/* Achievement */}
          <div className="bg-yellow-500/10 rounded-lg p-6 border-2 border-yellow-500/50 mb-6">
            <p className="text-lg text-yellow-300 font-bold">
              ⭐ Achievement Unlocked ⭐
            </p>
            <p className="text-gray-200 mt-2">
              You successfully packed your backpack and learned the science of gravity!
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
              <p className="text-gray-300 text-sm">Role</p>
              <p className="text-2xl font-bold text-blue-300 capitalize">
                {state.role || 'None'}
              </p>
            </div>
            <div className="bg-pink-900/30 rounded-lg p-4 border border-pink-500/30">
              <p className="text-gray-300 text-sm">Score</p>
              <p className="text-2xl font-bold text-pink-300">{state.score}</p>
            </div>
            <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
              <p className="text-gray-300 text-sm">Multiplier</p>
              <p className="text-2xl font-bold text-purple-300">×{jumpMultiplier}</p>
            </div>
          </div>
        </div>

        {/* Learning Summary */}
        <div className="bg-black/40 backdrop-blur-md rounded-lg p-6 border border-purple-500/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">What You Learned:</h2>
          <ul className="text-left space-y-2 text-gray-200">
            <li>✅ Mars has 38% of Earth's gravity (3.7 vs 9.8 m/s²)</li>
            <li>✅ Lower gravity means you can jump much higher</li>
            <li>✅ Essential survival items for Mars exploration</li>
            <li>✅ How physics affects space exploration</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <motion.button
            onClick={handleRestart}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all glow-button text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Play Again 🚀
          </motion.button>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-purple-300 text-sm mt-8"
        >
          ✨ Thanks for exploring space with us! ✨
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MissionComplete;
