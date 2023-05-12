import useQueryParams from "./useQueryParams";


export const useQueryConfig1 = () => {
    const queryParams = useQueryParams();
    
    const queryConfig = {
         
        // _page: 1,
        _sort: "createdAt",
        _order: "asc",
        _page: queryParams.page || 1,
        _limit: queryParams.limit || '20',
        
        exclude: queryParams.exclude,
        name: queryParams.name,
        order: queryParams.order,
        price_max: queryParams.price_max,
        price_min: queryParams.price_min,
        rating_filter: queryParams.rating_filter,
        // _expand: queryParams.category
    }
    Object.keys(queryConfig).forEach(key => {
        if (queryConfig[key] === null || queryConfig[key] === undefined) {
            delete queryConfig[key];
        }
    });
    return queryConfig;
}
