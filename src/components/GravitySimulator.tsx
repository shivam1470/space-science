import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { useGravity } from '../hooks/useGravity';

export const GravitySimulator: React.FC = () => {
  const { state, setProgressStep } = useUser();
  const [planet, setPlanet] = useState<'earth' | 'mars'>('earth');
  const gravityData = useGravity(state.weight, planet);

  const jumpHeight = planet === 'earth' ? 0.5 : 1.3;

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
        className="relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-white">
          Gravity Simulator 🌍🔴
        </h1>
        <p className="text-center text-purple-200 mb-8">
          See how gravity affects jumping!
        </p>

        {/* Planet Slider */}
        <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 border border-purple-500/30 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className={`text-center flex-1 ${planet === 'earth' ? 'opacity-100' : 'opacity-50'}`}>
              <div className="text-6xl mb-2">🌍</div>
              <h2 className="text-xl font-bold text-blue-400">Earth</h2>
              <p className="text-sm text-gray-300">Gravity: {gravityData.earthGravity} m/s²</p>
            </div>

            <motion.div className="flex-1 mx-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={planet === 'earth' ? 0 : 1}
                onChange={(e) => setPlanet(parseFloat(e.target.value) < 0.5 ? 'earth' : 'mars')}
                className="w-full h-3 bg-gradient-to-r from-blue-500 to-red-500 rounded-lg appearance-none cursor-pointer"
              />
            </motion.div>

            <div className={`text-center flex-1 ${planet === 'mars' ? 'opacity-100' : 'opacity-50'}`}>
              <div className="text-6xl mb-2">🔴</div>
              <h2 className="text-xl font-bold text-red-400">Mars</h2>
              <p className="text-sm text-gray-300">Gravity: {gravityData.marsGravity} m/s²</p>
            </div>
          </div>
        </div>

        {/* Jump Animation Area */}
        <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 border border-purple-500/30 mb-8">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            {state.name}'s Jump Height on {planet === 'earth' ? 'Earth' : 'Mars'}
          </h3>

          <div className="relative h-80 bg-gradient-to-b from-sky-900/30 to-amber-900/30 rounded-lg flex items-end justify-center p-8">
            {/* Ground line */}
            <div className="absolute bottom-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>

            {/* Astronaut jumping */}
            <motion.div
              className="text-6xl"
              animate={{ y: [0, -jumpHeight * 100, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              👨‍🚀
            </motion.div>

            {/* Height marker */}
            <div className="absolute right-4 top-8 text-right">
              <motion.div
                className="text-3xl font-bold text-pink-400"
                key={planet}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {planet === 'mars' ? '2.6×' : '1×'}
              </motion.div>
              <p className="text-sm text-gray-300">Jump Multiplier</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-purple-900/30 rounded-lg p-4 text-center border border-purple-500/30">
              <p className="text-gray-300 text-sm mb-2">Gravity</p>
              <p className="text-2xl font-bold text-purple-300">{gravityData.gravity} m/s²</p>
            </div>
            <div className="bg-pink-900/30 rounded-lg p-4 text-center border border-pink-500/30">
              <p className="text-gray-300 text-sm mb-2">Your Weight</p>
              <p className="text-2xl font-bold text-pink-300">{state.weight} kg</p>
            </div>
            <div className="bg-blue-900/30 rounded-lg p-4 text-center border border-blue-500/30">
              <p className="text-gray-300 text-sm mb-2">Multiplier</p>
              <p className="text-2xl font-bold text-blue-300">×{gravityData.multiplier}</p>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex gap-4">
          <motion.button
            onClick={() => setProgressStep('role')}
            className="flex-1 py-3 px-6 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Back
          </motion.button>
          <motion.button
            onClick={() => setProgressStep('game')}
            className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all glow-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Pack the Backpack 🎒
          </motion.button>
        </div>

        <motion.div className="text-center mt-8 text-purple-300 text-sm">
          <p>💡 Fun Fact: Mars has only 38% of Earth's gravity!</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GravitySimulator;
