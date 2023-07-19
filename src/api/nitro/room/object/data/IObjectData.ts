import { IRoomObjectModel } from '../../../../room';
import { IMessageDataWrapper } from '../../../communication';

export interface IObjectData
{
    state: number;
    isUnique: boolean;
    uniqueNumber: number;
    uniqueSeries: number;
    rarityLevel: number;
    flags: number;
    parseWrapper(wrapper: IMessageDataWrapper): void;
    initializeFromRoomObjectModel(model: IRoomObjectModel): void;
    writeRoomObjectModel(model: IRoomObjectModel): void;
    getLegacyString(): string;
    compare(data: IObjectData): boolean;
}
