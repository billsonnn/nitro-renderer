import { ISpritesheetData as PixiSpritesheet } from '@pixi/spritesheet'
import { ISpritesheetMeta } from '@/api'

export interface ISpritesheetData extends PixiSpritesheet {
  meta: ISpritesheetMeta;
}
