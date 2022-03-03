import { Interval } from './Interval';

export class ResizeTo extends Interval
{
    protected _startW: number;
    protected _startH: number;
    protected _endW: number;
    protected _endH: number;
    protected _deltaW: number;
    protected _deltaH: number;

    constructor(k: HTMLElement, _arg_2: number, _arg_3: number, _arg_4: number)
    {
        super(k, _arg_2);

        this._endW = _arg_3;
        this._endH = _arg_4;
    }

    public start(): void
    {
        super.start();

        this._startW = this.target.offsetWidth;
        this._startH = this.target.offsetHeight;
        this._deltaW = (this._endW - this._startW);
        this._deltaH = (this._endH - this._startH);
    }

    public update(k: number): void
    {
        this.target.style.width = ((this._startW + (this._deltaW * k)) + 'px');
        this.target.style.height = ((this._startH + (this._deltaH * k)) + 'px');
    }
}