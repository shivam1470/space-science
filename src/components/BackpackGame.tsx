import React, { useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  useSensor,
  PointerSensor,
  useSensors,
} from '@dnd-kit/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { backpackItems } from '../data/items';

export const BackpackGame: React.FC = () => {
  const { setProgressStep, setScore, addCompletedItem } = useUser();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const correctItems = backpackItems.filter(item => item.correct);
  const gameItems = backpackItems.sort(() => Math.random() - 0.5);

  const handleItemClick = useCallback((itemId: string) => {
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      }
      return [...prev, itemId];
    });
    setFeedback('');
  }, []);

  const checkAnswers = () => {
    const selectedItemsData = selectedItems.map(id =>
      backpackItems.find(item => item.id === id)
    );

    const allCorrect = selectedItemsData.every(item => item?.correct);
    const allCorrectSelected = correctItems.every(item =>
      selectedItems.includes(item.id)
    );
    const noWrongSelected = selectedItemsData.every(item => item?.correct);

    if (allCorrect && allCorrectSelected && noWrongSelected) {
      setFeedback('🎉 Perfect! You packed everything correctly!');
      const score = 100;
      setScore(score);
      addCompletedItem('backpack_game');
      setTimeout(() => setProgressStep('complete'), 1500);
    } else if (selectedItems.length === 0) {
      setFeedback('Please select items for your backpack!');
    } else if (!allCorrect) {
      setFeedback('❌ You selected some wrong items. Try again!');
    } else if (!allCorrectSelected) {
      setFeedback('⚠️ You\'re missing some important items!');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active } = event;
    if (active.id) {
      handleItemClick(String(active.id));
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-white">
            Pack Your Mars Backpack 🎒
          </h1>
          <p className="text-center text-purple-200 mb-8">
            Select the items you need to survive on Mars!
          </p>

          <div className="bg-black/40 backdrop-blur-md rounded-lg p-8 border border-purple-500/30 mb-8">
            {/* Available Items Grid */}
            <h2 className="text-2xl font-bold text-white mb-6">Available Items</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {gameItems.map((item) => (
                <motion.div
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                    selectedItems.includes(item.id)
                      ? 'bg-pink-500/30 border-pink-400'
                      : 'bg-purple-900/30 border-purple-500 hover:border-purple-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-4xl mb-2 text-center">{item.icon}</div>
                  <p className="text-center text-sm font-semibold text-white">
                    {item.name}
                  </p>
                  {selectedItems.includes(item.id) && (
                    <motion.div
                      className="text-center mt-2 text-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Your Backpack */}
            <h2 className="text-2xl font-bold text-white mb-4">Your Backpack</h2>
            <div className="bg-purple-900/20 rounded-lg p-6 mb-8 border-2 border-purple-500/50 min-h-24">
              {selectedItems.length === 0 ? (
                <p className="text-gray-400 text-center">Click items to add them to your backpack</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {selectedItems.map((itemId) => {
                    const item = backpackItems.find(i => i.id === itemId);
                    return (
                      <motion.div
                        key={itemId}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className={`px-4 py-2 rounded-full font-semibold text-white ${
                          item?.correct ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      >
                        {item?.icon} {item?.name}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  className={`p-4 rounded-lg mb-8 text-center text-lg font-bold ${
                    feedback.includes('Perfect') || feedback.includes('🎉')
                      ? 'bg-green-500/20 text-green-300 border-2 border-green-500'
                      : feedback.includes('❌')
                        ? 'bg-red-500/20 text-red-300 border-2 border-red-500'
                        : 'bg-yellow-500/20 text-yellow-300 border-2 border-yellow-500'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {feedback}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-purple-900/30 rounded-lg p-4 text-center border border-purple-500/30">
              <p className="text-gray-300 text-sm mb-2">Selected Items</p>
              <p className="text-3xl font-bold text-purple-300">{selectedItems.length}</p>
            </div>
            <div className="bg-pink-900/30 rounded-lg p-4 text-center border border-pink-500/30">
              <p className="text-gray-300 text-sm mb-2">Needed Items</p>
              <p className="text-3xl font-bold text-pink-300">{correctItems.length}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              onClick={() => setProgressStep('simulator')}
              className="flex-1 py-3 px-6 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Back
            </motion.button>
            <motion.button
              onClick={checkAnswers}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all glow-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Launch Mission! 🚀
            </motion.button>
          </div>

          <div className="text-center mt-6 text-purple-300 text-sm">
            <p>✨ Click items to select or deselect them ✨</p>
          </div>
        </motion.div>
      </div>
    </DndContext>
  );
};

export default BackpackGame;
