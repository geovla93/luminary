export interface IContact {
  id: string; // evm address
  alias: string;
  addresses: string[];
  avatar?: string;
  state: string;
}
