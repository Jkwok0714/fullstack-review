import React from 'react';

const RepoEntry = (props) => (
  <div className="repoEntry">
    <div className="repoTitleBar">
      <span className="repoTitle">{props.repo.name}</span> - {props.repo.owner}<br />
      <span className="subtitle"><a href={props.repo.url}>Click here to visit</a></span>
      <hr/>
    </div>
    <div className="infoBox">
      Last Updated: {props.repo.updated_at.substring(0, 10)}<br />
      Description: {props.repo.description}

    </div>

  </div>
)

export default RepoEntry;
