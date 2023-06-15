export interface IAnimation {
  id: string;
  spriteData: any;
  removeData: any;
  addData: any;
  resetOnToggle: boolean;

  hasAvatarData(): boolean;

  hasDirectionData(): boolean;

  hasAddData(): boolean;
}
