import { ISpritesheetData as PixiSpritesheet } from '@pixi/spritesheet';
import { ISpritesheetMeta } from './ISpritesheetMeta';

export interface ISpritesheetData extends PixiSpritesheet
{
    meta: ISpritesheetMeta;
}
