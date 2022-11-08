import { GetTickerTime } from '../../pixi-proxy';

export class RoomEnterEffect
{
    public static STATE_NOT_INITIALIZED: number = 0;
    public static STATE_START_DELAY: number = 1;
    public static STATE_RUNNING: number = 2;
    public static STATE_OVER: number = 3;

    private static _state: number = RoomEnterEffect.STATE_NOT_INITIALIZED;
    private static _visualizationOn: boolean = false;
    private static _currentDelta: number = 0;
    private static _initializationTimeMs: number = 0;
    private static _startDelayMs: number = (20 * 1000);
    private static _effectDurationMs: number = 2000;

    public static init(delay: number, duration: number): void
    {
        RoomEnterEffect._currentDelta = 0;
        RoomEnterEffect._startDelayMs = delay;
        RoomEnterEffect._effectDurationMs = duration;
        RoomEnterEffect._initializationTimeMs = GetTickerTime();
        RoomEnterEffect._state = RoomEnterEffect.STATE_START_DELAY;
    }

    public static turnVisualizationOn(): void
    {
        if((RoomEnterEffect._state === RoomEnterEffect.STATE_NOT_INITIALIZED) || (RoomEnterEffect._state === RoomEnterEffect.STATE_OVER)) return;

        const k = (GetTickerTime() - RoomEnterEffect._initializationTimeMs);

        if(k > (RoomEnterEffect._startDelayMs + RoomEnterEffect._effectDurationMs))
        {
            RoomEnterEffect._state = RoomEnterEffect.STATE_OVER;

            return;
        }

        RoomEnterEffect._visualizationOn = true;

        if(k < RoomEnterEffect._startDelayMs)
        {
            RoomEnterEffect._state = RoomEnterEffect.STATE_START_DELAY;

            return;
        }

        RoomEnterEffect._state = RoomEnterEffect.STATE_RUNNING;
        RoomEnterEffect._currentDelta = ((k - RoomEnterEffect._startDelayMs) / RoomEnterEffect._effectDurationMs);
    }

    public static turnVisualizationOff(): void
    {
        RoomEnterEffect._visualizationOn = false;
    }

    public static isVisualizationOn(): boolean
    {
        return (RoomEnterEffect._visualizationOn) && (RoomEnterEffect.isRunning());
    }

    public static isRunning(): boolean
    {
        if((RoomEnterEffect._state === RoomEnterEffect.STATE_START_DELAY) || (RoomEnterEffect._state === RoomEnterEffect.STATE_RUNNING)) return true;

        return false;
    }

    public static getDelta(k: number = 0, _arg_2: number = 1): number
    {
        return Math.min(Math.max(RoomEnterEffect._currentDelta, k), _arg_2);
    }

    public static get totalRunningTime(): number
    {
        return RoomEnterEffect._startDelayMs + RoomEnterEffect._effectDurationMs;
    }
}
