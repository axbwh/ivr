import React, { Component } from 'react'
import Fuse from 'fuse.js'
import './Search.css'

import SearchResults from './SearchResults'

class Search extends Component {
  constructor(props) {
    super(props)

    const options = {
      keys: ['Name', 'Year', 'IndigenousNation']
    }
    this.fuse = new Fuse(this.props.projects, options)
    this.state = {
      displayResults: true,
      results: [],
      value: ''
    }
  }

  componentDidMount() {
    this.fuse.setCollection(this.props.projects)
    // document.addEventListener("mousedown", this.handleClickOutside);
  }

  handleChange = event => {
    const results = this.fuse.search(event.target.value)
    console.log(results)
    this.setState({
      ...this.state,
      results: results,
      displayResults: true,
      value: event.target.value
    })
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  handleFocus = event => {
    if (this.state.value.length > 1) {
      this.setState({ ...this.state, displayResults: true })
    }
  }

  handleBlur = event => {
    this.setState({ ...this.state, displayResults: false })
  }

  //   handleNodeHover = item => {
  //     cytoscapeStore.hoveredNode = item.id;
  //   };

  //   handleNodeUnHover = () => {
  //     cytoscapeStore.hoveredNode = null;
  //   };

  //   handleSelect = item => {
  //     cytoscapeStore.hoveredNode = null;
  //     cytoscapeStore.selectedNode = item.id;
  //     this.setState({ ...this.state, displayResults: false, value: item.name });
  //   };

  render() {
    return (
      <div className='search-wrap' ref={this.setWrapperRef}>
        <SearchResults
          displayed={this.state.displayResults}
          results={this.state.results}
          onHover={this.handleNodeHover}
          //   onUnHover={this.handleNodeUnHover}
          //   onSelect={this.handleSelect}
        />
        <input
        autocomplete="off"
          type='text'
          id='autocomplete'
          placeholder='Search Projects'
          spellCheck='false'
          value={this.state.value}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </div>
    )
  }
}

export default Search
