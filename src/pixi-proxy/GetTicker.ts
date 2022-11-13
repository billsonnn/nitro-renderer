import { PixiApplicationProxy } from './PixiApplicationProxy';

export const GetTicker = () => (PixiApplicationProxy.instance?.ticker || null);
