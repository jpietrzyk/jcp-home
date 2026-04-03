export interface StrudelTrack {
  id: string;
  title: string;
  description: string;
  code: string;
  bpm?: number;
  cpm?: number;
  tags?: string[];
}
