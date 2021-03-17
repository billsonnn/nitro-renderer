import { IDisposable } from '../../core/common/disposable/IDisposable';
import { IVector3D } from '../utils/IVector3D';
import { IRoomObjectModel } from './IRoomObjectModel';
import { IRoomObjectMouseHandler } from './logic/IRoomObjectMouseHandler';
import { IRoomObjectVisualization } from './visualization/IRoomObjectVisualization';

export interface IRoomObject extends IDisposable
{
    getLocation(): IVector3D;
    getDirection(): IVector3D;
    getState(index?: number): number;
    id: number;
    instanceId: number;
    type: string;
    model: IRoomObjectModel;
    visualization: IRoomObjectVisualization;
    mouseHandler: IRoomObjectMouseHandler;
    location: IVector3D;
    direction: IVector3D;
    updateCounter: number;
    isReady: boolean;
}