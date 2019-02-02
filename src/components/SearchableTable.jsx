import React from "react";
import Table from "./UserTable";
import SearchBar from "./SearchBar";
import data from "../data/data.json";
import options from "../data/options";

class SearchableTable extends React.PureComponent {
  constructor(props) {
    super(props);
    const [username] = options;
    this.state = {
      currentlyShownElements: data,
      text: "",
      category: username.value,
      sortingCategory: username.value,
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
    const [username, mail, age] = options;
    if (!text || text === "") return data;
    else {
      switch (category) {
        case username.value:
          return data.filter(user => user.username.includes(text));
        case mail.value:
          return data.filter(user => user.email.includes(text));
        case age.value:
          return data.filter(user => `${user.age}` === `${text}`);
        default:
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
    const [username, mail, age] = options;
    const usernameSort = (a, b) =>
      a.username < b.username ? -1 : a.username > b.username ? 1 : 0;
    const emailSort = (a, b) =>
      a.email < b.email ? -1 : a.email > b.email ? 1 : 0;
    const ageSort = (a, b) => (a.age < b.age ? -1 : a.age > b.age ? 1 : 0);
    switch (sortingCategory) {
      case username.value:
        return strategy === "ascending"
          ? data.sort(usernameSort)
          : data.sort((a, b) => usernameSort(a, b) * -1);
      case mail.value:
        return strategy === "ascending"
          ? data.sort(emailSort)
          : data.sort((a, b) => emailSort(a, b) * -1);
      case age.value:
        return strategy === "ascending"
          ? data.sort(ageSort)
          : data.sort((a, b) => ageSort(a, b) * -1);
      default:
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
