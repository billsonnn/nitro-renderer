export interface IAnimation
{
    hasAvatarData(): boolean;
    hasDirectionData(): boolean;
    hasAddData(): boolean;
    id: string;
    spriteData: any;
    removeData: any;
    addData: any;
    resetOnToggle: boolean;
}
