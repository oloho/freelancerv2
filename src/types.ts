export interface Task {
  id: string;
  type: 'account_creation' | 'music_streaming';
  status: 'in_queue' | 'running' | 'completed' | 'failed';
  config: AccountCreationConfig | MusicStreamingConfig;
}

export interface AccountCreationConfig {
  website: 'gmail' | 'youtube' | 'amazon' | 'spotify' | 'tidal' | 'deezer' | 'apple_music';
}

export interface MusicStreamingConfig {
  platform: 'spotify' | 'youtube_music' | 'tidal' | 'deezer' | 'apple_music';
  playlist: string[];
  duration: number;
}

export interface TaskQueueTemplate {
  id: string;
  name: string;
  tasks: Task[];
}

export interface SlavePc {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastUpdate: string;
  taskQueue: Task[];
  group: string;
  botVersion: string;
}

export interface PcGroup {
  id: string;
  name: string;
}

export interface AppState {
  slavePcs: SlavePc[];
  taskQueueTemplates: TaskQueueTemplate[];
  pcGroups: PcGroup[];
}