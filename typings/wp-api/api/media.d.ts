/// <reference path="item.d.ts" />

declare module WPApi {
    interface Media extends Item {
        alt_text: string;
        caption: string;
        description: string;

        post: number;

    }

    interface MediaResponse extends Media, ItemResponse {
        media_type: string;
        media_details: any;
        source_url: string;
    }


}