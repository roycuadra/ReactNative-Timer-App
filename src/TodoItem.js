import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TodoItem({ todo, onDelete }) {
  return (
    <View>
      <Text>{todo}</Text>
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
}
