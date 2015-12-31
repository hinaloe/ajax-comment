/// <reference path="../tsd.d.ts" />

/**
 * WP-API client-js (https://github.com/WP-API/client-js) for TypeScript
 */



declare module WP_API {
    interface WP_API {
        models: Models;
        collections: Collections;
        views: any;
        utils: Utils;
    }

    interface WP {
        api: WP_API;
    }

    interface Utils {
        parseISO8601(Date:Date): number;
    }

    interface Models {
        User: models.User;
        Taxonomy: models.Taxonomy;
        Term: models.Term;
        Post: models.Post;
        Page: models.Page;
        PostRevision: models.PostRevision;
        Media: models.Media;
        Comment: models.Comment;
        PostType: models.PostType;
        PostStatus: models.PostStatus;
        Schema: models.Schema;
    }

    interface Collections {

        Posts: collections.Posts;
        Pages: collections.Pages;
        Users: collections.Users;
        PostStatuses: collections.PostStatuses;
        MediaLibrary: collections.MediaLibrary;
        Taxonomies: collections.Taxonomies;
        Comments: collections.Comments;
        PostTypes: collections.PostTypes;
        Terms: collections.Terms;
        Revisions: collections.Revisions;
    }


    module models {

        class WPApiBaseModel extends Backbone.Model {
            sync(method: string, model: Backbone.Model, options: any): any;
            urlRoot: string;
        }


        class User extends WPApiBaseModel {
            defaults: WPApi.User;//??
        }

        class Taxonomy extends WPApiBaseModel {
            defaults: WPApi.Taxonomy;
        }

        class Term extends WPApiBaseModel {
            defaults: WPApi.Term;
        }

        class Post extends WPApiBaseModel {
            defaults: WPApi.Post;
        }

        class Page extends WPApiBaseModel {
            defaults: WPApi.Page;
        }

        class PostRevision extends WPApiBaseModel {
            defaults: WPApi.PostRevisions;
            url: () => string
        }

        class Media extends WPApiBaseModel {
            defaults: WPApi.Media;
        }

        class Comment extends WPApiBaseModel {
            defaults: WPApi.Comment;
        }

        class PostType extends WPApiBaseModel {
            defaults: WPApi.Type;
            save(): boolean;
            destroy(): boolean;
        }

        class PostStatus extends WPApiBaseModel {
            defaults: PostStatus;
            save(): boolean;
            destroy(): boolean;
        }

        class Schema extends WPApiBaseModel {
            defaults: any;
            save(): boolean;
            destroy(): boolean;
        }
		
		interface WPApiBaseModel {
			new(data:any):this;
			prototype:any;
		}

    }

    module collections {
        class BaseCollection<TModel extends models.WPApiBaseModel> extends Backbone.Collection<TModel> {

        }

        class Posts extends BaseCollection<models.Post> {

        }

        class Pages extends BaseCollection<models.Page> {

        }

        class Users extends BaseCollection<models.User> {

        }

        class PostStatuses extends BaseCollection<models.PostStatus>{

        }

        class MediaLibrary extends BaseCollection<models.Media> {

        }

        class Taxonomies extends BaseCollection<models.Taxonomy> {

        }

        class Comments extends BaseCollection<models.Comment>{

        }

        class PostTypes extends BaseCollection<models.PostType> {

        }

        class Terms extends BaseCollection<models.Term>{

        }

        class Revisions extends BaseCollection<models.PostRevision>{

        }
    }

}

declare interface Date {
    toISOString(): string;
}

declare var wp: WP_API.WP;

