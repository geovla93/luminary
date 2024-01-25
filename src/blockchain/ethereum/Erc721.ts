import {IBlockchain} from '@itypes/blockchain';
import {Network} from './ChainNetwork';
import {ethers} from 'ethers';
import axios from 'axios';

const abi = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
  'function maxSupply() view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function balanceOf(address owner) view returns (uint256)',
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)',
  'function safeTransferFrom(address from, address to, uint256 tokenId)',
  'function transferFrom(address from, address to, uint256 tokenId)',
  'function approve(address to, uint256 tokenId)',
  'function setApprovalForAll(address operator, bool _approved)',
  'function getApproved(uint256 tokenId) view returns (address)',
  'function isApprovedForAll(address owner, address operator) view returns (bool)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function supportsInterface(bytes4 interfaceId) view returns (bool)',
  'function royaltyAddress() view returns (address)',
];

class Erc721 {
  public address: string;
  network: any;
  wallet: any;

  constructor(address: string, config: IBlockchain) {
    this.address = address;
    this.network = new Network(config, true);
    this.wallet = new ethers.VoidSigner(address, this.network.getProvider());
  }

  getName = async (contract: ethers.Contract) => {
    try {
      return await contract.name();
    } catch (error) {
      return 'N/A';
    }
  };

  getSymbol = async (contract: ethers.Contract) => {
    try {
      return await contract.symbol();
    } catch (error) {
      return 'N/A';
    }
  };

  getTotalSupply = async (contract: ethers.Contract) => {
    try {
      return await contract.totalSupply();
    } catch (error) {
      return 'N/A';
    }
  };

  public async getFirstTokenMetadata(
    contract: ethers.Contract,
  ): Promise<string | null> {
    try {
      const tokenData = await contract.tokenURI('1');
      return tokenData;
    } catch (error) {
      return null;
    }
  }

  public checkIpfs = (ipfsLink: string) => {
    if (ipfsLink.startsWith('ipfs://')) {
      ipfsLink = `https://ipfs.io/ipfs/${ipfsLink.replace('ipfs://', '')}`;
    }
    return ipfsLink;
  };

  public async getCollection(contractAddress: string): Promise<any> {
    const contract = new ethers.Contract(contractAddress, abi, this.wallet);
    const name = await this.getName(contract);
    const symbol = await this.getSymbol(contract);

    const totalSupply = await this.getTotalSupply(contract);
    const metadata = await this.getFirstTokenMetadata(contract);

    return {
      name,
      symbol,
      totalSupply,
      metadata,
      // nfts: await this.getAddressNfts(contractAddress),
    };
  }

  public async getBalance(contractAddress: string): Promise<any> {
    const contract = new ethers.Contract(contractAddress, abi, this.wallet);
    const balance = await contract.balanceOf(this.address);
    return balance;
  }

  public async getAddressNfts(contractAddress: string): Promise<any> {
    const contract = new ethers.Contract(contractAddress, abi, this.wallet);
    const balance = await contract.balanceOf(this.address);

    const nfts = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(this.address, i);

      const info = await contract.tokenURI(tokenId);
      nfts.push({
        tokenId,
        info,
      });
    }
    return nfts;
  }

  public async getNftsPaginated(
    contractAddress: string,
    page: number,
    perPage: number = 10,
  ): Promise<any> {
    const contract = new ethers.Contract(contractAddress, abi, this.wallet);
    const balance = await contract.balanceOf(this.address);

    const nfts: any[] = [];
    const start = page * perPage;
    const end = start + perPage;
    for (let i = start; i < end; i++) {
      if (i >= balance) {
        break;
      }
      try {
        const tokenId = await contract.tokenOfOwnerByIndex(this.address, i);
        const info = await contract.tokenURI(tokenId);

        const metadata = this.checkIpfs(info);
        const metaDataValue = (await axios.get(metadata)).data;

        nfts.push({
          tokenId: tokenId.toString(),
          metadata,
          ...metaDataValue,
        });
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    return nfts;
  }

  public async paginateAllNfts(
    contractAddress: string,
    page: number,
    perPage: number = 10,
  ): Promise<any> {
    const contract = new ethers.Contract(contractAddress, abi, this.wallet);
    const totalSupply = await contract.totalSupply();

    const nfts: any[] = [];
    const start = page * perPage;
    const end = start + perPage;
    for (let i = start; i < end; i++) {
      if (i >= totalSupply) {
        break;
      }
      try {
        const info = await contract.tokenURI(i);

        const metadata = this.checkIpfs(info);
        const metaDataValue = (await axios.get(metadata)).data;

        nfts.push({
          tokenId: i.toString(),
          metadata,
          ...metaDataValue,
        });
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    return nfts;
  }

  public getABI() {
    return abi;
  }
}

export default Erc721;
