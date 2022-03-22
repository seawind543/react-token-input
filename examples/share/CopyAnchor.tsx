/* eslint no-unused-vars: 0 */
/* eslint @typescript-eslint/no-unused-vars: 0 */

import React, { useCallback } from 'react';
import './copyAnchor.scss';

type Props = {
  hashTag: string;
};

const CopyAnchor = ({ hashTag }: Props) => {
  const handleCopyToClipBoard = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const url = new URL(document.location.href);
      url.hash = hashTag;
      navigator.clipboard.writeText(url.href);
    },
    [hashTag]
  );

  return (
    <a
      id={hashTag}
      className="hashTag"
      href={`#${hashTag}`}
      onClick={handleCopyToClipBoard}
    >
      <span className="material-icons">link</span>
    </a>
  );
};

export default CopyAnchor;
