declare module WPApi {
    
    /**
     * Custom Post Type
     */
    interface Type {
        description: string;
        hierarchical: boolean;
        labels: TypeLabels;
        name: string;
        slug: string;
    }

    interface TypeLabels {
        name?: string;
        singular_name?: string;
        add_new?: string;
        add_new_item?: string;
        edit_item?: string;
        new_item?: string;
        view_item?: string;
        search_items?: string;
        not_found?: string;
        not_found_in_trash?: string;
        parent_item_colon?: string;
        all_items?: string;
        archives?: string;
        insert_into_item?: string;
        uploaded_to_this_item?: string;
        featured_image?: string;
        set_featured_image?: string;
        remove_featured_image?: string;
        use_featured_image?: string;
        filter_items_list?: string;
        items_list_navigation?: string;
        items_list?: string;
        menu_name?: string;
        name_admin_bar?: string;
    }
}