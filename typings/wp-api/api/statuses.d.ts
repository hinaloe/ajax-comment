declare module WPApi {
    interface Statuses {
        name: string;
        private: boolean;
        protected: boolean;
        public: boolean;
        queryable: boolean;
        show_in_list: boolean;
        slug: string;
    }
}