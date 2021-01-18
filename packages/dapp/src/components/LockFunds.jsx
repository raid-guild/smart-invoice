import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { getResolverString, getToken } from '../utils/Helpers';
import { BigNumber, utils } from 'ethers';
import { uploadDisputeDetails } from '../utils/Ipfs';
import { lock } from '../utils/Invoice';

import '../sass/lockFunds.scss';
export const LockFunds = ({ invoice, balance, close }) => {
  const { address, provider } = useContext(AppContext);
  const { resolverType, token } = invoice;
  const resolver = getResolverString(resolverType);
  const { decimals, symbol } = getToken(token);
  const [disputeReason, setDisputeReason] = useState('');
  const fee =
    resolverType === 'lex_dao'
      ? `${utils.formatUnits(
          BigNumber.from(balance)
            .mul(5)
            .div(100),
          decimals,
        )} ${symbol}`
      : `150 DAI`;

  const lockFunds = async () => {
    if (provider && !locking && balance.gt(0)) {
      setLocking(true);

      const detailsHash = await uploadDisputeDetails({
        reason: disputeReason,
        invoice: address,
        amount: balance.toString(),
      });

      const tx = await lock(provider, address, detailsHash);

      await tx.wait();
      setLocking(false);
    }
  };

  const [showLexDAOSteps] = useState(false);
  const [locking, setLocking] = useState(false);

  if (locking) {
    return (
      <div className="lock-funds">
        <h1> Locking Funds </h1>
      </div>
    );
  }

  return (
    <div className="lock-funds">
      <h1> Lock Funds </h1>

      {!showLexDAOSteps ? (
        <>
          <p className="modal-note">
            Locking freezes all remaining funds in the contract and initiates a
            dispute.
          </p>
          <p>
            Once a dispute has been initated, {resolver} will review your case,
            including the project agreement and dispute reason to make a
            decision on how to fairly distribute remaining funds.
          </p>
          <div className="ordered-inputs">
            <p className="tooltip">
              <sl-tooltip content="Why do you want to lock these funds?">
                <i className="far fa-question-circle"></i>
              </sl-tooltip>
            </p>
            <label>Dispute Reason</label>
            <input
              type="text"
              value={disputeReason}
              onChange={e => setDisputeReason(e.target.value)}
            />
          </div>
          <p className="lock-note">
            <u>{resolver}</u> charges a {fee} fee to resolve this dispute. This
            amount will be deducted from the locked fund amount.
          </p>
          <button onClick={lockFunds}>
            Lock {utils.formatUnits(balance, decimals)} {symbol}
          </button>
          <a
            target="_blank"
            href={
              resolverType === 'lex_dao'
                ? 'https://github.com/lexDAO/Arbitration/blob/master/rules/ToU.md#lexdao-resolver'
                : 'https://anj.aragon.org/legal/terms-general.pdf'
            }
            rel="noreferrer noopener"
          >
            Learn about {resolver} dispute process & terms
          </a>
        </>
      ) : (
        <>
          <LexDAOSteps close={close} />
        </>
      )}
    </div>
  );
};

const LexDAOSteps = ({ close }) => {
  return (
    <>
      <button onClick={close}>Close</button>
    </>
  );
};