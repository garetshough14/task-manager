import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, CheckBox, ScrollView } from 'react-native';

export default function App() {
  const [items, setItems] = useState([
    {todo: 'test item'},
    {todo: 'test item'},
  ]);

  // array setting and adding a new item
  const [newItemText, setNewItemText] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const displayDialog = () =>{
    <View >
      <Text> Are you sure you would like to delete this task?</Text>
        <Button 
          title= 'yes'
          onPress={() =>deleteFromList(index) }
        />
        <Button 
          title= 'No'
          onPress= {() =>setShowDialog(false)}
        />
    </View>
    
  }

  // deletes the chosen item from the array/printed list
  const deleteFromList = (task) => {
    setItems(items.filter((value, index) => index != task));
  }

  // checks to see if the input given is legal to use in the scope of this app
  const validityCheck = () =>{
    if (newItemText.length > 0 ){
      console.log('task submitted')
      Alert.alert("Task Submitted")
      console.log('validity Check: ' + newItemText)
      arrayAdder()
    }
    else{
      console.log('task invalid')
      Alert.alert('Invalid Input')
    }
  };

  // this is the function that adds the new input at the end of the array
  const arrayAdder = () =>{
      console.log({todo: newItemText});
      console.log([...items, {todo: newItemText}]);
      setItems([...items, {todo: newItemText}]);
      setNewItemText("");
      <Text>{newItemText}</Text>
      
  }

  const openDialog = (item) =>{
    setShowDialog(true)
    setDialogMessage(item)
  }

  // this functions generates a new array with the new input
  const generateList = items.map((item, index) => (             // item and index  are coming from the map function check documentation
    <View key={index} style={styles.listItemContainer}>

      {/* FINAL LIST TEXT */}
       <Text style={styles.finalText}>
        {item.todo}                                             {/* the word "todo" is getting called from line 40 */}
        <View style={styles.decisonButtons}>
      
        {/* DELETE BUTTON */}                                               
        <Button style={styles.deleteButtonStyle}
          title='Delete'
          color='red'
          // OnValueChange, changes the state to true at the given index
          // onPress={() => openDialog(item)}
          onPress= {() => deleteFromList(index)}
         ></Button>

         {/* DONE BUTTON */}
        <Button style={styles.doneButtonStyle}
          title= 'Done'
          color= 'green'
         ></Button>
        </View>
      </Text>         
    </View>
  )
);

  return (
    <View style={styles.container}>
      {/* this displays the current header which is "To-Do List" */}
          <Text style={styles.header}>To-Do List</Text>
            <TextInput
              style={styles.userInput}
              onChangeText={text => setNewItemText(text)} // the first iteration of text is simply defining the variable, onChange(Text) is a function letting you store the TextInput in text This also changes every time you change the text bbecauase it is related to the state
              placeholder='Enter Your Task Here' 
              autoFocus={true}
              value={newItemText}
            />
      <View style={styles.buttonContainer}>
          <Button
            style={styles.submitButton}
            color= 'green'
            title="Submit Task"
            //checks if input is valid and if true generates 
            onPress= {() => validityCheck()}
            
          />
          <View style={styles.spacing}></View>
          <Button
            style={styles.clearButton}
            color= 'red'
            title="clear Task"
            onPress= {()=> setNewItemText("")}                          
          />
        </View>
        <StatusBar style="auto" />
            {/* calls the function that generates a new item on the page */}
            <View style={styles.myScroll}>
              <ScrollView>
                {generateList}
              </ScrollView>
            </View>
            {showDialog && displayDialog()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1e29f',
    display: 'flex', 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  userInput:{
    marginTop: '20px',
    marginBottom: '10px',
    width: '300px',
    height: '50px',
    backgroundColor: '#ebeaea',
    color: 'black',
    placeholderTextColor: 'grey',
    textAlign: 'center',
    borderRadius: '20px',
    borderColor: 'black',
    borderBottomWidth: '3px'
  },
  submitButton:{
    
  },
  clearButton: {
    
  },
  buttonContainer:{ 
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '15px',
    justifyContent: "space-evenly"
  },
  header: {
    fontSize: '40px',
    backgroundColor: '#ebeaea',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderBottomWidth: '3px'
  },
  listItemContainer: {
    display: 'flex',
    backgroundColor: '#ebeaea',
    width: '95%',
    borderBottomWidth: '3px',
    borderBottomColor: 'black',
    paddingLeft: '15px',
    borderRadius: '12px',
    marginBottom: '6px'
  },
  finalText: {
    flex: 1,
    fontSize: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  decisonButtons: {
    flexDirection: 'row',
  },
  spacing: {
    width: "10px",
  },
  myScroll:{
    height: '500px',
    flexGrow: 1,
  }
});

// Make text box with a submit task and clear task button**********
// if you click "submit task" check to see if the submission is a string or empty, if empty alert "not valid"
// if you click clear on a  already made task remove the task from the shown list
// if the input is a success alert "task submitted"

//