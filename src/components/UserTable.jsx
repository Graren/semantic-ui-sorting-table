import React from "react";
import { Label, Table, Icon } from "semantic-ui-react";
import options from "../data/options";

const SortingIcon = props => {
  const { strategy, onStrategyChange } = props;
  const anglePosition = strategy === "ascending" ? "up" : "down";
  return <Icon onClick={onStrategyChange} name={`angle ${anglePosition}`} />;
};

const UserTable = props => {
  const [username, mail, age] = options;
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            onClick={() => props.onCategorySelect(username.value)}
          >
            {props.selected === username.value && (
              <Label ribbon>Selected</Label>
            )}
            Username
            {props.selected === username.value ? (
              <SortingIcon
                strategy={props.strategy}
                onStrategyChange={props.onStrategyChange}
              />
            ) : null}
          </Table.HeaderCell>
          <Table.HeaderCell onClick={() => props.onCategorySelect(mail.value)}>
            {props.selected === mail.value && <Label ribbon>Selected</Label>}
            Mail
            {props.selected === mail.value ? (
              <SortingIcon
                strategy={props.strategy}
                onStrategyChange={props.onStrategyChange}
              />
            ) : null}
          </Table.HeaderCell>
          <Table.HeaderCell onClick={() => props.onCategorySelect(age.value)}>
            {props.selected === age.value && <Label ribbon>Selected</Label>}
            Age
            {props.selected === age.value ? (
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
};

export default UserTable;
