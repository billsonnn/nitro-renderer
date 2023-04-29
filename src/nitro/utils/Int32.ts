const toUint32 = (x: number) => x >>> 0;

export const ToInt32 = (x: number) =>
{
    const uint32 = toUint32(x);

    if(uint32 >= Math.pow(2, 31))
    {
        return uint32 - Math.pow(2, 32);
    }

    return uint32;
};
