import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  componentDidMount () {
    var self = this;
    $.get({
      url: process.env.URL + '/repos' || 'http://localhost:1128/repos',
      success: function(result) {
        self.search('Nothing', result);
        alert('Loaded Data');
      },
      error: function(err) {
        alert('Error:', err);
      }
    });
  }

  search (term, newRepos) {
    this.setState({repos: newRepos});
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <div id="backingBox"></div>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
