import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import edit from "./assets/editIcon.svg"
import delet from "./assets/recycleIcon.svg"
import "./index.scss"
import ModalAction from "./components/ModalAction/ModalAction";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoItem, setTodoItem] = useState('');
  const [editTodo, setEditTodo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState('');
  const [taskIdModal, setTaskIdModal] = useState(null);
  const [taskDescribe, setTaskDescribe] = useState('');

  function captureInputText(task) {
    setTodoItem(task.target.value);
  }

  const captureFormSubmit = (task) => {
    task.preventDefault();
    if (!editTodo) {
      if (todoItem !== "") {
        setTodoList([
          ...todoList,
          {
            id: todoList.length + 1,
            text: todoItem.trim(),
            completed: false,
          }
        ]);
      }
      setTodoItem("");
    } else {
      updateTodo(todoItem, editTodo.id, editTodo.completed)
    }
  }

  const updateTodo = (text, id, completed) => {
    setTypeModal('editar')
    const newTodo = todoList.map((todo) =>
      todo.id === id ? { text, id, completed } : todo
    )
    setTodoList(newTodo);
    setEditTodo("");
  }

  useEffect(() => {

    if (editTodo) {
      setTodoItem(editTodo.text);
    } else {
      setTodoItem("")
    }
  }, [setTodoItem, editTodo])

  const completeTodo = (id) => {
    setTodoList((prevTodos) =>
      prevTodos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTodoFunction = (id) => {
    const findTodo = todoList.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  }

  function deleteTodoFunction(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id))
    setTypeModal('excluir')
    setModalVisible(true)
  }

  function openModal(typeOpenModal, taskId){
    const findTodo = todoList.find((todo) => todo.id === taskId);
    setTaskDescribe(findTodo)

    if (typeOpenModal === 'edit'){
      setTypeModal('editar')
      setModalVisible(true)
      setTaskIdModal(taskId)
    }
    else if (typeOpenModal === 'delete'){
      setTypeModal('excluir')
      setModalVisible(true)
      setTaskIdModal(taskId)

    }
  }

  function positiveReturnModal(){
    if (typeModal === 'editar'){
      editTodoFunction(taskIdModal)
      setModalVisible(false)
    } else if (typeModal === 'excluir'){
      deleteTodoFunction(taskIdModal)
      setModalVisible(false)
    }
  }


  function RenderModal () {

    return (
      
      <ModalAction>
        <h2>Deseja {typeModal} esse item?</h2>
        <ul>
          <li><span><strong>Task: </strong>{taskDescribe.id}</span></li>
          <li><span><strong>Describe:</strong> {taskDescribe.text}</span></li>
          <li><span><strong>Status: </strong>{taskDescribe.completed ? 'Completed' : 'Pending'}</span></li>
        </ul>
        <button id="noButton" onClick={() => setModalVisible(false)}>Não</button>
        <button id="yesButton" onClick={() => positiveReturnModal()}>Sim</button>
      </ModalAction>
    )
  }

  return (
    <section className="App" >
      <Header />
      <h1>Otimize seu tempo e se organize com o nosso Planejador Diário.</h1>
      <h2>Você possui {todoList.length} tasks adicionadas.</h2>
      <table>
        <thead >
          <tr className="title-header">
            <th>Tarefa</th>
            <th>Status</th>
            <th>Opções</th>
          </tr>
        </thead>

        {todoList.map((task) => (
          <tbody key={task.id}>
            <tr>
              <td className={`list ${task.completed ? "complete" : "" }`}>ID: {task.id} - Task: {task.text}</td>
              <td className="img-complete">{<input type="checkbox" onClick={() => completeTodo(task.id)}></input>}</td>
              <td>
                {<img src={edit} onClick={() => openModal('edit',task.id)}></img>}
                {<img src={delet} onClick={() => openModal('delete', task.id)}></img>}
              </td>
            </tr> 
          </tbody>
        ))}

      </table>

      <form onSubmit={captureFormSubmit}>
        <input type="text" name="todo" placeholder="Nova tarefa..." value={todoItem} onChange={captureInputText} />
        <button type="submit">+</button>
      </form>
          <h3>Autor: Douglas Dantas de Souza</h3>
      {modalVisible && RenderModal()}

    </section>
  );
}

export default App;
