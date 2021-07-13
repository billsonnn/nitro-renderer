import { ISpritesheetData } from '@pixi/spritesheet';
import { ISpritesheetMeta } from './ISpritesheetMeta';

export interface ISpritesheet extends ISpritesheetData
{
    meta: ISpritesheetMeta;
}
