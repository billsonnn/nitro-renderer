import { MoveTo } from './MoveTo';

export class MoveBy extends MoveTo
{
    constructor(k: HTMLElement, _arg_2: number, _arg_3: number, _arg_4: number)
    {
        super(k, _arg_2, _arg_3, _arg_4);
    }

    public start(): void
    {
        this._endX = (this.target.offsetLeft + this._endX);
        this._endY = (this.target.offsetTop + this._endY);

        super.start();
    }
}