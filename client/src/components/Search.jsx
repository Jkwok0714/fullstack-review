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
      url: 'http://localhost:1128/repos',
      data: JSON.stringify(queryTerm),
      success: function(result) {
        // console.log('Ajaxxxed and got', result);
        self.props.onSearch(self.state.term, result);
        alert('Good');
      },
      error: function(err) {
        alert('Error:', err);
      }
    }).done(() => {
      console.log('All done');
    })
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange.bind(this)}/>
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>)
  }
}

export default Search;
