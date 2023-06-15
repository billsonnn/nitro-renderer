import { IRoomObjectSprite } from '@/api'

export interface IAvatarAddition {
  id: number;

  dispose(): void;

  update(sprite: IRoomObjectSprite, scale: number): void;

  animate(sprite: IRoomObjectSprite): boolean;
}
