import { IMessageComposer } from '../../../../../../core/communication/messages/IMessageComposer';

export class SaveRoomSettingsComposer implements IMessageComposer<ConstructorParameters<typeof SaveRoomSettingsComposer>>
{
    private _data: ConstructorParameters<typeof SaveRoomSettingsComposer>;

    constructor(roomId: number,
        roomName: string,
        roomDescription: string,
        lockState: number,
        password: string,
        userCount: number,
        categoryId: number,
        tagsCount: number,
        tags: string[],
        tradeState: number,
        allowPets: boolean,
        allowPetsEat: boolean,
        allowWalkthrough: boolean,
        hideWalls: boolean,
        wallThickness: number,
        floorThickness: number,
        muteState: number,
        kickState: number,
        banState: number,
        chatBubbleMode: number,
        chatBubbleWeight: number,
        chatBubbleSpeed: number,
        chatDistance: number,
        chatFloodProtection: number
    )
    {
        this._data = [
            roomId,
            roomName,
            roomDescription,
            lockState,
            password,
            userCount,
            categoryId,
            tagsCount,
            tags,
            tradeState,
            allowPets,
            allowPetsEat,
            allowWalkthrough,
            hideWalls,
            wallThickness,
            floorThickness,
            muteState,
            kickState,
            banState,
            chatBubbleMode,
            chatBubbleWeight,
            chatBubbleSpeed,
            chatDistance,
            chatFloodProtection
        ];
    }

    public getMessageArray()
    {
        return this._data;
    }

    public dispose(): void
    {
        return;
    }
}