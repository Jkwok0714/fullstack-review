import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.

    {props.repos.map((singleRepo, i) => {
      return <RepoEntry repo={singleRepo} key={i} />
    })
    }
  </div>
)

export default RepoList;
