export interface IRoomSpriteMouseEvent
{
    readonly type: string;
    readonly eventId: string;
    readonly canvasId: string;
    readonly spriteTag: string;
    readonly screenX: number;
    readonly screenY: number;
    readonly localX: number;
    readonly localY: number;
    readonly ctrlKey: boolean;
    readonly altKey: boolean;
    readonly shiftKey: boolean;
    readonly buttonDown: boolean;
    spriteOffsetX: number;
    spriteOffsetY: number;
}
