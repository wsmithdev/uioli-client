import React, { useCallback, useState, useEffect } from "react";

import PlaidApi from "../plaidApi";

import {
  usePlaidLink,
  PlaidLinkOnSuccess,
  PlaidLinkOnEvent,
  PlaidLinkOnExit,
  PlaidLinkOptions,
} from "react-plaid-link";

const PlaidLinkWithOAuth = ({sendPublicToken}) => {
  const [token, setToken] = useState<string | null>(null);
  const isOAuthRedirect = window.location.href.includes("?oauth_state_id=");

  // generate a link_token when component mounts
  useEffect(() => {
    if (isOAuthRedirect) {
      setToken(localStorage.getItem("link_token"));
      return;
    }
    const createLinkToken = async () => {
      const response = await PlaidApi.getLinkToken();

      setToken(response);
      localStorage.setItem("link_token", response);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    (publicToken, metadata) => {
      // send public_token to your server
      sendPublicToken(publicToken)
    },
    []
  );

  const onEvent = useCallback<PlaidLinkOnEvent>((eventName, metadata) => {
    console.log(eventName, metadata);
  }, []);

  const onExit = useCallback<PlaidLinkOnExit>((error, metadata) => {
    // Handle errors
    console.log(error, metadata);
  }, []);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
    onEvent,
    onExit,
  };
  if (isOAuthRedirect) {
    config.receivedRedirectUri = window.location.href;
  }

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (isOAuthRedirect && ready) {
      open();
    }
  }, [ready, open, isOAuthRedirect]);

  return isOAuthRedirect ? (
    <></>
  ) : (
    <button style={{marginBottom: "1.5rem"}} className="primary-btn" onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
};

export default PlaidLinkWithOAuth;
