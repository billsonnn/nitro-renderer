import { GraphicAsset } from '../../../../../room/object/visualization/utils/GraphicAsset';
import { Vector3D } from '../../../../avatar/geometry/Vector3D';
import { FurnitureParticleSystemParticle } from './FurnitureParticleSystemParticle';

export class FurnitureParticleSystemEmitter extends FurnitureParticleSystemParticle
{
    public static CONE: string = 'cone';
    public static PLANE: string = 'plane';
    public static SPHERE: string = 'sphere';

    private _name: string;
    private _roomObjectSpriteId: number = -1;
    private _force: number;
    private _timeStep: number = 0.1;
    private _gravity: number;
    private _airFriction: number;
    private _explosionShape: string;
    private _particleConfigurations: { [index: string]: any }[];
    private _particles: FurnitureParticleSystemParticle[];
    private _maxNumberOfParticles: number;
    private _particlesPerFrame: number;
    private _emittedParticles: number;
    private _fuseTime: number = 10;
    private _energy: number = 1;
    private _hasIgnited: boolean = false;
    private _burstPulse: number = 1;

    constructor(k: string='', _arg_2: number=-1)
    {
        super();

        this._particles = [];
        this._name = k;
        this._roomObjectSpriteId = _arg_2;
        this._particleConfigurations = [];
    }

    public dispose(): void
    {
        for(const k of this._particles) k.dispose();

        this._particles                 = null;
        this._direction                 = null;
        this._particleConfigurations    = null;

        super.dispose();
    }

    public setup(k: number, _arg_2: number, _arg_3: number, _arg_4: Vector3D, _arg_5: number, _arg_6: number, _arg_7: string, _arg_8: number, _arg_9: number, _arg_10: number): void
    {
        this._maxNumberOfParticles = k;
        this._particlesPerFrame = _arg_2;
        this._force = _arg_3;
        this._direction = _arg_4;
        this._direction.normalize();
        this._gravity = _arg_5;
        this._airFriction = _arg_6;
        this._explosionShape = _arg_7;
        this._fuseTime = _arg_9;
        this._energy = _arg_8;
        this._burstPulse = _arg_10;
        this.reset();
    }

    public reset(): void
    {
        let k:FurnitureParticleSystemParticle;
        for(const k of this._particles) k.dispose();
        this._particles = [];
        this._emittedParticles = 0;
        this._hasIgnited = false;
        this.init(0, 0, 0, this._direction, this._force, this._timeStep, this._fuseTime, true);
    }

    public copyStateFrom(k:FurnitureParticleSystemEmitter, _arg_2: number): void
    {
        super.copy(k, _arg_2);
        this._force = k._force;
        this._direction = k._direction;
        this._gravity = k._gravity;
        this._airFriction = k._airFriction;
        this._explosionShape = k._explosionShape;
        this._fuseTime = k._fuseTime;
        this._energy = k._energy;
        this._burstPulse = k._burstPulse;
        this._timeStep = k._timeStep;
        this._hasIgnited = k._hasIgnited;
    }

    public configureParticle(k: number, _arg_2: boolean, _arg_3: GraphicAsset[], _arg_4: boolean): void
    {
        const _local_5 = [];
        _local_5['lifeTime'] = k;
        _local_5['isEmitter'] = _arg_2;
        _local_5['frames'] = _arg_3;
        _local_5['fade'] = _arg_4;
        this._particleConfigurations.push(_local_5);
    }

    protected ignite(): void
    {
        this._hasIgnited = true;
        if((this._emittedParticles < this._maxNumberOfParticles))
        {
            if(this.age > 1)
            {
                this.releaseParticles(this, this.direction);
            }
        }
    }

