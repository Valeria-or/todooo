const initialState = {
    notebooks: [{}]
    };
    
    const NotebooksReducer = (state = initialState, action: any) => {
      const { type, payload } = action;
    
      switch (type) {
        case "NOTEBOOKS":
          return { ...state, notebooks: payload.notebooks};
          case 'FINDNOTEBOOK': 
          return { ...state, notebooks: state.notebooks.filter((el)=> el.title.includes(payload.word))}
        default:
          return state;
          case 'DELETE':
            return {...state, notebooks: state.notebooks.filter((e) => e.id !== payload)}
      }
    };
    
    export default NotebooksReducer;