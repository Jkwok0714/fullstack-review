import React from 'react';
import $ from 'jquery';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    var self = this;
    var queryTerm = {query: this.state.term};
    $.post({
      url: process.env.URL + '/repos' || 'http://localhost:1128/repos',
      data: JSON.stringify(queryTerm),
      success: function(result) {
        alert('New data loaded');
        self.props.onSearch(self.state.term, result);
      },
      error: function(err) {
        alert('An error occurred', err);
      }
    }).done(() => {
      console.log('All done');
    })
    this.refs.inbox.value = '';
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input ref="inbox" value={this.state.terms} onChange={this.onChange.bind(this)}/>
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>)
  }
}

export default Search;
