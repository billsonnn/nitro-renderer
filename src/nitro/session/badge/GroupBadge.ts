import { GroupBadgePart } from './GroupBadgePart';

export class GroupBadge
{
    private _code: string;
    private _parts: GroupBadgePart[];

    constructor(code: string)
    {
        this._code = code;
        this._parts = [];
    }

    public get code(): string
    {
        return this._code;
    }

    public get parts(): GroupBadgePart[]
    {
        return this._parts;
    }
}