    private releaseParticles(k:FurnitureParticleSystemParticle, _arg_2: Vector3D = null): void
    {
        if(!_arg_2) _arg_2 = new Vector3D();

        const _local_3  = new Vector3D();
        const _local_5  = this.getRandomParticleConfiguration();

        let _local_10 = 0;

        while(_local_10 < this._particlesPerFrame)
        {
            switch(this._explosionShape)
            {
                case FurnitureParticleSystemEmitter.CONE:
                    _local_3.x = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    _local_3.y = -(Math.random() + 1);
                    _local_3.z = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    break;
                case FurnitureParticleSystemEmitter.PLANE:
                    _local_3.x = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    _local_3.y = 0;
                    _local_3.z = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    break;
                case FurnitureParticleSystemEmitter.SPHERE:
                    _local_3.x = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    _local_3.y = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    _local_3.z = ((this.randomBoolean(0.5)) ? Math.random() : -(Math.random()));
                    break;
            }

            _local_3.normalize();

            const _local_4 = new FurnitureParticleSystemParticle();

            let _local_6 = 0;
            let _local_7 = false;
            let _local_8 = false;
            let _local_9: GraphicAsset[] = [];

            if(_local_5)
            {
                _local_6 = Math.floor(((Math.random() * _local_5['lifeTime']) + 10));
                _local_7 = _local_5['isEmitter'];
                _local_9 = _local_5['frames'];
                _local_8 = _local_5['fade'];
            }
            else
            {
                _local_6 = Math.trunc(Math.floor(((Math.random() * 20) + 10)));
                _local_7 = false;
                _local_9 = [];
            }

            _local_4.init(k.x, k.y, k.z, _local_3, this._energy, this._timeStep, _local_6, _local_7, _local_9, _local_8);

            this._particles.push(_local_4);
            this._emittedParticles++;

            _local_10++;
        }
    }

    private getRandomParticleConfiguration()
    {
        const k: number = Math.trunc(Math.floor((Math.random() * this._particleConfigurations.length)));
        return this._particleConfigurations[k];
    }

    public update(): void
    {
        super.update();
        this.accumulateForces();
        this.verlet();
        this.satisfyConstraints();
        if(((!(this.isAlive)) && (this._emittedParticles < this._maxNumberOfParticles)))
        {
            if((this.age % this._burstPulse) == 0)
            {
                this.releaseParticles(this, this.direction);
            }
        }
    }

    public verlet(): void
    {
        let _local_2:FurnitureParticleSystemParticle;
        let _local_3: number;
        let _local_4: number;
        let _local_5: number;
        if(((this.isAlive) || (this._emittedParticles < this._maxNumberOfParticles)))
        {
            _local_3 = this.x;
            _local_4 = this.y;
            _local_5 = this.z;
            this.x = (((2 - this._airFriction) * this.x) - ((1 - this._airFriction) * this.lastX));
            this.y = ((((2 - this._airFriction) * this.y) - ((1 - this._airFriction) * this.lastY)) + ((this._gravity * this._timeStep) * this._timeStep));
            this.z = (((2 - this._airFriction) * this.z) - ((1 - this._airFriction) * this.lastZ));
            this.lastX = _local_3;
            this.lastY = _local_4;
            this.lastZ = _local_5;
        }
        const k: FurnitureParticleSystemParticle[] = [];

        for(const _local_2 of this._particles)
        {
            _local_2.update();
            _local_3 = _local_2.x;
            _local_4 = _local_2.y;
            _local_5 = _local_2.z;
            _local_2.x = (((2 - this._airFriction) * _local_2.x) - ((1 - this._airFriction) * _local_2.lastX));
            _local_2.y = ((((2 - this._airFriction) * _local_2.y) - ((1 - this._airFriction) * _local_2.lastY)) + ((this._gravity * this._timeStep) * this._timeStep));
            _local_2.z = (((2 - this._airFriction) * _local_2.z) - ((1 - this._airFriction) * _local_2.lastZ));
            _local_2.lastX = _local_3;
            _local_2.lastY = _local_4;
            _local_2.lastZ = _local_5;
            if(((_local_2.y > 10) || (!(_local_2.isAlive))))
            {
                k.push(_local_2);
            }
        }
        for(const _local_2 of k)
        {
            if(_local_2.isEmitter)
            {
                //
            }

            this._particles.splice(this._particles.indexOf(_local_2), 1);

            _local_2.dispose();
        }
    }

    private satisfyConstraints(): void
    {
    }

    private accumulateForces(): void
    {
        for(const k of this._particles)
        {
            //
        }
    }

    public get particles(): FurnitureParticleSystemParticle[]
    {
        return this._particles;
    }

    public get hasIgnited(): boolean
    {
        return this._hasIgnited;
    }

    private randomBoolean(k: number): boolean
    {
        return Math.random() < k;
    }

    public get roomObjectSpriteId(): number
    {
        return this._roomObjectSpriteId;
    }
}
