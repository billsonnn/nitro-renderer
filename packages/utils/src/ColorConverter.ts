import { IVector3D } from '@nitrots/api';
import { Vector3d } from './Vector3d';

export class ColorConverter
{
    private static HEX_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

    public static hex2rgb(hex: number, out: Array<number> | Float32Array = []): Array<number> | Float32Array
    {
        out[0] = ((hex >> 16) & 0xFF) / 255;
        out[1] = ((hex >> 8) & 0xFF) / 255;
        out[2] = (hex & 0xFF) / 255;

        return out;
    }

    public static hex2rgba(hex: number, out: Array<number> | Float32Array = []): Array<number> | Float32Array
    {
        out[0] = ((hex >> 16) & 0xFF) / 255;
        out[1] = ((hex >> 8) & 0xFF) / 255;
        out[2] = (hex & 0xFF) / 255;
        out[3] = (hex & 0xFF);

        return out;
    }

    public static rgb2hex(rgb: number[] | Float32Array): number
    {
        return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0));
    }

    public static rgba2hex(rgb: number[] | Float32Array): number
    {
        return (((rgb[0] * 255) << 16) + ((rgb[1] * 255) << 8) + (rgb[2] * 255 | 0) + (rgb[3] | 0));
    }

    public static rgbStringToHex(rgb: string): string
    {
        const extracted = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        return '#' + ColorConverter.getHex(extracted[1]) + ColorConverter.getHex(extracted[2]) + ColorConverter.getHex(extracted[3]);
    }

    public static getHex(x: any)
    {
        return isNaN(x) ? '00' : ColorConverter.HEX_DIGITS[(x - x % 16) / 16] + ColorConverter.HEX_DIGITS[x % 16];
    }

    public static int2rgb(color: number): string
    {
        color >>>= 0;
        const b = color & 0xFF;
        const g = (color & 0xFF00) >>> 8;
        const r = (color & 0xFF0000) >>> 16;
        const a = ((color & 0xFF000000) >>> 24) / 255;

        return 'rgba(' + [r, g, b, 1].join(',') + ')';
    }

    public static rgbToHSL(rgbValue: number): number
    {
        const red = ((rgbValue >> 16) & 0xFF) / 0xFF;
        const green = ((rgbValue >> 8) & 0xFF) / 0xFF;
        const blue = (rgbValue & 0xFF) / 0xFF;

        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const delta = max - min;

        let hue = 0;
        let saturation = 0;
        const lightness = (max + min) / 2;

        if(delta !== 0)
        {
            saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

            switch(max)
            {
                case red:
                    hue = (green - blue) / delta + (green < blue ? 6 : 0);
                    break;
                case green:
                    hue = (blue - red) / delta + 2;
                    break;
                case blue:
                    hue = (red - green) / delta + 4;
                    break;
            }

            hue *= 60;
        }

        const h = Math.round((hue / 360) * 0xFF);
        const s = Math.round(saturation * 0xFF);
        const l = Math.round(lightness * 0xFF);

        return (h << 16) + (s << 8) + l;
    }

    public static hslToRGB(hslValue: number): number
    {
        const hue = ((hslValue >> 16) & 0xFF) / 0xFF;
        const saturation = ((hslValue >> 8) & 0xFF) / 0xFF;
        const lightness = (hslValue & 0xFF) / 0xFF;

        let red = 0;
        let green = 0;
        let blue = 0;

        if(saturation > 0)
        {
            const t2 = lightness < 0.5 ? lightness * (1 + saturation) : (lightness + saturation) - (lightness * saturation);
            const t1 = (2 * lightness) - t2;

            const rgb = [hue + (1 / 3), hue, hue - (1 / 3)].map(color =>
            {
                if(color < 0) color += 1;
                if(color > 1) color -= 1;
                if(color * 6 < 1) return t1 + ((t2 - t1) * 6 * color);
                if(color * 2 < 1) return t2;
                if(color * 3 < 2) return t1 + ((t2 - t1) * ((2 / 3) - color) * 6);
                return t1;
            });

            [red, green, blue] = rgb;
        }
        else
        {
            red = green = blue = lightness; // In the case of no saturation, all colors are the same.
        }

        const r = Math.round(red * 0xFF);
        const g = Math.round(green * 0xFF);
        const b = Math.round(blue * 0xFF);

        return (r << 16) + (g << 8) + b;
    }

    public static rgb2xyz(k: number): IVector3D
    {
        let _local_2: number = (((k >> 16) & 0xFF) / 0xFF);
        let _local_3: number = (((k >> 8) & 0xFF) / 0xFF);
        let _local_4: number = (((k >> 0) & 0xFF) / 0xFF);
        if(_local_2 > 0.04045)
        {
            _local_2 = Math.pow(((_local_2 + 0.055) / 1.055), 2.4);
        }
        else
        {
            _local_2 = (_local_2 / 12.92);
        }
        if(_local_3 > 0.04045)
        {
            _local_3 = Math.pow(((_local_3 + 0.055) / 1.055), 2.4);
        }
        else
        {
            _local_3 = (_local_3 / 12.92);
        }
        if(_local_4 > 0.04045)
        {
            _local_4 = Math.pow(((_local_4 + 0.055) / 1.055), 2.4);
        }
        else
        {
            _local_4 = (_local_4 / 12.92);
        }
        _local_2 = (_local_2 * 100);
        _local_3 = (_local_3 * 100);
        _local_4 = (_local_4 * 100);
        return new Vector3d((((_local_2 * 0.4124) + (_local_3 * 0.3576)) + (_local_4 * 0.1805)), (((_local_2 * 0.2126) + (_local_3 * 0.7152)) + (_local_4 * 0.0722)), (((_local_2 * 0.0193) + (_local_3 * 0.1192)) + (_local_4 * 0.9505)));
    }

    public static xyz2CieLab(k: IVector3D): IVector3D
    {
        let _local_2: number = (k.x / 95.047);
        let _local_3: number = (k.y / 100);
        let _local_4: number = (k.z / 108.883);
        if(_local_2 > 0.008856)
        {
            _local_2 = Math.pow(_local_2, (1 / 3));
        }
        else
        {
            _local_2 = ((7.787 * _local_2) + (16 / 116));
        }
        if(_local_3 > 0.008856)
        {
            _local_3 = Math.pow(_local_3, (1 / 3));
        }
        else
        {
            _local_3 = ((7.787 * _local_3) + (16 / 116));
        }
        if(_local_4 > 0.008856)
        {
            _local_4 = Math.pow(_local_4, (1 / 3));
        }
        else
        {
            _local_4 = ((7.787 * _local_4) + (16 / 116));
        }
        return new Vector3d(((116 * _local_3) - 16), (500 * (_local_2 - _local_3)), (200 * (_local_3 - _local_4)));
    }

    public static rgb2CieLab(k: number): IVector3D
    {
        return ColorConverter.xyz2CieLab(ColorConverter.rgb2xyz(k));
    }

    public static colorize(colorA: number, colorB: number): number
    {
        if(colorB === 0xFFFFFFFF) return colorA;

        let r = ((colorB >> 16) & 0xFF);
        let g = ((colorB >> 8) & 0xFF);
        let b = (colorB & 0xFF);

        r = ((((colorA >> 16) & 0xFF) * r) / 0xFF);
        g = ((((colorA >> 8) & 0xFF) * g) / 0xFF);
        b = (((colorA & 0xFF) * b) / 0xFF);

        return ((colorA && 0xFF000000) | (r << 16) | (g << 8) | b);
    }
}
