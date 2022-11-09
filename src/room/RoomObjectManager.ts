import { AdvancedMap, IAdvancedMap, IRoomObjectController, IRoomObjectManager } from '../api';
import { RoomObject } from './object';

export class RoomObjectManager implements IRoomObjectManager
{
    private _objects: IAdvancedMap<number, IRoomObjectController>;
    private _objectsPerType: IAdvancedMap<string, AdvancedMap<number, IRoomObjectController>>;

    constructor()
    {
        this._objects = new AdvancedMap();
        this._objectsPerType = new AdvancedMap();
    }

    public dispose(): void
    {
        this.removeAllObjects();
    }

    public getObject(id: number): IRoomObjectController
    {
        const object = this._objects.getValue(id);

        if(!object) return null;

        return object;
    }

    public getObjectByIndex(index: number): IRoomObjectController
    {
        const object = this._objects.getWithIndex(index);

        if(!object) return null;

        return object;
    }

    public createObject(id: number, stateCount: number, type: string): IRoomObjectController
    {
        const object = new RoomObject(id, stateCount, type);

        return this.addObject(id, type, object);
    }

    private addObject(id: number, type: string, object: IRoomObjectController): IRoomObjectController
    {
        if(this._objects.getValue(id))
        {
            object.dispose();

            return null;
        }

        this._objects.add(id, object);

        const typeMap = this.getTypeMap(type);

        if(typeMap) typeMap.add(id, object);

        return object;
    }

    public removeObject(id: number): void
    {
        const object = this._objects.remove(id);

        if(object)
        {
            const typeMap = this.getTypeMap(object.type);

            if(typeMap) typeMap.remove(object.id);

            object.dispose();
        }
    }

    public removeAllObjects(): void
    {
        let i = 0;

        while(i < this._objects.length)
        {
            const object = this._objects.getWithIndex(i);

            if(object) object.dispose();

            i++;
        }

        this._objects.reset();

        i = 0;

        while(i < this._objectsPerType.length)
        {
            const typeMap = this._objectsPerType.getWithIndex(i);

            if(typeMap) typeMap.dispose();

            i++;
        }

        this._objectsPerType.reset();
    }

    private getTypeMap(k: string, _arg_2: boolean = true): IAdvancedMap<number, IRoomObjectController>
    {
        let existing = this._objectsPerType.getValue(k);

        if(!existing && _arg_2)
        {
            existing = new AdvancedMap();

            this._objectsPerType.add(k, existing);
        }

        return existing;
    }

    public get objects(): IAdvancedMap<number, IRoomObjectController>
    {
        return this._objects;
    }

    public get totalObjects(): number
    {
        return this._objects.length;
    }
}
