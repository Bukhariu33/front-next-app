import type { QueryOptionsReturnType } from '@/libs/packages/queryBuilder';
import type { TableQueryFunctionReturn } from '@/libs/packages/tables';
import type { FilterParams } from '@/libs/packages/tables/types';
import type {
  Transaction,
  TransactionDetails,
} from '@/libs/types/base/fundWalletTransactionDetails';

export type FundWalletTransactionQueryOptions = QueryOptionsReturnType<
  TableQueryFunctionReturn<'fund', Transaction>,
  [
    queryParams?: FilterParams | undefined,
    _activeTab?: string | undefined,
    fundId?: string | undefined,
    ..._args: any[],
  ]
>;

export type FundWalletTransactionDetailsQueryOptions = QueryOptionsReturnType<
  TransactionDetails,
  [fundId: string, transactionId: string]
>;
