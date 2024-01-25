import {Blockchain} from './blockchain';

export type INFTs = {
  [K in Blockchain]: any;
};
