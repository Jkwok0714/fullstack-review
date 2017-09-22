import React from 'react';

const RepoEntry = (props) => (
  <div>
    Here's a Repoo: {props.repo.name} - {props.repo.owner}
  </div>
)

export default RepoEntry;
