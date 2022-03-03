import { Interval } from './Interval';

export class JumpBy extends Interval
{
    protected _startX: number;
    protected _startY: number;
    protected _deltaX: number;
    protected _deltaY: number;
    protected _height: number;
    protected _numJumps: number;

    constructor(target: HTMLElement, duration: number, deltaX: number, deltaY: number, height: number, numJumps: number)
    {
        super(target, duration);

        this._deltaX = deltaX;
        this._deltaY = deltaY;
        this._height = -(height);
        this._numJumps = numJumps;
    }

    public start(): void
    {
        super.start();

        this._startX = this.target.offsetLeft;
        this._startY = this.target.offsetTop;
    }

    public update(k: number): void
    {
        super.update(k);

        this.target.style.left = ((this._startX + (this._deltaX * k)) + 'px');
        this.target.style.top = (((this._startY + (this._height * Math.abs(Math.sin(((k * Math.PI) * this._numJumps))))) + (this._deltaY * k)) + 'px');
    }
}