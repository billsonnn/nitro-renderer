import { SpritesheetData } from 'pixi.js';
import { ISpritesheetFrame } from './ISpritesheetFrame';
import { ISpritesheetMeta } from './ISpritesheetMeta';

export interface ISpritesheetData extends SpritesheetData
{
    meta: ISpritesheetMeta;
    frames: { [index: string]: ISpritesheetFrame };
}
