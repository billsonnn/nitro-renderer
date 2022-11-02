import { IMessageDataWrapper, IMessageParser } from '../../../../../../api';
import { PetData } from './PetData';

export class PetInventoryParser implements IMessageParser
{
    protected _totalFragments: number;
    protected _fragmentNumber: number;
    private _fragment: Map<number, PetData>;

    public flush(): boolean
    {
        this._fragment = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        this._totalFragments = wrapper.readInt();
        this._fragmentNumber = wrapper.readInt();

        let totalCount: number = wrapper.readInt();

        this._fragment = new Map();

        while(totalCount > 0)
        {
            const petData = new PetData(wrapper);

            this._fragment.set(petData.id, petData);

            totalCount--;
        }

        return true;
    }

    public get totalFragments(): number
    {
        return this._totalFragments;
    }

    public get fragmentNumber(): number
    {
        return this._fragmentNumber;
    }

    public get fragment(): Map<number, PetData>
    {
        return this._fragment;
    }
}
