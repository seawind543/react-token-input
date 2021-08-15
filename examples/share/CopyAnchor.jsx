/* eslint no-console: 0 */
/* eslint no-unused-vars: 0 */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const CopyAnchor = ({ hashTag }) => {
  const handleCopyToClipBoard = useCallback(
    (e) => {
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
      style={{ marginLeft: '4px' }}
      href={`#${hashTag}`}
      onClick={handleCopyToClipBoard}
    >
      <span className="material-icons" style={{ verticalAlign: 'middle' }}>
        link
      </span>
    </a>
  );
};

CopyAnchor.propTypes = {
  hashTag: PropTypes.string.isRequired,
};

export default CopyAnchor;
