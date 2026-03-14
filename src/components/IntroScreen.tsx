import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

export const IntroScreen: React.FC = () => {
  const { setName, setProgressStep } = useUser();
  const [inputName, setInputName] = useState('');

  const handleStart = () => {
    if (inputName.trim()) {
      setName(inputName);
      setProgressStep('role');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleStart();
    }
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
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Rocket animation */}
        <motion.div
          className="text-6xl mb-8 inline-block"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🚀
        </motion.div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent">
          Spacey Science Mission
        </h1>

        <p className="text-xl md:text-2xl text-purple-200 mb-8">
          Discover why astronauts jump higher on Mars!
        </p>

        <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 border border-purple-500/30 mb-8">
          <p className="text-lg text-gray-200 mb-6">
            Welcome, future astronaut! Ready to explore the mysteries of gravity?
          </p>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your name"
              maxLength={20}
              className="px-4 py-3 rounded-lg bg-purple-900/50 border-2 border-purple-500 text-white placeholder-purple-300 focus:outline-none focus:border-pink-500 transition-colors"
            />

            <motion.button
              onClick={handleStart}
              disabled={!inputName.trim()}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all glow-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch Mission 🌟
            </motion.button>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-purple-300 text-sm"
        >
          ✨ Your adventure awaits ✨
        </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroScreen;
