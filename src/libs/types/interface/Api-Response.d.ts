interface MetaData {
  total: number;
  currentPage: number;
  eachPage: number;
  lastPage: number;
}
interface APIResponse<T> {
  status: number;
  data: T;
  meta: MetaData;
}

type Exceptions = 'TOKEN_EXPIRED';

interface APIError {
  status: number;
  errors: {
    property: string;
    constraints: Record<string, string>;
  }[];
  message: string;
  exception: Exceptions;
}
