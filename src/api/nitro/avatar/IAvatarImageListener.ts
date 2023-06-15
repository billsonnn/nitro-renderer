import { IDisposable } from '@/api'

export interface IAvatarImageListener extends IDisposable {
  resetFigure(figure: string): void;
}
