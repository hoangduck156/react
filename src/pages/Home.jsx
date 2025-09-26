import { Input, Button, Typography, List, message } from 'antd';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import TodoItem from '../components/TodoItem';
import '../App.css';

export default function Home() {
  const { user } = useAuth();
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const storageKey = `todos_${user.email}`;

  // Load danh sách todo từ localStorage khi vào trang
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem(storageKey)) || [];
    setTodos(savedTodos);
  }, [storageKey]);

  // Thêm công việc mới
  const addTodo = () => {
    if (!task.trim()) {
      message.warning('Vui lòng nhập nội dung công việc');
      return;
    }
    const newTodos = [...todos, { text: task, done: false }];
    setTodos(newTodos);
    localStorage.setItem(storageKey, JSON.stringify(newTodos));
    setTask('');
  };

  // Đánh dấu hoàn thành
  const toggleTodo = (index) => {
    const updated = [...todos];
    updated[index].done = !updated[index].done;
    setTodos(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  // Xóa công việc
  const deleteTodo = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  return (
    <div>
      <Typography.Title level={3}>Your To Do</Typography.Title>

      <div className="todo-input">
        <Input
          placeholder="Add new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onPressEnter={addTodo}
          addonAfter={<Button type="primary" onClick={addTodo}>+</Button>}
        />
      </div>

      <List
        dataSource={todos}
        renderItem={(item, index) => (
          <TodoItem
            item={item}
            index={index}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        )}
      />

      <Typography.Text>
        Your remaining todos: {todos.filter((t) => !t.done).length}
      </Typography.Text>

      <div className="quote">
        <Typography.Paragraph italic>
          "Doing what you love is the cornerstone of having abundance in your life." – Wayne Dyer
        </Typography.Paragraph>
      </div>
    </div>
  );
}