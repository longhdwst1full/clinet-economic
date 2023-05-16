import useQueryParams from "./useQueryParams";


export const useQueryConfig1 = () => {
    const queryParams = useQueryParams();

    const queryConfig = {

        // _page: 1,
        _sort: "createdAt" || queryParams._sort,
        _page: queryParams.page || 1,
        _limit: queryParams.limit || '20',
        _categoryId: queryParams._categoryId,
        // name: queryParams.name,
        _order: "asc" || queryParams._order,
        priceMin: queryParams.priceMin,
        priceMax: queryParams.priceMax,
        _expand: queryParams._expand
    }
    Object.keys(queryConfig).forEach(key => {
        if (queryConfig[key] === null || queryConfig[key] === undefined) {
            delete queryConfig[key];
        }
    });
    return queryConfig;
}
