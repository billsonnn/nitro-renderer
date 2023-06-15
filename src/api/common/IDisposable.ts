export interface IDisposable {
  disposed: boolean;

  dispose(): void;
}
