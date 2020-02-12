import React from "react";
import { Scrollbars } from 'react-custom-scrollbars'
import {Square, Circle} from './Icons'
import "./Search.css";

function SearchItem(props) {

    return (
        <div key={props.key} className={`search-item ${props.item.Type}`}
        onClick={() => props.active === props.item ? props.handleClick(null) : props.handleClick(props.item)}
        onMouseEnter={() => props.handleHover(props.item)}
        onMouseLeave={() => props.handleHover(null)}
        >
          { props.item.Icon === 'NationState' ? <Square/> : <Circle/> }
          <div className='search-title'>
            <div>{props.item.Name}</div>
            <div>{props.item.Year}</div>
          </div>
          <div className='search-nation'>
            <div>{props.item.IndigenousNation}</div>
          </div>
    
          
        </div>
    );
  }


function SearchResults(props) {
  if (!props.results || props.results.length === 0) return null;
  const results = props.results;
  const listItems = results.map(result => (
    <SearchItem
      key={result.id}
      item={result}
      handleClick={props.handleClick}
      handleHover={props.handleHover}
      active={props.active}
    />
  ));
  return props.displayed ? (
    <Scrollbars
                    autoHeight
                    autoHeightMin={0}
                    autoHeightMax={'30vh'}
                    renderThumbVertical={props => <div {...props} className="thumb-vertical" />}>
    <div className="search-list">
      {listItems}
    </div>
    </Scrollbars>
  ) : null;
}

export default SearchResults;