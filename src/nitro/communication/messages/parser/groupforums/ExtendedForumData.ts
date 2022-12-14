import { IMessageDataWrapper } from '../../../../../api';
import { ForumData } from './ForumData';

export class ExtendedForumData extends ForumData
{
    private _readPermissions: number;
    private _postMessagePermissions: number;
    private _postThreadPermissions: number;
    private _moderatePermissions: number;
    private _readPermissionError: string;
    private _postMessagePermissionError: string;
    private _postThreadPermissionError: string;
    private _moderatePermissionError: string;
    private _reportPermissionError: string;
    private _canChangeSettings: boolean;
    private _isStaff: boolean;

    public static parse(wrapper: IMessageDataWrapper): ExtendedForumData
    {
        const extendedForumData: ExtendedForumData = new ExtendedForumData();

        ForumData.fillFromMessage(extendedForumData, wrapper);

        extendedForumData._readPermissions = wrapper.readInt();
        extendedForumData._postMessagePermissions = wrapper.readInt();
        extendedForumData._postThreadPermissions = wrapper.readInt();
        extendedForumData._moderatePermissions = wrapper.readInt();
        extendedForumData._readPermissionError = wrapper.readString();
        extendedForumData._postMessagePermissionError = wrapper.readString();
        extendedForumData._postThreadPermissionError = wrapper.readString();
        extendedForumData._moderatePermissionError = wrapper.readString();
        extendedForumData._reportPermissionError = wrapper.readString();
        extendedForumData._canChangeSettings = wrapper.readBoolean();
        extendedForumData._isStaff = wrapper.readBoolean();

        return extendedForumData;
    }

    public get readPermissions(): number
    {
        return this._readPermissions;
    }

    public get postMessagePermissions(): number
    {
        return this._postMessagePermissions;
    }

    public get postThreadPermissions(): number
    {
        return this._postThreadPermissions;
    }

    public get moderatePermissions(): number
    {
        return this._moderatePermissions;
    }

    public get hasReadPermissionError(): boolean
    {
        return (this._readPermissionError.length === 0);
    }

    public get canReport(): boolean
    {
        return true;
    }

    public get hasPostMessagePermissionError(): boolean
    {
        return (this._postMessagePermissionError.length === 0);
    }

    public get hasPostThreadPermissionError(): boolean
    {
        return (this._postThreadPermissionError.length === 0);
    }

    public get hasModeratePermissionError(): boolean
    {
        return (this._moderatePermissionError.length === 0);
    }

    public get canChangeSettings(): boolean
    {
        return this._canChangeSettings;
    }

    public get isStaf(): boolean
    {
        return this._isStaff;
    }

    public get readPermissionError(): string
    {
        return this._readPermissionError;
    }

    public get postMessagePermissionError(): string
    {
        return this._postMessagePermissionError;
    }

    public get postThreadPermissionError(): string
    {
        return this._postThreadPermissionError;
    }

    public get moderatePermissionError(): string
    {
        return this._moderatePermissionError;
    }

    public get reportPermissionError(): string
    {
        return this._reportPermissionError;
    }
}
