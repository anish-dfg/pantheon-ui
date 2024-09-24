export type Color = {
  r: number;
  g: number;
  b: number;
};

export const hex = ({ r, g, b }: Color): string => {
  const componentToHex = (component: number): string => {
    const hex = component.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
};
// Generate a random number between two values
const randomBetween = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

// Function to create variations of a color
const createVariation = (baseColor: Color, variationFactor: number): Color => {
  const adjustColor = (value: number) => {
    return Math.min(
      255,
      Math.max(0, value + randomBetween(-variationFactor, variationFactor)),
    );
  };

  return {
    r: adjustColor(baseColor.r),
    g: adjustColor(baseColor.g),
    b: adjustColor(baseColor.b),
  };
};

// 6 Base colors
const baseColors: Color[] = [
  { r: 63, g: 68, b: 164 },
  { r: 245, g: 44, b: 104 },
  { r: 24, g: 29, b: 122 },
  { r: 110, g: 193, b: 117 },
  { r: 250, g: 200, b: 152 },
];

// Generate a sequence of colors, 6 variations at a time
export const generateColorPalette = (
  numVariations: number,
  variationFactor: number,
): Color[] => {
  const palette: Color[] = [];

  for (let i = 0; i < numVariations; i++) {
    const baseColor = baseColors[i % baseColors.length];
    const variation = createVariation(baseColor, variationFactor);
    palette.push(variation);
  }

  return palette;
};
