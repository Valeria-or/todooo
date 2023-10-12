const initialState = {
    notebooks: [{}]
    };
    
    const NotebooksReducer = (state = initialState, action: any) => {
      const { type, payload } = action;
    
      switch (type) {
        case "NOTEBOOKS":
          return { ...state, notebooks: payload.notebooks };
        default:
          return state;
      }
    };
    
    export default NotebooksReducer;