declare module WPApi {
    interface PostTerms {
        order?: string;
        orderby?: string;
    }
    
    interface Term {
        /** @readonly */
        id?: number;
        /** @readonly */
        count?:number;
        description?: string;
        /**@readonly */
        link?:string;
        /**@required */
        name?: string;
        slug?: string;
        /**@readonly */
        taxnonomy?:string;
        
    }
}