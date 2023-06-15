import { Point } from '@pixi/math'
import { IVector3D } from '@/api'

export interface IRoomGeometry {
  updateId: number;
  z_scale: number;
  scale: number;
  directionAxis: IVector3D;
  direction: IVector3D;

  getCoordinatePosition(_arg_1: IVector3D): IVector3D;

  getScreenPoint(_arg_1: IVector3D): Point;

  getScreenPosition(_arg_1: IVector3D): IVector3D;

  getPlanePosition(_arg_1: Point, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D): Point;

  setDisplacement(_arg_1: IVector3D, _arg_2: IVector3D): void;

  adjustLocation(_arg_1: IVector3D, _arg_2: number): void;

  performZoom(): void;

  performZoomOut(): void;

  performZoomIn(): void;

  isZoomedIn(): boolean;
}
