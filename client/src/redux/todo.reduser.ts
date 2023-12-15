const initialState = {
    todos: []
};
    
const TodosReducer = (state = initialState, action: any) => {
    const { type, payload } = action;
    
    switch (type) {
        case "ALLTODOS":
         return { ...state, todos: payload };
        default:
          return state;
    }
}
    
export default TodosReducer;