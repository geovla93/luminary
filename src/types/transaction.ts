import {Blockchain} from './blockchain';

export type ITransactions = {
  [K in Blockchain]: any;
};

export type IPendingTransactions = ITransactions;
