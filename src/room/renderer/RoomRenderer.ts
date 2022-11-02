import { IRoomObject, IRoomRenderer, IRoomRenderingCanvas, IRoomSpriteCanvasContainer } from '../../api';
import { RoomSpriteCanvas } from './RoomSpriteCanvas';

export class RoomRenderer implements IRoomRenderer, IRoomSpriteCanvasContainer
{
    private _objects: Map<number, IRoomObject>;
    private _canvases: Map<number, IRoomRenderingCanvas>;

    private _disposed: boolean;
    private _roomObjectVariableAccurateZ: string;

    constructor()
    {
        this._objects = new Map();
        this._canvases = new Map();

        this._disposed = false;
        this._roomObjectVariableAccurateZ = null;
    }

    public dispose(): void
    {
        if(this._disposed) return;

        if(this._canvases)
        {
            for(const [key, canvas] of this._canvases.entries())
            {
                this._canvases.delete(key);

                if(!canvas) continue;

                canvas.dispose();
            }

            this._canvases = null;
        }

        if(this._objects)
        {
            this._objects = null;
        }

        this._disposed = true;
    }

    public reset(): void
    {
        this._objects.clear();
    }

    public getInstanceId(object: IRoomObject): number
    {
        if(!object) return -1;

        return object.instanceId;
    }

    public getRoomObject(instanceId: number): IRoomObject
    {
        return this._objects.get(instanceId);
    }

    public addObject(object: IRoomObject): void
    {
        if(!object) return;

        this._objects.set(this.getInstanceId(object), object);
    }

    public removeObject(object: IRoomObject): void
    {
        const instanceId = this.getInstanceId(object);

        this._objects.delete(instanceId);

        for(const canvas of this._canvases.values())
        {
            if(!canvas) continue;

            const spriteCanvas = canvas as RoomSpriteCanvas;

            spriteCanvas.removeFromCache(instanceId.toString());
        }
    }

    public render(time: number, update: boolean = false): void
    {
        if(!this._canvases || !this._canvases.size) return;

        for(const canvas of this._canvases.values()) canvas && canvas.render(time, update);
    }

    public update(time: number, update: boolean = false): void
    {
        if(!this._canvases || !this._canvases.size) return;

        this.render(time, update);

        for(const canvas of this._canvases.values()) canvas && canvas.update();
    }

    public getCanvas(id: number): IRoomRenderingCanvas
    {
        const existing = this._canvases.get(id);

        if(!existing) return null;

        return existing;
    }

    public createCanvas(id: number, width: number, height: number, scale: number): IRoomRenderingCanvas
    {
        const existing = this._canvases.get(id) as IRoomRenderingCanvas;

        if(existing)
        {
            existing.initialize(width, height);

            if(existing.geometry) existing.geometry.scale = scale;

            return existing;
        }

        const canvas = this.createSpriteCanvas(id, width, height, scale);

        if(!canvas) return;

        this._canvases.set(id, canvas);

        return canvas;
    }

    private createSpriteCanvas(id: number, width: number, height: number, scale: number): IRoomRenderingCanvas
    {
        return new RoomSpriteCanvas(this, id, width, height, scale);
    }

    public removeCanvas(id: number): void
    {
        const existing = this._canvases.get(id);

        if(!existing) return;

        this._canvases.delete(id);

        existing.dispose();
    }

    public get objects(): Map<number, IRoomObject>
    {
        return this._objects;
    }

    public get disposed(): boolean
    {
        return this._disposed;
    }

    public get roomObjectVariableAccurateZ(): string
    {
        return this._roomObjectVariableAccurateZ;
    }

    public set roomObjectVariableAccurateZ(z: string)
    {
        this._roomObjectVariableAccurateZ = z;
    }
}
