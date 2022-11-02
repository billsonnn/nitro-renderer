import { NitroPoint, NitroTexture } from '../../../pixi-proxy';

export class GroupBadgePart
{
    public static BASE: string = 'b';
    public static SYMBOL: string = 's';
    public static SYMBOL_ALT: string = 't';
    public static BASE_PART: number = 0;
    public static LAYER_PART: number = 1;
    public static IMAGE_WIDTH: number = 39;
    public static IMAGE_HEIGHT: number = 39;
    public static CELL_WIDTH: number = 13;
    public static CELL_HEIGHT: number = 13;

    public type: string;
    public key: number;
    public color: number;
    public position: number;

    constructor(type: string, key: number = 0, color: number = 0, position: number = 0)
    {
        this.type = type;
        this.key = key;
        this.color = color;
        this.position = position;
    }

    public get code(): string
    {
        if(this.key === 0) return null;

        return GroupBadgePart.getCode(this.type, this.key, this.color, this.position);
    }

    public static getCode(type: string, key: number, color: number, position: number): string
    {
        return (type === GroupBadgePart.BASE ? type : key >= 100 ? GroupBadgePart.SYMBOL_ALT : GroupBadgePart.SYMBOL) + (key < 10 ? '0' : '') + (type === GroupBadgePart.BASE ? key : key >= 100 ? key - 100 : key) + (color < 10 ? '0' : '') + color + position;
    }

    public calculatePosition(asset: NitroTexture): NitroPoint
    {
        const gridPos = this.calculateGridPos(this.position);

        let x: number = (((GroupBadgePart.CELL_WIDTH * gridPos.x) + (GroupBadgePart.CELL_WIDTH / 2)) - (asset.width / 2));
        let y: number = (((GroupBadgePart.CELL_HEIGHT * gridPos.y) + (GroupBadgePart.CELL_HEIGHT / 2)) - (asset.height / 2));

        if(x < 0) x = 0;

        if((x + asset.width) > GroupBadgePart.IMAGE_WIDTH) x = (GroupBadgePart.IMAGE_WIDTH - asset.width);

        if(y < 0) y = 0;

        if((y + asset.height) > GroupBadgePart.IMAGE_HEIGHT) y = (GroupBadgePart.IMAGE_HEIGHT - asset.height);

        return new NitroPoint(Math.floor(x), Math.floor(y));
    }

    private calculateGridPos(gridVal: number): NitroPoint
    {
        const point = new NitroPoint();
        point.x = Math.floor((gridVal % 3));
        point.y = Math.floor((gridVal / 3));

        return point;
    }
}
