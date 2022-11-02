import { IMessageDataWrapper, IMessageParser } from '../../../../../api';
import { PromoArticleData } from './PromoArticleData';

export class PromoArticlesMessageParser implements IMessageParser
{
    private _articles: PromoArticleData[];

    public flush(): boolean
    {
        this._articles = [];
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        const count = wrapper.readInt();

        for(let i = 0; i < count; i++)
        {
            this._articles.push(new PromoArticleData(wrapper));
        }

        return true;
    }

    public get articles(): PromoArticleData[]
    {
        return this._articles;
    }
}
