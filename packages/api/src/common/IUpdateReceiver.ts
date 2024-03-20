import { Ticker } from 'pixi.js';

export interface IUpdateReceiver
{
    update(ticker: Ticker): void;
}
