import { getAddress } from '@ethersproject/address';

import {
  chainIds,
  explorerUrls,
  graphUrls,
  hexChainIds,
  invoiceFactory,
  IPFS_ENDPOINT,
  nativeSymbols,
  networkLabels,
  networkNames,
  resolverInfo,
  resolvers,
  rpcUrls,
  tokenInfo,
  tokens,
  wrappedNativeToken,
} from './constants';

export const getDateString = timeInSec => {
  const date = new Date(timeInSec ? timeInSec * 1000 : 0);
  const ye = new Intl.DateTimeFormat('en', {
    year: 'numeric',
  }).format(date);
  const mo = new Intl.DateTimeFormat('en', {
    month: 'long',
  }).format(date);
  const da = new Intl.DateTimeFormat('en', {
    day: '2-digit',
  }).format(date);
  return `${mo} ${da}, ${ye}`;
};

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = value => {
  try {
    return getAddress(value).toLowerCase();
  } catch {
    return false;
  }
};

export const getNetworkName = chainId =>
  networkNames[chainId] || 'Unknown Chain';

export const getGraphUrl = chainId => graphUrls[chainId] || graphUrls[4];

export const getExplorerUrl = chainId =>
  explorerUrls[chainId] || explorerUrls[4];

export const getRpcUrl = chainId => rpcUrls[chainId] || rpcUrls[4];

export const getResolvers = chainId => resolvers[chainId] || resolvers[4];

export const getResolverInfo = (chainId, resolver) =>
  (resolverInfo[chainId] || resolverInfo[4])[resolver];

export const getTokens = chainId => tokens[chainId] || tokens[4];

export const getTokenInfo = (chainId, token) =>
  (tokenInfo[chainId] || tokenInfo[4])[token] || {
    decimals: 18,
    symbol: 'UNKNOWN',
  };

export const getWrappedNativeToken = chainId =>
  wrappedNativeToken[chainId] || wrappedNativeToken[4];

export const getNativeTokenSymbol = chainId =>
  nativeSymbols[chainId] || nativeSymbols[4];

export const getInvoiceFactoryAddress = chainId =>
  invoiceFactory[chainId] || invoiceFactory[4];

export const getTxLink = (chainId, hash) =>
  `${getExplorerUrl(chainId)}/tx/${hash}`;

export const getAddressLink = (chainId, hash) =>
  `${getExplorerUrl(chainId)}/address/${hash}`;

// bytes58 QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51
// is the same as
// bytes64 12200000000000000000000000000000000000000000000000000000000000000000
// which means an all zeros bytes32 was input on the contract
export const getIpfsLink = hash =>
  hash === 'QmNLei78zWmzUdbeRB3CiUfAizWUrbeeZh5K1rhAQKCh51'
    ? ''
    : `${IPFS_ENDPOINT}/ipfs/${hash}`;

export const getAccountString = account => {
  const len = account.length;
  return `0x${account.substr(2, 3).toUpperCase()}...${account
    .substr(len - 3, len - 1)
    .toUpperCase()}`;
};

export const isKnownResolver = (chainId, resolver) =>
  getResolvers(chainId).indexOf(resolver.toLowerCase()) !== -1;

export const getResolverString = (chainId, resolver) => {
  const info = getResolverInfo(chainId, resolver);
  return info ? info.name : getAccountString(resolver);
};

export const logError = error => {
  // eslint-disable-next-line no-console
  console.error(error);
};

export const logDebug = msg => {
  if (process.env.REACT_APP_DEBUG_LOGS === 'true') {
    // eslint-disable-next-line no-console
    console.debug(msg);
  }
};

export const copyToClipboard = value => {
  const tempInput = document.createElement('input');
  tempInput.value = value;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
};

const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/;

export const isValidURL = str => {
  return !!URL_REGEX.test(str);
};

const BASE32_REGEX = /^[a-zA-Z2-7]+=*$/;
const BASE58_REGEX = /^[1-9A-HJ-NP-Za-km-z]+=*$/;

export const isValidCID = hash => {
  return (
    (hash.length === 59 &&
      hash.startsWith('bafy') &&
      !!BASE32_REGEX.test(hash)) ||
    (hash.length === 46 && hash.startsWith('Qm') && !!BASE58_REGEX.test(hash))
  );
};

export const isValidLink = url => {
  if (!url) return false;
  if (url.startsWith('ipfs://')) {
    return isValidCID(url.slice(7));
  }
  return isValidURL(url);
};

export const getChainId = network => chainIds[network] || chainIds.rinkeby;

export const getHexChainId = network =>
  hexChainIds[network] || hexChainIds.rinkeby;

export const getNetworkLabel = chainId => networkLabels[chainId] || 'unknown';
