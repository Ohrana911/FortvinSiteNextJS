export const mapBrickSize = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const;

export const mapBrickType = {
  1: 'традиционная',
  2: 'тонкая',
} as const;

export const brickSizes = Object.entries(mapBrickSize).map(([value, name]) => ({
  name,
  value,
}));

export const brickTypes = Object.entries(mapBrickType).map(([value, name]) => ({
  name,
  value,
}));

export type BrickSize = keyof typeof mapBrickSize;
export type BrickType = keyof typeof mapBrickType;