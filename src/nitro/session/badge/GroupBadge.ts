import { NitroContainer } from '../../..';
import { GroupBadgePart } from './GroupBadgePart';

export class GroupBadge
{
    private _code: string;
    private _parts: GroupBadgePart[];
    private _container: NitroContainer;

    constructor(code: string)
    {
        this._code = code;
        this._parts = [];
        this._container = new NitroContainer();
    }

    public get code(): string
    {
        return this._code;
    }

    public get parts(): GroupBadgePart[]
    {
        return this._parts;
    }

    public get container(): NitroContainer
    {
        return this._container;
    }
}
