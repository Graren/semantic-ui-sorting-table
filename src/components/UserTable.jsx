import React from "react";
import { Label, Table, Icon } from "semantic-ui-react";
import options from "../data/options";

const SortingIcon = props => {
  const { strategy, onStrategyChange } = props;
  return strategy === "ascending" ? (
    <Icon onClick={onStrategyChange} name="angle up" />
  ) : (
    <Icon onClick={onStrategyChange} name="angle down" />
  );
};

const UserTable = props => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell
          onClick={() => props.onCategorySelect(options[0].value)}
        >
          {props.selected === options[0].value && (
            <Label ribbon>Selected</Label>
          )}
          Username
          {props.selected === options[0].value ? (
            <SortingIcon
              strategy={props.strategy}
              onStrategyChange={props.onStrategyChange}
            />
          ) : null}
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => props.onCategorySelect(options[1].value)}
        >
          {props.selected === options[1].value && (
            <Label ribbon>Selected</Label>
          )}
          Mail
          {props.selected === options[1].value ? (
            <SortingIcon
              strategy={props.strategy}
              onStrategyChange={props.onStrategyChange}
            />
          ) : null}
        </Table.HeaderCell>
        <Table.HeaderCell
          onClick={() => props.onCategorySelect(options[2].value)}
        >
          {props.selected === options[2].value && (
            <Label ribbon>Selected</Label>
          )}
          Age
          {props.selected === options[2].value ? (
            <SortingIcon
              strategy={props.strategy}
              onStrategyChange={props.onStrategyChange}
            />
          ) : null}
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.data &&
        props.data.map(user => {
          return (
            <Table.Row key={user.email}>
              <Table.Cell>{user.username}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.age}</Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  </Table>
);

export default UserTable;
