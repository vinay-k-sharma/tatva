export const ADD = (item) => {
    return {
        
        type: "ADD_TO_CART",
        payload:item
    }
}

export const DELETE = (id) => {
    return{
        type:"REMOVE_FROM_CART",
        payload:id
    }
}
export const REMOVE_ONE = (product) => {
    return {
        type:"REMOVE_ONE_PRODUCT",
        payload:product
    }
}
export const emptyCart = () => {
    return {
        type:"EMPTY_CART"
    }
}