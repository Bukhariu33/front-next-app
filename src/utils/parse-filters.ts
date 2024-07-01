type QueryParam = string | string[] | undefined;

type Filters = {
  paginate: QueryParam;
  page: QueryParam;
  sort: QueryParam;
} & {
  [key: string]: QueryParam;
};

export const parseFilters = (filters: Partial<Filters>) => {
  return {
    ...filters,
    page: Number(filters?.page || 1),
    paginate: Number(filters?.paginate || 15),
  };
};
