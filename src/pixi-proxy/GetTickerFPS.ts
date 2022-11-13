import { GetTicker } from './GetTicker';

export const GetTickerFPS = () => (GetTicker()?.FPS || 0);
