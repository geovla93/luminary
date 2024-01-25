import {Blockchain} from './blockchain';

export interface InftTrait {
  trait_type: string;
  value: string;
  rarity_score?: number;
}

interface INFTMetadata {
  id: string;
  json: string;
}

export interface INFT {
  metadata: INFTMetadata;
  name?: string;
  description?: string;
  file_url?: string;
  image?: string;
  external_url?: string;
  attributes?: InftTrait[];
  legion?: string;
  total_rarity_score?: number;
  rank?: number;
  legion_rank?: number;
  activity?: any[];
}

export type INFTs = {
  [K in Blockchain]: any;
};

export type ICollection = {
  uuid: string;
  name: string;
  description: string | null;
  image: string | null;
  sc_address: string;
  chain_id: number;
  total_supply: number;
  owner_address: string | null;
  nfts?: INFT[];
};

export type IBlockchainCollections = {
  [K in Blockchain]: ICollection[];
};
