/// <reference path="item.d.ts" />

declare module WPApi {
    interface Post extends Item {
        format?: string;
        sticky?: boolean;
    }
    
    interface PostResponse extends Post,ItemResponse {
        
    }
}