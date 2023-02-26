export const initialState = {
    basket :[],
    totalPrice : 0
};

const reducer = (state , action) =>{
      switch(action.type){
        case 'ADD_TO_BASKET' : {
            return {
                ...state,
                basket : [...state.basket ,action.item] ,
                totalPrice : +state.totalPrice + (+action.item.price)
            }
        }

        case 'EMPTY_BASKET' : {
            return {
                ...state,
                basket : []
            }
        };

        case 'REMOVE_FROM_BASKET' :{
            let newObjects = [...state.basket];
            const index = newObjects.findIndex((obj)=>(obj.id===action.id));
            if(index >= 0){
                newObjects.splice(index,1);
            }else{
                console.warn(`Cannot remove item with id ${action.id} as it's already not in the cart!!`);
            }
            return {
               ...state, 
               basket : newObjects,
               totalPrice : +state.totalPrice-(+action.price)
            }
        }

        case 'SET_USER':{
            return {
                ...state,
                user : action.user
            }
        }
        default : return state;
      }
};

export default reducer;