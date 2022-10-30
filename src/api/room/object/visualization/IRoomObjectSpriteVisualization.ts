import { RoomObjectSpriteData } from '../../RoomObjectSpriteData';
import { IRoomObjectGraphicVisualization } from './IRoomObjectGraphicVisualization';
import { IRoomObjectSprite } from './IRoomObjectSprite';

export interface IRoomObjectSpriteVisualization extends IRoomObjectGraphicVisualization
{
    getSprite(index: number): IRoomObjectSprite;
    getSpriteList(): RoomObjectSpriteData[];
    sprites: IRoomObjectSprite[];
    updateObjectCounter: number;
    updateModelCounter: number;
}
