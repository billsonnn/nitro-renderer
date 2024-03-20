import { IPetCustomPart } from '../../session';

export interface IPetFigureData
{
    readonly typeId: number;
    readonly paletteId: number;
    readonly color: string;
    readonly breedId: number;
    readonly figuredata: string;
    readonly customParts: IPetCustomPart[];
    readonly customPartCount: number;
}
