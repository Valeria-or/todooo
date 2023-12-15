const initialState = {
    notebooks: [{}]
    };
    
    const NotebooksReducer = (state = initialState, action: any) => {
      const { type, payload } = action;
    
      switch (type) {
        case "NOTEBOOKS":
          return { ...state, notebooks: payload.notebooks };
        // case "FINDNOTEBOOKS":
        //    return { ...state, notebooks: payload.notebooks };
        default:
          return state;
          case 'DELETE':
            return {...state, notebooks: state.notebooks.filter((e) => e.id !== payload)}
      }
    };
    
    export default NotebooksReducer;