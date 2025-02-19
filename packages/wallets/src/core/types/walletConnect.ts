import { IWeb3Wallet } from "@walletconnect/web3wallet";
import EventEmitter from "eventemitter3";
import { AbstractClientWallet } from "../../evm/wallets/base";
import { SyncStorage } from "../SyncStorage";

export type WalletConnectMetadata = IWeb3Wallet["metadata"];

// connect dapp support through wcv2 protocol
export type WalletConnectReceiverConfig = {
  enableConnectApp?: boolean;
  walletConnectWalletMetadata?: WCMetadata;
  walletConnectV2ProjectId?: string;
  walletConnectV2RelayUrl?: string;
  wcStorage?: SyncStorage;
};

export type WCMetadata = {
  name: string;
  description: string;
  url: string;
  icons: string[];
  redirect?: {
    native?: string;
    universal?: string;
  };
};

export type WCErrorResponse = { code: number; message: string; data?: string };

export type WCJsonRpcError = {
  id: number;
  jsonrpc: string;
  error: WCErrorResponse;
};

export type WCJsonRpcResult = { id: number; jsonrpc: string; result: string };

export type WCProposerMetadata = {
  name: string;
  icons: string[];
  description?: string;
  url?: string;
};

export type WCEvent = "session_proposal" | "session_request" | "session_delete";

export type WCPeer = {
  metadata: WCProposerMetadata;
};

export type WCProposal = {
  proposer: {
    metadata: WCProposerMetadata;
  };
};

export type WCRequest = {
  topic: string;
  peer: WCPeer;
  params: any;
  method: string;
};

export type WCSession = {
  topic: string;
  peer: WCPeer;
};

export interface IWalletConnectReceiver {
  connectApp(uri: string): Promise<void>;
  approveSession(): Promise<void>;
  rejectSession(): Promise<void>;
  approveRequest(): Promise<void>;
  rejectRequest(): Promise<void>;
  getActiveSessions(): WCSession[];
  disconnectSession(): Promise<void>;
  isWCReceiverEnabled(): boolean;
}

export abstract class WalletConnectHandler extends EventEmitter {
  abstract init(): Promise<void>;
  abstract connectApp(uri: string): Promise<void>;
  abstract approveSession(wallet: AbstractClientWallet): Promise<void>;
  abstract rejectSession(): Promise<void>;
  abstract approveEIP155Request(wallet: AbstractClientWallet): Promise<void>;
  abstract rejectEIP155Request(): Promise<void>;
  abstract getActiveSessions(): WCSession[];
  abstract disconnectSession(): Promise<void>;
}
