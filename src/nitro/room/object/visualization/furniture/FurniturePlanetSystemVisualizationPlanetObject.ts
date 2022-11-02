import { Vector3d } from '../../../../../api';

export class FurniturePlanetSystemVisualizationPlanetObject
{
    private static SYSTEM_TEMPO: number = 30;

    private _name: string;
    private _index: number;
    private _radius: number;
    private _arcSpeed: number;
    private _arcOffset: number;
    private _height: number;
    private _position: number;
    private _positionVector: Vector3d;
    private _children: FurniturePlanetSystemVisualizationPlanetObject[];

    constructor(name: string, index: number, radius: number, arcSpeed: number, arcOffset: number, height: number)
    {
        this._name = name;
        this._index = index;
        this._radius = radius;
        this._arcSpeed = (((arcSpeed * Math.PI) * 2) / 360);
        this._arcOffset = (((arcOffset * Math.PI) * 2) / 360);
        this._height = height;
        this._position = 0;
        this._positionVector = new Vector3d(0, 0, 0);
        this._children = [];
    }

    public dispose(): void
    {
        while(this._children.length > 0)
        {
            const child = this._children.shift();

            child.dispose();
        }
    }

    public update(offsets: Vector3d[], rootPosition: Vector3d, scale: number): void
    {
        this._position = (this._position + (this._arcSpeed / FurniturePlanetSystemVisualizationPlanetObject.SYSTEM_TEMPO));

        offsets[this._index] = this.getPositionVector(rootPosition, scale);

        for(const child of this._children) child.update(offsets, this._positionVector, scale);
    }

    public getPositionVector(position: Vector3d, scale: number): Vector3d
    {
        const cos = (this._radius * Math.cos((this._position + this._arcOffset)));
        const sine = (this._radius * Math.sin((this._position + this._arcOffset)));

        this._positionVector.x = ((cos - sine) * (scale / 2));
        this._positionVector.y = ((((sine + cos) * (scale / 2)) * 0.5) - (this._height * (scale / 2)));
        this._positionVector.z = -(Math.trunc(((4 * (cos + sine)) - 0.7)));

        if(position) this._positionVector.add(position);

        return this._positionVector;
    }

    public addChild(planetObject: FurniturePlanetSystemVisualizationPlanetObject): void
    {
        if(this._children.indexOf(planetObject) >= 0) return;

        this._children.push(planetObject);
    }

    public hasChild(name: string): boolean
    {
        return !!this.getChild(name);
    }

    public getChild(name: string): FurniturePlanetSystemVisualizationPlanetObject
    {
        for(const child of this._children)
        {
            if(child.name === name) return child;

            if(child.hasChild(name)) return child.getChild(name);
        }

        return null;
    }

    public get name(): string
    {
        return this._name;
    }
}
