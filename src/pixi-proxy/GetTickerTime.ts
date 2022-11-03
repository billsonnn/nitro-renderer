import { PixiApplicationProxy } from './PixiApplicationProxy';

export const GetTickerTime = () => (PixiApplicationProxy.instance?.ticker?.lastTime || 0);
