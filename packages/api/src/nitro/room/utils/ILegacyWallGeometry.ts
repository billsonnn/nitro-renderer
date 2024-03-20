import { IVector3D } from '../../../utils';

export interface ILegacyWallGeometry
{
    dispose: () => void;
    readonly disposed: boolean;
    scale: number;
    initialize(width: number, height: number, floorHeight: number): void;
    setHeight(x: number, y: number, height: number): boolean;
    getHeight(x: number, y: number): number;
    getLocation(k: number, _arg_2: number, _arg_3: number, _arg_4: number, _arg_5: string): IVector3D;
    getLocationOldFormat(k: number, _arg_2: number, _arg_3: string): IVector3D;
    getOldLocation(k: IVector3D, _arg_2: number): [number, number, number, number, string];
    getOldLocationString(k: IVector3D, _arg_2: number): string;
    getDirection(k: string): number;
    getFloorAltitude(k: number, _arg_2: number): number;
    isRoomTile(k: number, _arg_2: number): boolean;
}
