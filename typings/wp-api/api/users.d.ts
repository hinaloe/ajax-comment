/// <reference path="common.d.ts" />
declare module WPApi {
    interface User {
        name?: string;
        username?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        description?: string;
        nickname?: string;
        slug?: string;
        role?: string;
        capabilities: any;

    }

    /**
     * User Response
     */
    interface UserResponse extends User {
        id: number;
        link: string;
        avatar_urls: AvatarUrls;
        registered_date: string;
        extra_capabilities: any;
    }

    /**
     * User for create
     */
    interface UserNew extends User {
        username: string;
        email: string;

    }


}