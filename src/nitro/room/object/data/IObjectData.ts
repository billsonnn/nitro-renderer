import { IMessageDataWrapper } from '../../../../core/communication/messages/IMessageDataWrapper';
import { IRoomObjectModel } from '../../../../room/object/IRoomObjectModel';

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
