import React from "react";
import { Input, Select } from "semantic-ui-react";
import options from "../data/options";

class SearchBar extends React.PureComponent {
  _onChangeSelect = (_, { value }) => {
    const { onCategoryChange } = this.props;
    onCategoryChange(value);
  };

  _onTextChange = e => {
    const { onTextChange } = this.props;
    const value = e.target.value;
    onTextChange(value);
  };

  render() {
    const { category, text } = this.props;
    return (
      <div className="search-container">
        <Input
          fluid
          placeholder="Search..."
          value={text}
          onChange={this._onTextChange}
        >
          <input />
          <Select
            onChange={this._onChangeSelect}
            compact
            options={options}
            value={category}
          />
        </Input>
      </div>
    );
  }
}

export default SearchBar;
