import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { Button, CheckBox, ListItem, Overlay } from 'react-native-elements';

export default function TodoListScreen() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { title: newTodo, done: false }]);
    setNewTodo('');
  };

  const removeTodo = (index) => {
    setEditIndex(null);
    setTodos(todos.filter((_, idx) => idx !== index));
  };

  const toggleTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const openEditOverlay = (index) => {
    setEditIndex(index);
    setEditTodo(todos[index].title);
    setIsEditing(true);
  };

  const closeEditOverlay = () => {
    setIsEditing(false);
    setEditTodo('');
    setEditIndex(null);
  };

  const updateTodo = () => {
    if (editTodo.trim() === '') return;
    const updatedTodos = [...todos];
    updatedTodos[editIndex].title = editTodo;
    setTodos(updatedTodos);
    closeEditOverlay();
  };

  const openDeleteConfirmation = (index) => {
    setEditIndex(index);
    setDeleteConfirmationVisible(true);
  };

  const closeDeleteConfirmation = () => {
    setEditIndex(null);
    setDeleteConfirmationVisible(false);
  };

  const deleteTodo = () => {
    setTodos(todos.filter((_, idx) => idx !== editIndex));
    closeDeleteConfirmation();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Enter a new todo..."
          value={newTodo}
          onChangeText={(text) => setNewTodo(text)}
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
        />
        <Button title="Add" onPress={addTodo} buttonStyle={{ marginTop: 10 }} />
      </View>
      <FlatList
  data={todos}
  renderItem={({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <CheckBox
        checked={item.done}
        onPress={() => toggleTodo(index)}
        checkedColor="#2089dc"
      />
      <Text style={{ marginLeft: 10, textDecorationLine: item.done ? 'line-through' : 'none' }}>
        {item.title}
      </Text>
      <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
        <Button
          title="Edit"
          onPress={() => openEditOverlay(index)}
          buttonStyle={{ backgroundColor: '#2089dc', borderRadius: 5 }}
          containerStyle={{ marginRight: 10 }}
        />
        <Button
          title="Delete"
          onPress={() => openDeleteConfirmation(index)}
          buttonStyle={{ backgroundColor: 'red', borderRadius: 5 }}
          containerStyle={{ marginRight: 10 }}
        />
      </View>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
  extraData={todos}
/>



      {/* Edit Overlay */}
      <Overlay isVisible={isEditing} onBackdropPress={closeEditOverlay}>
<View style={{ padding: 20 }}>
<TextInput
placeholder="Edit todo..."
value={editTodo}
onChangeText={(text) => setEditTodo(text)}
style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 }}
/>
<Button title="Update" onPress={updateTodo} buttonStyle={{ marginTop: 10 }} />
</View>
</Overlay>
  {/* Delete Confirmation Overlay */}
  <Overlay
    isVisible={isDeleteConfirmationVisible}
    onBackdropPress={closeDeleteConfirmation}
  >
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Are you sure you want to delete this todo?</Text>
      <Button
        title="Delete"
        onPress={deleteTodo}
        buttonStyle={{ backgroundColor: 'red', borderRadius: 5 }}
      />
      <Button
        title="Cancel"
        onPress={closeDeleteConfirmation}
        buttonStyle={{ marginTop: 10 }}
      />
    </View>
  </Overlay>
</View>
);
}
