export class AvatarAction
{
    public static CARRY_OBJECT = 'cri';
    public static DANCE = 'dance';
    public static EFFECT = 'fx';
    public static EXPRESSION = 'expression';
    public static EXPRESSION_BLOW_A_KISS = 'blow';
    public static EXPRESSION_CRY = 'cry';
    public static EXPRESSION_IDLE = 'idle';
    public static EXPRESSION_LAUGH = 'laugh';
    public static EXPRESSION_RESPECT = 'respect';
    public static EXPRESSION_RIDE_JUMP = 'ridejump';
    public static EXPRESSION_SNOWBOARD_OLLIE = 'sbollie';
    public static EXPRESSION_SNOWBORD_360 = 'sb360';
    public static EXPRESSION_WAVE = 'wave';
    public static GESTURE = 'gest';
    public static GESTURE_AGGRAVATED = 'agr';
    public static GESTURE_SAD = 'sad';
    public static GESTURE_SMILE = 'sml';
    public static GESTURE_SURPRISED = 'srp';
    public static GUIDE_STATUS = 'guide';
    public static MUTED = 'muted';
    public static PET_GESTURE_BLINK = 'eyb';
    public static PET_GESTURE_CRAZY = 'crz';
    public static PET_GESTURE_JOY = 'joy';
    public static PET_GESTURE_MISERABLE = 'mis';
    public static PET_GESTURE_PUZZLED = 'puz';
    public static PET_GESTURE_TONGUE = 'tng';
    public static PLAYING_GAME = 'playing_game';
    public static POSTURE = 'posture';
    public static POSTURE_FLOAT = 'float';
    public static POSTURE_LAY = 'lay';
    public static POSTURE_SIT = 'sit';
    public static POSTURE_STAND = 'std';
    public static POSTURE_SWIM = 'swim';
    public static POSTURE_WALK = 'mv';
    public static SIGN = 'sign';
    public static SLEEP = 'sleep';
    public static SNOWWAR_DIE_BACK = 'swdieback';
    public static SNOWWAR_DIE_FRONT = 'swdiefront';
    public static SNOWWAR_PICK = 'swpick';
    public static SNOWWAR_RUN = 'swrun';
    public static SNOWWAR_THROW = 'swthrow';
    public static TALK = 'talk';
    public static BLINK = 'blink';
    public static TYPING = 'typing';
    public static USE_OBJECT = 'usei';
    public static VOTE = 'vote';

    public static GESTURE_MAP = [ '', AvatarAction.GESTURE_SMILE, AvatarAction.GESTURE_AGGRAVATED, AvatarAction.GESTURE_SURPRISED, AvatarAction.GESTURE_SAD, AvatarAction.PET_GESTURE_JOY, AvatarAction.PET_GESTURE_CRAZY, AvatarAction.PET_GESTURE_TONGUE, AvatarAction.PET_GESTURE_BLINK, AvatarAction.PET_GESTURE_MISERABLE, AvatarAction.PET_GESTURE_PUZZLED ];

    public static EXPRESSION_MAP = [ '', AvatarAction.EXPRESSION_WAVE, AvatarAction.EXPRESSION_BLOW_A_KISS, AvatarAction.EXPRESSION_LAUGH, AvatarAction.EXPRESSION_CRY, AvatarAction.EXPRESSION_IDLE, AvatarAction.DANCE, AvatarAction.EXPRESSION_RESPECT, AvatarAction.EXPRESSION_SNOWBOARD_OLLIE, AvatarAction.EXPRESSION_SNOWBORD_360, AvatarAction.EXPRESSION_RIDE_JUMP ];

    public static getExpressionTimeout(expressionId: number): number
    {
        expressionId = parseInt(expressionId as any);

        switch(expressionId)
        {
            case 1:
                return 5000;
            case 2:
                return 1400;
            case 3:
                return 2000;
            case 4:
                return 2000;
            case 5:
                return 0;
            case 6:
                return 700;
            case 7:
                return 2000;
            case 8:
                return 1500;
            case 9:
                return 1500;
            case 10:
                return 1500;
            default:
                return 0;
        }
    }

    public static getExpressionId(expression: string): number
    {
        return AvatarAction.EXPRESSION_MAP.indexOf(expression);
    }

    public static getExpression(expressionId: number): string
    {
        if(expressionId > AvatarAction.EXPRESSION_MAP.length) return null;

        return AvatarAction.EXPRESSION_MAP[expressionId];
    }

    public static getGestureId(gesture: string): number
    {
        return AvatarAction.GESTURE_MAP.indexOf(gesture);
    }

    public static getGesture(gestureId: number): string
    {
        if(gestureId > AvatarAction.GESTURE_MAP.length) return null;

        return AvatarAction.GESTURE_MAP[gestureId];
    }

    public static idToAvatarActionState(id: string): string
    {
        if(id === 'Lay') return 'lay';
        if(id === 'Float') return 'float';
        if(id === 'Swim') return 'swim';
        if(id === 'Sit') return 'sit';
        if(id === 'Respect') return 'respect';
        if(id === 'Wave') return 'wave';
        if(id === 'Idle') return 'idle';
        if(id === 'Dance') return 'dance';
        if(id === 'UseItem') return 'usei';
        if(id === 'CarryItem') return 'cri';
        if(id === 'Talk') return 'talk';
        if(id === 'Sleep') return 'Sleep';
        if(id === 'Move') return 'mv';

        return 'std';
    }
}
