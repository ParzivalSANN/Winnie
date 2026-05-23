/**
 * Shared Type Definitions for Magical 5th Anniversary App
 */

export type AppTheme = 'pooh' | 'ariel';

export interface PlaylistItem {
  id: number;
  title: string;
  duration: string;
  videoId: string;
  note?: string;
}

export interface Mood {
  id: string;
  emoji: string;
  label: string;
  character: string;
}

export interface DiaryEntry {
  id: string;
  content: string;
  moodId: string;
  date: string;
  isVoiceRecorded?: boolean;
}

export interface PhotoCard {
  id: string;
  url: string;
  caption: string;
  date: string;
  rotation: number; // For polaroid hover effects
}

export interface SpecialDay {
  id: string;
  title: string;
  date: string;
  note: string;
  icon: string;
}

