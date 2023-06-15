﻿import { IGraphicAsset } from '@/api'
import { Vector3D } from '@/nitro'

export class FurnitureParticleSystemParticle {
  private _particleDirection: Vector3D
  private _lifeTime: number
  private _fadeTime: number
  private _frames: IGraphicAsset[]

  private _x: number

  public get x(): number {
    return this._x
  }

  public set x(x: number) {
    this._x = x
  }

  private _y: number

  public get y(): number {
    return this._y
  }

  public set y(y: number) {
    this._y = y
  }

  private _z: number

  public get z(): number {
    return this._z
  }

  public set z(z: number) {
    this._z = z
  }

  private _lastX: number

  public get lastX(): number {
    return this._lastX
  }

  public set lastX(y: number) {
    this._hasMoved = true
    this._lastX = y
  }

  private _lastY: number

  public get lastY(): number {
    return this._lastY
  }

  public set lastY(k: number) {
    this._hasMoved = true
    this._lastY = k
  }

  private _lastZ: number

  public get lastZ(): number {
    return this._lastZ
  }

  public set lastZ(z: number) {
    this._hasMoved = true
    this._lastZ = z
  }

  private _hasMoved: boolean = false

  public get hasMoved(): boolean {
    return this._hasMoved
  }

  private _age: number = 0

  public get age(): number {
    return this._age
  }

  private _isEmitter: boolean = false

  public get isEmitter(): boolean {
    return this._isEmitter
  }

  private _fade: boolean = false

  public get fade(): boolean {
    return this._fade
  }

  private _alphaMultiplier: number = 1

  public get alphaMultiplier(): number {
    return this._alphaMultiplier
  }

  public get direction(): Vector3D {
    return this._particleDirection
  }

  public get isAlive(): boolean {
    return this._age <= this._lifeTime
  }

  public init(x: number, y: number, z: number, direction: Vector3D, energy: number, timeStep: number, lifeTime: number, isEmitter: boolean = false, frames: IGraphicAsset[] = null, fade: boolean = false): void {
    this._x = x
    this._y = y
    this._z = z
    this._particleDirection = new Vector3D(direction.x, direction.y, direction.z)
    this._particleDirection.scaleBy(energy)

    this._lastX = (this._x - (this._particleDirection.x * timeStep))
    this._lastY = (this._y - (this._particleDirection.y * timeStep))
    this._lastZ = (this._z - (this._particleDirection.z * timeStep))
    this._age = 0
    this._hasMoved = false
    this._lifeTime = lifeTime
    this._isEmitter = isEmitter
    this._frames = frames
    this._fade = fade
    this._alphaMultiplier = 1
    this._fadeTime = (0.5 + (Math.random() * 0.5))
  }

  public dispose(): void {
    this._particleDirection = null
  }

  public update(): void {
    this._age++

    if (this._age === this._lifeTime) this.ignite()

    if (this._fade) {
      if ((this._age / this._lifeTime) > this._fadeTime) {
        this._alphaMultiplier = ((this._lifeTime - this._age) / (this._lifeTime * (1 - this._fadeTime)))
      }
    }
  }

  public getAsset(): IGraphicAsset {
    if (((this._frames) && (this._frames.length > 0))) {
      return this._frames[(this._age % this._frames.length)]
    }
    return null
  }

  public toString(): string {
    return [this._x, this._y, this._z].toString()
  }

  public copy(particle: FurnitureParticleSystemParticle, scale: number): void {
    this._x = (particle._x * scale)
    this._y = (particle._y * scale)
    this._z = (particle._z * scale)
    this._lastX = (particle._lastX * scale)
    this._lastY = (particle._lastY * scale)
    this._lastZ = (particle._lastZ * scale)
    this._hasMoved = particle.hasMoved
    this._particleDirection = particle._particleDirection
    this._age = particle._age
    this._lifeTime = particle._lifeTime
    this._isEmitter = particle._isEmitter
    this._fade = particle._fade
    this._fadeTime = particle._fadeTime
    this._alphaMultiplier = particle._alphaMultiplier
  }

  protected ignite(): void {
  }
}
