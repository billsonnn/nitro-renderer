import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { PetFigureData } from '../../../../avatar';

export class OpenPetPackageRequestedMessageParser implements IMessageParser
{
    private _objectId: number;
    private _figureData: PetFigureData;

    flush(): boolean
    {
        this._objectId = -1;
        this._figureData = null;

        return true;
    }

    parse(wrapper: IMessageDataWrapper): boolean
    {
        this._objectId = wrapper.readInt();

        if(!wrapper.bytesAvailable) return true;

        this._figureData = new PetFigureData(wrapper.readString());

        return true;
    }

    public get objectId(): number
    {
        return this._objectId;
    }

    public get figureData(): PetFigureData
    {
        return this._figureData;
    }
}
