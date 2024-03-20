import { IMessageDataWrapper, IMessageParser, RoomObjectType } from '@nitrots/api';
import { UserMessageData } from './UserMessageData';

export class RoomUnitParser implements IMessageParser
{
    private _users: UserMessageData[];

    public flush(): boolean
    {
        this._users = [];

        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._users = [];

        const totalUsers = wrapper.readInt();

        let i = 0;

        while(i < totalUsers)
        {
            const id = wrapper.readInt();
            const username = wrapper.readString();
            const custom = wrapper.readString();
            let figure = wrapper.readString();
            const roomIndex = wrapper.readInt();
            const x = wrapper.readInt();
            const y = wrapper.readInt();
            const z = parseFloat(wrapper.readString());
            const direction = wrapper.readInt();
            const type = wrapper.readInt();

            const user = new UserMessageData(roomIndex);

            user.dir = direction;
            user.name = username;
            user.custom = custom;
            user.x = x;
            user.y = y;
            user.z = z;

            this._users.push(user);

            if(type === 1)
            {
                user.webID = id;
                user.userType = RoomObjectType.USER;
                user.sex = this.resolveSex(wrapper.readString());
                user.groupID = wrapper.readInt();
                user.groupStatus = wrapper.readInt();
                user.groupName = wrapper.readString();

                const swimFigure = wrapper.readString();

                if(swimFigure !== '') figure = this.convertSwimFigure(swimFigure, figure, user.sex);

                user.figure = figure;
                user.activityPoints = wrapper.readInt();
                user.isModerator = wrapper.readBoolean();
            }

            else if(type === 2)
            {
                user.userType = RoomObjectType.PET;
                user.figure = figure;
                user.webID = id;
                user.subType = wrapper.readInt().toString();
                user.ownerId = wrapper.readInt();
                user.ownerName = wrapper.readString();
                user.rarityLevel = wrapper.readInt();
                user.hasSaddle = wrapper.readBoolean();
                user.isRiding = wrapper.readBoolean();
                user.canBreed = wrapper.readBoolean();
                user.canHarvest = wrapper.readBoolean();
                user.canRevive = wrapper.readBoolean();
                user.hasBreedingPermission = wrapper.readBoolean();
                user.petLevel = wrapper.readInt();
                user.petPosture = wrapper.readString();
            }

            else if(type === 3)
            {
                user.userType = RoomObjectType.BOT;
                user.webID = (roomIndex * -1);

                if(figure.indexOf('/') === -1) user.figure = figure;
                else user.figure = 'hr-100-.hd-180-1.ch-876-66.lg-270-94.sh-300-64';

                user.sex = UserMessageData.M;
            }

            else if(type === 4)
            {
                user.userType = RoomObjectType.RENTABLE_BOT;
                user.webID = id;
                user.sex = this.resolveSex(wrapper.readString());
                user.figure = figure;
                user.ownerId = wrapper.readInt();
                user.ownerName = wrapper.readString();

                const totalSkills = wrapper.readInt();

                if(totalSkills)
                {
                    const skills: number[] = [];

                    let j = 0;

                    while(j < totalSkills)
                    {
                        skills.push(wrapper.readShort());

                        j++;
                    }

                    user.botSkills = skills;
                }
            }

            i++;
        }

        return true;
    }

    private resolveSex(sex: string): string
    {
        if(sex.substr(0, 1).toLowerCase() === 'f') return UserMessageData.F;

        return UserMessageData.M;
    }

    private convertSwimFigure(k: string, _arg_2: string, _arg_3: string): string
    {
        const _local_4 = _arg_2.split('.');
        let _local_5 = 1;
        let _local_6 = 1;
        let _local_7 = 1;
        const _local_8 = 10000;
        let i = 0;

        while(i < _local_4.length)
        {
            const _local_13 = _local_4[i];
            const _local_14 = _local_13.split('-');

            if(_local_14.length > 2)
            {
                const _local_15 = _local_14[0];

                if(_local_15 === 'hd') _local_5 = parseInt(_local_14[2]);
            }

            i++;
        }

        const _local_10 = ['238,238,238', '250,56,49', '253,146,160', '42,199,210', '53,51,44', '239,255,146', '198,255,152', '255,146,90', '157,89,126', '182,243,255', '109,255,51', '51,120,201', '255,182,49', '223,161,233', '249,251,50', '202,175,143', '197,198,197', '71,98,61', '138,131,97', '255,140,51', '84,198,39', '30,108,153', '152,79,136', '119,200,255', '255,192,142', '60,75,135', '124,44,71', '215,255,227', '143,63,28', '255,99,147', '31,155,121', '253,255,51'];
        const _local_11 = k.split('=');

        if(_local_11.length > 1)
        {
            const _local_16 = _local_11[1].split('/');
            const _local_17 = _local_16[0];
            const _local_18 = _local_16[1];

            if(_arg_3 === 'F') _local_7 = 10010;
            else _local_7 = 10011;

            const _local_19 = _local_10.indexOf(_local_18);

            _local_6 = ((_local_8 + _local_19) + 1);
        }

        return _arg_2 + ((((('.bds-10001-' + _local_5) + '.ss-') + _local_7) + '-') + _local_6);
    }

    public get users(): UserMessageData[]
    {
        return this._users;
    }
}
