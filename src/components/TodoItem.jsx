import { List, Checkbox, Button } from 'antd';

export default function TodoItem({ item, index, onToggle, onDelete }) {
  return (
    <List.Item
      actions={[
        <Button danger onClick={() => onDelete(index)}>X</Button>,
      ]}
    >
      <Checkbox checked={item.done} onChange={() => onToggle(index)}>
        {item.text}
      </Checkbox>
    </List.Item>
  );
}