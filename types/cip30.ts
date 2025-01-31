/**
 * https://github.com/geniusyield/atlas-docs/blob/8cb2059023ae5fc2219523ab9c92b13a7a6504d2/src/components/browser-integration.tsx#L77
 */
export type WalletApi = {
  getNetworkId(): Promise<number>;
  getUtxos(): Promise<string[] | undefined>;
  getBalance(): Promise<string>;
  getUsedAddresses(): Promise<string[]>;
  getUnusedAddresses(): Promise<string[]>;
  getChangeAddress(): Promise<string>;
  getRewardAddresses(): Promise<string[]>;
  signTx(tx: string, partialSign: boolean): Promise<string>;
  signData(address: string, payload: string): Promise<{ signature: string; key: string }>;
  submitTx(tx: string): Promise<string>;
  getCollateral(): Promise<string[]>;
  experimental: {
    getCollateral(): Promise<string[]>;
    on(eventName: string, callback: (...args: unknown[]) => void): void;
    off(eventName: string, callback: (...args: unknown[]) => void): void;
  };
};

export declare type Wallet = {
  name: string;
  icon: string;
  apiVersion: string;
  enable(): Promise<WalletApi>;
  isEnabled(): Promise<boolean>;
};

export declare type Cardano = {
  [key: string]: Wallet;
};

declare global {
  interface Window {
    cardano: Cardano;
  }
}
