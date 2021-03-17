import { IAvatarImage } from '../IAvatarImage';
import { AvatarCanvas } from '../structure/AvatarCanvas';
import { AvatarSet } from './AvatarSet';
import { GeometryBodyPart } from './GeometryBodyPart';
import { Matrix4x4 } from './Matrix4x4';
import { Vector3D } from './Vector3D';

export class AvatarModelGeometry
{
    private _camera: Vector3D;
    private _avatarSet: AvatarSet;
    private _geometryTypes: Map<string, Map<string, GeometryBodyPart>>;
    private _itemIdToBodyPartMap: Map<string, Map<string, GeometryBodyPart>>;
    private _transformation: Matrix4x4;
    private _canvases: Map<string, Map<string, AvatarCanvas>>;

    constructor(k: any)
    {
        this._camera                = new Vector3D(0, 0, 10);
        this._avatarSet             = new AvatarSet(k.avatarSets[0]);
        this._geometryTypes         = new Map();
        this._itemIdToBodyPartMap   = new Map();
        this._transformation        = new Matrix4x4();
        this._canvases              = new Map();

        const camera = k.camera;

        if(camera)
        {
            this._camera.x = parseFloat(camera.x);
            this._camera.y = parseFloat(camera.y);
            this._camera.z = parseFloat(camera.z);
        }

        if(k.canvases && (k.canvases.length > 0))
        {
            for(const canvas of k.canvases)
            {
                if(!canvas) continue;

                const scale         = canvas.scale;
                const geometries    = new Map();

                if(canvas.geometries && (canvas.geometries.length > 0))
                {
                    for(const geometry of canvas.geometries)
                    {
                        if(!geometry) continue;

                        const avatarCanvas = new AvatarCanvas(geometry, scale);

                        geometries.set(avatarCanvas.id, avatarCanvas);
                    }
                }

                this._canvases.set(scale, geometries);
            }
        }

        if(k.types && (k.types.length > 0))
        {
            for(const type of k.types)
            {
                if(!type) continue;

                const bodyParts: Map<string, GeometryBodyPart>  = new Map();
                const itemIds: Map<string, GeometryBodyPart>    = new Map();

                if(type.bodyParts && (type.bodyParts.length > 0))
                {
                    for(const bodyPart of type.bodyParts)
                    {
                        if(!bodyPart) continue;

                        const geometryBodyPart = new GeometryBodyPart(bodyPart);

                        bodyParts.set(geometryBodyPart.id, geometryBodyPart);

                        for(const part of geometryBodyPart._Str_1456(null))
                        {
                            itemIds.set(part, geometryBodyPart);
                        }
                    }
                }

                this._geometryTypes.set(type.id, bodyParts);
                this._itemIdToBodyPartMap.set(type.id, itemIds);
            }
        }
    }

    public _Str_2101(k: IAvatarImage): void
    {
        for(const geometry of this._geometryTypes.values())
        {
            if(!geometry) continue;

            for(const part of geometry.values())
            {
                if(!part) continue;

                part._Str_2004(k);
            }
        }
    }

    public _Str_1307(k: string): string[]
    {
        const avatarSet = this._avatarSet._Str_1498(k);

        if(!avatarSet) return [];

        return avatarSet._Str_755();
    }

    public _Str_1939(k: string): boolean
    {
        const avatarSet = this._avatarSet._Str_1498(k);

        if(!avatarSet) return false;

        return avatarSet._Str_779;
    }

    public _Str_1664(k: string, _arg_2: string): AvatarCanvas
    {
        const canvas = this._canvases.get(k);

        if(!canvas) return null;

        return (canvas.get(_arg_2) || null);
    }

    private _Str_1342(k: string): boolean
    {
        const existing = this._geometryTypes.get(k);

        if(existing) return true;

        return false;
    }

    private _Str_1332(k: string, _arg_2: string): boolean
    {
        if(this._Str_1342(k))
        {
            const existing = this._geometryTypes.get(k);

            if(existing && existing.get(_arg_2)) return true;
        }

        return false;
    }

    private _Str_2072(k: string): string[]
    {
        const parts = this._Str_1280(k);

        const types = [];

        if(parts)
        {
            for(const part of parts.values())
            {
                if(!part) continue;

                types.push(part.id);
            }
        }

        return types;
    }

    private _Str_1280(k: string): Map<string, GeometryBodyPart>
    {
        if(this._Str_1342(k)) return this._geometryTypes.get(k);

        return new Map();
    }

    public _Str_1919(k: string, _arg_2: string): GeometryBodyPart
    {
        return (this._Str_1280(k).get(_arg_2) || null);
    }

    public _Str_1701(k: string, _arg_2: string, _arg_3:IAvatarImage): GeometryBodyPart
    {
        const itemIds = this._itemIdToBodyPartMap.get(k);

        if(itemIds)
        {
            const part = itemIds.get(_arg_2);

            if(part) return part;

            const parts = this._Str_1280(k);

            if(parts)
            {
                for(const part of parts.values())
                {
                    if(!part) continue;

                    if(part._Str_2030(_arg_2, _arg_3)) return part;
                }
            }
        }

        return null;
    }

    private _Str_1787(k: Map<string, GeometryBodyPart>, _arg_2: string): GeometryBodyPart[]
    {
        const parts         = this._Str_1307(_arg_2);
        const geometryParts = [];

        for(const part of parts)
        {
            if(!part) continue;

            const bodyPart = k.get(part);

            if(bodyPart)
            {
                geometryParts.push(bodyPart);
            }
        }

        return geometryParts;
    }

    public _Str_2250(k: string, _arg_2: number, _arg_3: string): string[]
    {
        if(!_arg_3) return [];

        const geometryParts                         = this._Str_1280(_arg_3);
        const parts                                 = this._Str_1787(geometryParts, k);
        const sets: [ number, GeometryBodyPart ][]  = [];
        const ids: string[]                         = [];

        this._transformation = Matrix4x4._Str_1560(_arg_2);

        for(const part of parts.values())
        {
            if(!part) continue;

            part._Str_1101(this._transformation);

            sets.push([ part._Str_1522(this._camera), part ]);
        }

        sets.sort((a, b) =>
        {
            const partA = a[0];
            const partB = b[0];

            if(partA < partB) return -1;

            if(partA > partB) return 1;

            return 0;
        });

        for(const set of sets)
        {
            if(!set) continue;

            ids.push(set[1].id);
        }

        return ids;
    }

    public _Str_713(k: string, _arg_2: string, _arg_3: number, _arg_4: any[], _arg_5:IAvatarImage): string[]
    {
        if(this._Str_1332(k, _arg_2))
        {
            const part = this._Str_1280(k).get(_arg_2);

            this._transformation = Matrix4x4._Str_1560(_arg_3);

            return part._Str_713(this._transformation, this._camera, _arg_4, _arg_5);
        }

        return [];
    }
}