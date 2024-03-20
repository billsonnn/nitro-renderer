import { Interval } from './Interval';

export class MoveTo extends Interval
{
    protected _startX: number;
    protected _startY: number;
    protected _endX: number;
    protected _endY: number;
    protected _deltaX: number;
    protected _deltaY: number;

    constructor(k: HTMLElement, _arg_2: number, _arg_3: number, _arg_4: number)
    {
        super(k, _arg_2);

        this._endX = _arg_3;
        this._endY = _arg_4;
    }

    public start(): void
    {
        super.start();

        this._startX = this.target.offsetLeft;
        this._startY = this.target.offsetTop;
        this._deltaX = (this._endX - this._startX);
        this._deltaY = (this._endY - this._startY);
    }

    public update(k: number): void
    {
        this.target.style.left = ((this._startX + (this._deltaX * k)) + 'px');
        this.target.style.top = ((this._startY + (this._deltaY * k)) + 'px');
    }
}