const initialState = {
    todos: []
};
    
const TodosReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    
    switch (type) {
        case "ALLTODOS":
         return { ...state, todos: payload };
        case 'FINDTODO': 
          return { ...state, todos: state.todos.filter((el)=> el.text.includes(payload.word))}
        default:
          return state;
    }
}
    
export default TodosReducer;