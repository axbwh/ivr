import React from "react";
import "./SearchResults.css";

function SearchItem(props) {
    return (
      <li className="ui-menu-item">
        <div className="ui-menu-item-wrapper"
        //   onMouseEnter={() => props.onHover(props.item)}
        //   onMouseLeave={props.onUnHover}
        //   onClick={() => props.onSelect(props.item)}
        >
          {props.item.Name}
        </div>
      </li>
    );
  }


function SearchResults(props) {
  if (!props.results || props.results.length === 0) return null;
  const results = props.results;
  const listItems = results.map(result => (
    <SearchItem
      key={result.id}
      item={result}
    //   onHover={props.onHover}
    //   onUnHover={props.onUnHover}
    //   onSelect={props.onSelect}
    />
  ));
  return props.displayed ? (
    <ul className="">
      {listItems}
    </ul>
  ) : null;
}

export default SearchResults;