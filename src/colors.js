export const SQUARE_COLORS = [
  { 
    className: 'medium',
    emoji: '🟩',
  },
  { 
    className: 'light',
    emoji: '\ud83d\udfe8',
  },
  { 
    className: 'dark',
    emoji: '🟪',
  }
];

export const HIGH_CONTRAST_SQUARE_COLORS = [
  { 
    className: 'medium',
    emoji: '🟦',
  },
  { 
    className: 'light',
    emoji: '🟧',
  },
  { 
    className: 'dark',
    emoji: '⬛',
  }
];

export const EASTER_EGG_COLORS = ['black', ...SQUARE_COLORS.map(color => color.className)];
export const HIGH_CONTRAST_EASTER_EGG_COLORS = [
  HIGH_CONTRAST_SQUARE_COLORS[2].className,
  HIGH_CONTRAST_SQUARE_COLORS[0].className,
  HIGH_CONTRAST_SQUARE_COLORS[1].className,
];

export function getSquareColors(highContrast) {
  return highContrast ? HIGH_CONTRAST_SQUARE_COLORS : SQUARE_COLORS;
}

export function getEasterEggColors(highContrast) {
  return highContrast ? HIGH_CONTRAST_EASTER_EGG_COLORS : EASTER_EGG_COLORS;
}