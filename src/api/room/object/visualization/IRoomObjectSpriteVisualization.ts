import { IRoomObjectGraphicVisualization, IRoomObjectSprite, RoomObjectSpriteData } from '@/api'

export interface IRoomObjectSpriteVisualization extends IRoomObjectGraphicVisualization {
  sprites: IRoomObjectSprite[];
  updateObjectCounter: number;
  updateModelCounter: number;

  getSprite(index: number): IRoomObjectSprite;

  getSpriteList(): RoomObjectSpriteData[];
}
