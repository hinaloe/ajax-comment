declare module WPApi {
    interface Taxonomy {
        description: string;
        hierarchal: boolean;
        labels: TaxnomyLabels;
        name: string;
        slug: string;
        show_cloud: boolean;
        types: string[];
    }
    
    interface TaxnomyLabels {
        name?: string;
        singular_name?: string;
        search_items?: string;
        popular_items?: string;
        all_items?: string;
        parent_item?: string;
        parent_item_colon?: string;
        edit_item?: string;
        view_item?: string;
        update_item?: string;
        add_new_item?: string;
        new_item_name?: string;
        separate_items_with_commas?: string;
        add_or_remove_items?: string;
        choose_from_most_used?: string;
        not_found?: string;
        no_terms?: string;
        items_list_navigation?: string;
        items_list?: string;
        menu_name?: string;
        name_admin_bar?: string;
    }
}