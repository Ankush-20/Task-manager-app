export const ACTIONS = {
  ADD_TASK: 'ADD_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  TOGGLE_COMPLETE: 'TOGGLE_COMPLETE',
  REORDER_TASKS: 'REORDER_TASKS',
};

export const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...state, {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        completed: false
      }];

    case ACTIONS.UPDATE_TASK:
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, ...action.payload }
          : task
      );

    case ACTIONS.DELETE_TASK:
      return state.filter(task => task.id !== action.payload.id);

    case ACTIONS.TOGGLE_COMPLETE:
      return state.map(task =>
        task.id === action.payload.id
          ? { ...task, completed: !task.completed }
          : task
      );

    case ACTIONS.REORDER_TASKS:
      const { sourceIndex, destinationIndex } = action.payload;
      const reorderedTasks = [...state];
      const [removed] = reorderedTasks.splice(sourceIndex, 1);
      reorderedTasks.splice(destinationIndex, 0, removed);
      return reorderedTasks;

    default:
      return state;
  }
};
