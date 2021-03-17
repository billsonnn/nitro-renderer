import { IAvatarImageListener } from '../IAvatarImageListener';
import { FigureData } from './FigureData';

export class FigureDataView implements IAvatarImageListener
{
    public static _Str_9887: number = 4;

    private _model: FigureData;
    private _figureString: string;
    private _isDisposed: boolean;

    constructor(k: FigureData)
    {
        this._model         = k;
        this._figureString  = null;
        this._isDisposed    = false;
    }

    public dispose(): void
    {
        this._isDisposed = true;
    }

    public update(k: string, effectId: number = 0, direction: number = 4): void
    {
        this._figureString = k;
    }

    public resetFigure(k: string): void
    {
        if(k !== this._figureString) return;
    }

    public get disposed(): boolean
    {
        return this._isDisposed;
    }

    public get figureString(): string
    {
        return this._figureString;
    }
}