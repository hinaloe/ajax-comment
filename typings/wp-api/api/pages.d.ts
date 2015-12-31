/// <reference path="item.d.ts" />

declare module WPApi {
    interface Page extends Item {
        menu_order?: number;
        template?: string;
    }

    interface PageResponse extends Page, ItemResponse {

    }
}