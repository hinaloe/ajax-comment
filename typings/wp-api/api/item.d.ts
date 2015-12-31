/// <reference path="common.d.ts" />

declare module WPApi {


    interface Item {
        date?: any;
        date_gmt?: any;



        modified?: any;
        modified_gmt?: any;
        password?: string;
        slug?: string;
        status?: string;

        content?: Renderable;
        author?: number;
        excerpt?: Renderable;
        featured_image?: number;
        comment_status?: string;
        ping_status?: string;


    }

    /**
     * ReadOnly
     */
    interface ItemResponse extends WPApi.Item {
        guid?: Renderable;
        link?: string;
        id: number;
        type?: string;

    }
}