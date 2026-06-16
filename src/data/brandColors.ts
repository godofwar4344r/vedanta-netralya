// Single source of truth for the colours actually used across the website.
// Keep this in sync with tailwind.config.js + src/index.css.
// Surfaced in the Visual Editor so you can pick from the site's own palette.

export interface BrandColor {
  name: string;
  value: string;
  /** A readable label for text that sits on top of this colour (used for previews). */
  contrast: string;
}

export const WEBSITE_COLORS: BrandColor[] = [
  { name: 'Cream',       value: '#f5f1ea', contrast: '#0a2640' },
  { name: 'Cream Dark',  value: '#ebe4d6', contrast: '#0a2640' },
  { name: 'White',       value: '#ffffff', contrast: '#0a2640' },
  { name: 'Navy',        value: '#0a2640', contrast: '#f5f1ea' },
  { name: 'Navy Deep',   value: '#061829', contrast: '#f5f1ea' },
  { name: 'Teal',        value: '#00abc0', contrast: '#0a2640' },
  { name: 'Teal Bright', value: '#2dd4e6', contrast: '#0a2640' },
];

// Convenience subset for compact toolbars where space is tight.
export const WEBSITE_COLORS_COMPACT: BrandColor[] = WEBSITE_COLORS.filter(
  c => ['Cream', 'Navy', 'Navy Deep', 'Teal', 'White'].includes(c.name)
);
