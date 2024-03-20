import { IMessageComposer } from '@nitrots/api';

export class SaveRoomSettingsComposer
implements
    IMessageComposer<
    ConstructorParameters<typeof SaveRoomSettingsComposer>
    >
{
    private _data: ConstructorParameters<typeof SaveRoomSettingsComposer>;

    constructor(
        roomId: number,
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
        //@ts-ignore
        this._data = [];

        this._data.push(
            roomId,
            roomName,
            roomDescription,
            lockState,
            password,
            userCount,
            categoryId
        );

        this._data.push(tags.length, ...tags);

        this._data.push(
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
        );
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
