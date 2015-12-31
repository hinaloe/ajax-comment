/// <reference path="common.d.ts" />

declare module WPApi {
    interface Comment {
        author?: number;
        author_email?: string;
        author_name?: string;
        author_url?: string;
        content?: any;
        date?: any;
        date_gmt?: any;
        karma?: number;
        parent?: number;
        post?: number;
        status?: string;
        type?: string;
    }

    interface CommentResponse extends Comment {
        id: number;
        author_avatar_urls: AvatarUrls;
        author_ip: string;
        author_user_agent: string;
		content: Renderable;
        link: string;

    }


}