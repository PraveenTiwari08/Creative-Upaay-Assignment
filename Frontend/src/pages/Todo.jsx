import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodos } from "../redux/store";
import TodoBox from "./TodoBox";

function Todo() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos);
  const filterStatus = useSelector((state) => state.filter.status); // Get selected filter from Redux
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [showInput, setShowInput] = useState(false);

  // Handle Drag & Drop
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceList = [...tasks[source.droppableId]];
    const destList = [...tasks[destination.droppableId]];

    const [movedTask] = sourceList.splice(source.index, 1);
    destList.splice(destination.index, 0, movedTask);

    dispatch(
      updateTodos({
        ...tasks,
        [source.droppableId]: sourceList,
        [destination.droppableId]: destList,
      })
    );
  };

  // Handle Adding a New Todo
  const handleAddTodo = () => {
    if (newTodo.title && newTodo.description) {
      dispatch(addTodo(newTodo));
      setNewTodo({ title: "", description: "" });
      setShowInput(false);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box
        display="flex"
        justifyContent="space-between"
        width={1190}
        ml={-50}
        mt="80px" // Navbar ki height ke barabar margin-top
        pb="20px" 
      >
        {["todo", "inProgress", "done"].map((listKey, index) => {
          let filteredTasks = [...tasks[listKey]];

          // If a filter is applied, bring matching todos to the top
          if (filterStatus !== "All") {
            filteredTasks.sort((a, b) => {
              if (filterStatus === "To Do" && listKey === "todo") return -1;
              if (filterStatus === "In Progress" && listKey === "inProgress")
                return -1;
              if (filterStatus === "Done" && listKey === "done") return -1;
              return 1;
            });
          }

          return (
            <Droppable droppableId={listKey} key={listKey}>
              {(provided) => (
                <Box
                  width={385}
                  bgcolor="#f5f5f5"
                  p={2}
                  borderRadius={3}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          bgcolor:
                            listKey === "todo"
                              ? "blue"
                              : listKey === "inProgress"
                              ? "orange"
                              : "green",
                        }}
                      />
                      <Typography fontWeight="font-medium">
                        {listKey === "todo"
                          ? "To Do"
                          : listKey === "inProgress"
                          ? "In Progress"
                          : "Done"}{" "}
                        ({filteredTasks.length})
                      </Typography>
                    </Box>

                    {listKey === "todo" && (
                      <IconButton
                        onClick={() => setShowInput(!showInput)}
                        sx={{
                          bgcolor: "blue",
                          color: "white",
                          borderRadius: 2,
                          "&:hover": { bgcolor: "darkblue" },
                        }}
                      >
                        <AddIcon fontSize="small" overflow="hidden" />
                      </IconButton>
                    )}
                  </Box>

                  <Divider
                    sx={{
                      bgcolor:
                        index === 0 ? "blue" : index === 1 ? "orange" : "green",
                      height: 2,
                      mb: 2,
                      mt: 2,
                    }}
                  />

                  {/* Input Field for Adding Todos */}
                  {listKey === "todo" && showInput && (
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Title"
                        size="small"
                        value={newTodo.title}
                        onChange={(e) =>
                          setNewTodo({ ...newTodo, title: e.target.value })
                        }
                      />
                      <TextField
                        fullWidth
                        label="Description"
                        size="small"
                        multiline
                        rows={2}
                        sx={{ mt: 1 }}
                        value={newTodo.description}
                        onChange={(e) =>
                          setNewTodo({
                            ...newTodo,
                            description: e.target.value,
                          })
                        }
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={handleAddTodo}
                      >
                        Add Todo
                      </Button>
                    </Box>
                  )}

                  {/* Display Sorted Todos */}
                  {filteredTasks.map((task, taskIndex) => (
                    <TodoBox key={task.id} task={task} index={taskIndex} />
                  ))}

                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          );
        })}
      </Box>
    </DragDropContext>
  );
}

export default Todo;
