const INIT_STATE = {
    carts:[]
}

export const cartReducer = (state=INIT_STATE,action) => {
switch(action.type) {
    case "ADD_TO_CART":

    const itemIndex  = state.carts.findIndex((iteam)=> iteam.id===action.payload.id)
        console.log(itemIndex)
    if(itemIndex>=0){
        state.carts[itemIndex].quantity +=1
        state.carts[itemIndex].stock -=1
        return {
            ...state,
            carts:[...state.carts]
        }
    }
    else{
        const temp = {...action.payload,quantity:1}
        console.log(temp)
        console.log("logging")
        temp.stock -=1

        return {
            ...state,
            carts:[...state.carts,temp]
        }
    }

    case "REMOVE_FROM_CART":
        const data = state.carts.filter((element)=> element.id !==action.payload)
        return {
            ...state,
            carts:data
        }

        case "REMOVE_ONE_PRODUCT":
            const decrement_item = state.carts.findIndex((item) => item.id === action.payload.id)

            if(state.carts[decrement_item].quantity>=1){
                 state.carts[decrement_item].quantity -= 1
                 state.carts[decrement_item].stock+= 1
                return {
                    ...state,
                    carts:[...state.carts]
                }
            }
            else if(state.carts[decrement_item].quantity===1){
                const data = state.carts.filter((element) => element.id !== action.payload)
                return {
                    ...state,
                    carts:data
                }
            }

            case  "EMPTY_CART" :
                return {
                    ...state,
                    carts:[]
                }
    default : return state
}
}