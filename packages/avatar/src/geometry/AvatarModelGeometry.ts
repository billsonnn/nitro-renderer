import { IAvatarImage } from '@nitrots/api';
import { Vector3d } from '@nitrots/utils';
import { Matrix4x4 } from '@nitrots/utils/src/Matrix4x4';
import { AvatarCanvas } from '../structure';
import { AvatarSet } from './AvatarSet';
import { GeometryBodyPart } from './GeometryBodyPart';

export class AvatarModelGeometry
{
    private _camera: Vector3d;
    private _avatarSet: AvatarSet;
    private _geometryTypes: Map<string, Map<string, GeometryBodyPart>>;
    private _itemIdToBodyPartMap: Map<string, Map<string, GeometryBodyPart>>;
    private _transformation: Matrix4x4;
    private _canvases: Map<string, Map<string, AvatarCanvas>>;

    constructor(k: any)
    {
        this._camera = new Vector3d(0, 0, 10);
        this._avatarSet = new AvatarSet(k.avatarSets[0]);
        this._geometryTypes = new Map();
        this._itemIdToBodyPartMap = new Map();
        this._transformation = new Matrix4x4();
        this._canvases = new Map();

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

                const scale = canvas.scale;
                const geometries = new Map();

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

                const bodyParts: Map<string, GeometryBodyPart> = new Map();
                const itemIds: Map<string, GeometryBodyPart> = new Map();

                if(type.bodyParts && (type.bodyParts.length > 0))
                {
                    for(const bodyPart of type.bodyParts)
                    {
                        if(!bodyPart) continue;

                        const geometryBodyPart = new GeometryBodyPart(bodyPart);

                        bodyParts.set(geometryBodyPart.id, geometryBodyPart);

                        for(const part of geometryBodyPart.getPartIds(null))
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

    public removeDynamicItems(k: IAvatarImage): void
    {
        for(const geometry of this._geometryTypes.values())
        {
            if(!geometry) continue;

            for(const part of geometry.values())
            {
                if(!part) continue;

                part.removeDynamicParts(k);
            }
        }
    }

    public getBodyPartIdsInAvatarSet(k: string): string[]
    {
        const avatarSet = this._avatarSet.findAvatarSet(k);

        if(!avatarSet) return [];

        return avatarSet.getBodyParts();
    }

    public isMainAvatarSet(k: string): boolean
    {
        const avatarSet = this._avatarSet.findAvatarSet(k);

        if(!avatarSet) return false;

        return avatarSet.isMain;
    }

    public getCanvas(k: string, _arg_2: string): AvatarCanvas
    {
        const canvas = this._canvases.get(k);

        if(!canvas) return null;

        return (canvas.get(_arg_2) || null);
    }

    private typeExists(k: string): boolean
    {
        const existing = this._geometryTypes.get(k);

        if(existing) return true;

        return false;
    }

    private hasBodyPart(k: string, _arg_2: string): boolean
    {
        if(this.typeExists(k))
        {
            const existing = this._geometryTypes.get(k);

            if(existing && existing.get(_arg_2)) return true;
        }

        return false;
    }

    private getBodyPartIDs(k: string): string[]
    {
        const parts = this.getBodyPartsOfType(k);

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

    private getBodyPartsOfType(k: string): Map<string, GeometryBodyPart>
    {
        if(this.typeExists(k)) return this._geometryTypes.get(k);

        return new Map();
    }

    public getBodyPart(k: string, _arg_2: string): GeometryBodyPart
    {
        return (this.getBodyPartsOfType(k).get(_arg_2) || null);
    }

    public getBodyPartOfItem(k: string, _arg_2: string, _arg_3: IAvatarImage): GeometryBodyPart
    {
        const itemIds = this._itemIdToBodyPartMap.get(k);

        if(itemIds)
        {
            const part = itemIds.get(_arg_2);

            if(part) return part;

            const parts = this.getBodyPartsOfType(k);

            if(parts)
            {
                for(const part of parts.values())
                {
                    if(!part) continue;

                    if(part.hasPart(_arg_2, _arg_3)) return part;
                }
            }
        }

        return null;
    }

    private getBodyPartsInAvatarSet(k: Map<string, GeometryBodyPart>, _arg_2: string): GeometryBodyPart[]
    {
        const parts = this.getBodyPartIdsInAvatarSet(_arg_2);
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

    public getBodyPartsAtAngle(k: string, _arg_2: number, _arg_3: string): string[]
    {
        if(!_arg_3) return [];

        const geometryParts = this.getBodyPartsOfType(_arg_3);
        const parts = this.getBodyPartsInAvatarSet(geometryParts, k);
        const sets: [number, GeometryBodyPart][] = [];
        const ids: string[] = [];

        this._transformation = Matrix4x4.getYRotationMatrix(_arg_2);

        for(const part of parts.values())
        {
            if(!part) continue;

            part.applyTransform(this._transformation);

            sets.push([part.getDistance(this._camera), part]);
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

    public getParts(k: string, _arg_2: string, _arg_3: number, _arg_4: any[], _arg_5: IAvatarImage): string[]
    {
        if(this.hasBodyPart(k, _arg_2))
        {
            const part = this.getBodyPartsOfType(k).get(_arg_2);

            this._transformation = Matrix4x4.getYRotationMatrix(_arg_3);

            return part.getParts(this._transformation, this._camera, _arg_4, _arg_5);
        }

        return [];
    }
}
