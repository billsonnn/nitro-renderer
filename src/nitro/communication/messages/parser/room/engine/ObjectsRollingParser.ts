import { IMessageDataWrapper, IMessageParser, ObjectRolling, Vector3d } from '../../../../../../api';

export class ObjectsRollingParser implements IMessageParser
{
    private _rollerId: number;
    private _itemsRolling: ObjectRolling[];
    private _unitRolling: ObjectRolling;

    public flush(): boolean
    {
        this._rollerId = 0;

        this._itemsRolling = [];
        this._unitRolling = null;

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const x = wrapper.readInt();
        const y = wrapper.readInt();
        const nextX = wrapper.readInt();
        const nextY = wrapper.readInt();

        let totalItems = wrapper.readInt();

        while(totalItems > 0)
        {
            const id = wrapper.readInt();
            const height = parseFloat(wrapper.readString());
            const nextHeight = parseFloat(wrapper.readString());
            const rollingData = new ObjectRolling(id, new Vector3d(x, y, height), new Vector3d(nextX, nextY, nextHeight));

            this._itemsRolling.push(rollingData);

            totalItems--;
        }

        this._rollerId = wrapper.readInt();

        if(!wrapper.bytesAvailable) return true;

        const movementType = wrapper.readInt();
        const unitId = wrapper.readInt();
        const height = parseFloat(wrapper.readString());
        const nextHeight = parseFloat(wrapper.readString());

        switch(movementType)
        {
            case 0: break;
            case 1:
                this._unitRolling = new ObjectRolling(unitId, new Vector3d(x, y, height), new Vector3d(nextX, nextY, nextHeight), ObjectRolling.MOVE);
                break;
            case 2:
                this._unitRolling = new ObjectRolling(unitId, new Vector3d(x, y, height), new Vector3d(nextX, nextY, nextHeight), ObjectRolling.SLIDE);
                break;
        }

        return true;
    }

    public get rollerId(): number
    {
        return this._rollerId;
    }

    public get itemsRolling(): ObjectRolling[]
    {
        return this._itemsRolling;
    }

    public get unitRolling(): ObjectRolling
    {
        return this._unitRolling;
    }
}
