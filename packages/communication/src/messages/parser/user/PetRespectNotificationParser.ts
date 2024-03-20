import { IMessageDataWrapper, IMessageParser, PetType } from '@nitrots/api';
import { PetData } from '../inventory';

export class PetRespectNotificationParser implements IMessageParser
{
    private _respect: number;
    private _petOwnerId: number;
    private _petData: PetData;

    public flush(): boolean
    {
        this._respect = 0;
        this._petOwnerId = 0;
        this._petData = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._respect = wrapper.readInt();
        this._petOwnerId = wrapper.readInt();
        this._petData = new PetData(wrapper);

        return true;
    }

    public get respect(): number
    {
        return this._respect;
    }

    public get petOwnerId(): number
    {
        return this._petOwnerId;
    }

    public get petData(): PetData
    {
        return this._petData;
    }

    public get isTreat(): boolean
    {
        return (this._petData.typeId === PetType.MONSTERPLANT);
    }
}
