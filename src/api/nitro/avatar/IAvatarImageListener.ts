import { IDisposable } from '../../common';

export interface IAvatarImageListener extends IDisposable
{
    resetFigure(figure: string): void;
}
