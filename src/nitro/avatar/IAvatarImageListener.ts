import { IDisposable } from '../../core/common/disposable/IDisposable';

export interface IAvatarImageListener extends IDisposable
{
    resetFigure(figure: string): void;
}
