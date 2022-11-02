export interface IRoomMapData
{
    width: number;
    height: number;
    wallHeight: number;
    fixedWallsHeight: number;
    tileMap: { height: number }[][];
    holeMap: { id: number, x: number, y: number, width: number, height: number }[];
    doors: { x: number, y: number, z: number, dir: number }[];
    dimensions: { minX: number, maxX: number, minY: number, maxY: number };
    restrictsDragging: boolean;
    restrictsScaling: boolean;
    restrictedScale: number;
}
