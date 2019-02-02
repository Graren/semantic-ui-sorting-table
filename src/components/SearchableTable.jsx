import React from "react";
import Table from "./UserTable";
import SearchBar from "./SearchBar";
import data from "../data/data.json";
import options from "../data/options";

class SearchableTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentlyShownElements: data,
      text: "",
      category: options[0].value,
      sortingCategory: options[0].value,
      strategy: "descending"
    };
  }

  _onTextChange = text => {
    this.setState({ text });
  };

  _onCategoryChange = category => {
    this.setState({ category });
  };

  componentDidUpdate = (_, prevState) => {
    if (
      this.state.text !== prevState.text ||
      this.state.category !== prevState.category
    )
      this.setState({ currentlyShownElements: this._filterElements(data) });
  };

  _filterElements = data => {
    const { category, text } = this.state;
    if (!text || text === "") return data;
    else {
      if (category === options[0].value) {
        return data.filter(user => user.username.includes(text));
      } else if (category === options[1].value) {
        return data.filter(user => user.email.includes(text));
      } else if (category === options[2].value) {
        try {
          const numericValue = parseInt(text);
          return data.filter(user => user.age === numericValue);
        } catch (err) {
          return data;
        }
      } else {
        return data;
      }
    }
  };

  _onSortingCategorySelect = category => {
    this.setState({ sortingCategory: category, strategy: "descending" });
  };

  _onSortingStrategyChange = e => {
    e.stopPropagation();
    const { strategy: currentStrat } = this.state;
    this.setState({
      strategy: currentStrat === "descending" ? "ascending" : "descending"
    });
  };

  _sort = data => {
    const { strategy, sortingCategory } = this.state;
    if (sortingCategory === options[0].value) {
      return strategy === "ascending"
        ? data.sort((a, b) =>
            a.username < b.username ? -1 : a.username > b.username ? 1 : 0
          )
        : data.sort(
            (a, b) =>
              -(a.username < b.username ? -1 : a.username > b.username ? 1 : 0)
          );
    } else if (sortingCategory === options[1].value) {
      return strategy === "ascending"
        ? data.sort((a, b) =>
            a.email < b.email ? -1 : a.email > b.email ? 1 : 0
          )
        : data.sort(
            (a, b) => -(a.email < b.email ? -1 : a.email > b.email ? 1 : 0)
          );
    } else if (sortingCategory === options[2].value) {
      return strategy === "ascending"
        ? data.sort((a, b) => (a.age < b.age ? -1 : a.age > b.age ? 1 : 0))
        : data.sort((a, b) => -(a.age < b.age ? -1 : a.age > b.age ? 1 : 0));
    } else {
      return data;
    }
  };

  render() {
    const {
      category,
      text,
      currentlyShownElements,
      sortingCategory,
      strategy
    } = this.state;
    const displayData = this._sort(currentlyShownElements);
    return (
      <React.Fragment>
        <SearchBar
          category={category}
          text={text}
          onTextChange={this._onTextChange}
          onCategoryChange={this._onCategoryChange}
        />
        <Table
          onCategorySelect={this._onSortingCategorySelect}
          onStrategyChange={this._onSortingStrategyChange}
          strategy={strategy}
          selected={sortingCategory}
          data={displayData}
        />
      </React.Fragment>
    );
  }
}

export default SearchableTable;
