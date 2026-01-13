
export interface GenerationResult {
  timestamp: string;
  prompt: string;
  keywordsJp: string;
}

export interface PromptConfig {
  lyrics: string;
  duration: number;
  style: string;
  character: string;
}

export enum DrawStyle {
  ANIME = 'Anime Style',
  PHOTOREAL = 'Photorealistic',
  CYBERPUNK = 'Cyberpunk / Neon',
  WATERCOLOR = 'Watercolor Painting',
  OIL_PAINTING = 'Oil Painting',
  CINEMATIC = 'Cinematic 3D',
  GOTHIC = 'Gothic / Dark Fantasy'
}
