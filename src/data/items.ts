export interface BackpackItem {
  id: string;
  name: string;
  correct: boolean;
  icon: string;
}

export const backpackItems: BackpackItem[] = [
  { id: '1', name: 'Oxygen Tank', correct: true, icon: '🫁' },
  { id: '2', name: 'Space Helmet', correct: true, icon: '👨‍🚀' },
  { id: '3', name: 'Jet Boots', correct: true, icon: '🚀' },
  { id: '4', name: 'Surfboard', correct: false, icon: '🏄' },
  { id: '5', name: 'Pizza', correct: false, icon: '🍕' },
  { id: '6', name: 'Football', correct: false, icon: '🏈' },
  { id: '7', name: 'Water Bottle', correct: true, icon: '💧' },
  { id: '8', name: 'Laser Gun', correct: true, icon: '🔫' },
  { id: '9', name: 'Ice Cream', correct: false, icon: '🍦' },
];
