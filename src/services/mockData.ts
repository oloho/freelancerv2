import { SlavePc } from '../types';

const CURRENT_BOT_VERSION = '1.2.3';

export const mockSlavePcs: SlavePc[] = [
  {
    id: 'pc-001',
    name: 'Slave PC 1',
    status: 'online',
    lastUpdate: new Date().toISOString(),
    group: 'group1',
    taskQueue: [],
    botVersion: '1.2.3'
  },
  {
    id: 'pc-002',
    name: 'Slave PC 2',
    status: 'offline',
    lastUpdate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    group: 'group1',
    taskQueue: [],
    botVersion: '1.2.2'
  },
  {
    id: 'pc-003',
    name: 'Slave PC 3',
    status: 'online',
    lastUpdate: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    group: 'group2',
    taskQueue: [],
    botVersion: '1.2.1'
  },
  {
    id: 'pc-004',
    name: 'Slave PC 4',
    status: 'online',
    lastUpdate: new Date().toISOString(),
    group: 'group2',
    taskQueue: [],
    botVersion: '1.2.3'
  },
  {
    id: 'pc-005',
    name: 'Slave PC 5',
    status: 'online',
    lastUpdate: new Date().toISOString(),
    group: 'group1',
    taskQueue: [],
    botVersion: '1.2.0'
  },
  {
    id: 'pc-006',
    name: 'Slave PC 6',
    status: 'offline',
    lastUpdate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    group: 'group2',
    taskQueue: [],
    botVersion: '1.1.9'
  },
  {
    id: 'pc-007',
    name: 'Slave PC 7',
    status: 'online',
    lastUpdate: new Date().toISOString(),
    group: 'group1',
    taskQueue: [],
    botVersion: '1.2.3'
  },
  {
    id: 'pc-008',
    name: 'Slave PC 8',
    status: 'online',
    lastUpdate: new Date().toISOString(),
    group: 'group2',
    taskQueue: [],
    botVersion: '1.2.2'
  },
  {
    id: 'pc-009',
    name: 'Slave PC 9',
    status: 'offline',
    lastUpdate: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
    group: 'group1',
    taskQueue: [],
    botVersion: '1.2.1'
  },
  {
    id: 'pc-010',
    name: 'Slave PC 10',
    status: 'online',
    lastUpdate: new Date().toISOString(),
    group: 'group2',
    taskQueue: [],
    botVersion: '1.2.3'
  }
];

export function getRandomDelay(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCurrentBotVersion(): string {
  return CURRENT_BOT_VERSION;
}

export function isBotVersionOutdated(version: string): boolean {
  return version !== CURRENT_BOT_VERSION;
}