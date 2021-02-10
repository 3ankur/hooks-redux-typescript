import { ACTIONS } from "../actions/constant";

export interface ObjectType {
    all: Array<Object>;
    veg: Array<Object>
  }

export type FoodState = {
    diet: string,
    menuById: Object,
    menuIdList:ObjectType | any
    cartByIds : IObjectKeys | any
    }

type ActionType = {
    readonly type: string,
     payload: any
}

export type MenuItemType = {
    id: string,
    label: string,
    diet?: string
    description: string,
    price: Number
}

export interface IObjectKeys {
    [key: string]: unknown;
  }

const initialState:FoodState = {
    diet:'all',
    menuById:{},
    menuIdList:{
        all:[],
        veg:[]
    },
    cartByIds:{}
}



function foodReducer(state=initialState,action:ActionType){

    switch(action.type){
        case ACTIONS.CHANGE_DIET:
            const {diet} = state;
            const newDiet = diet === 'veg' ? 'all' : 'veg';
            return{
                ...state,
                diet: newDiet
            }
            default:
                return state;
        case ACTIONS.LOAD_MENU:
            const {menu} = action.payload;
            const menuById : IObjectKeys | any = {};
            menu.forEach((item:MenuItemType)=>{
                menuById[item.id] = item;
            });
            const allMenuId = menu.map((item:MenuItemType)=>item.id);
            const vegMenuId = menu.filter((item:MenuItemType)=> item.diet ==='veg').map((f:MenuItemType)=>f.id)
            return{
                ...state,
                menuById,
                menuIdList:{
                    all: allMenuId,
                    veg: vegMenuId
                }
            }

        case ACTIONS.ADD_TO_CART:
            const {cartByIds} = state; 
            const itemId = action.payload;
            const newCart : any = cartByIds[itemId] || {
                quantity: 0
            }
            newCart.quantity += 1; 
            const updatedCart = {
                ...cartByIds,
                [itemId]: newCart
            }
            return {
                ...state,
                cartByIds: updatedCart
                
            }

            case ACTIONS.REMOVE_FROM_CART:
               {
                const {cartByIds} = state; 
                const itmId = action.payload;
                const foundCart : any = cartByIds[itmId] ;
            
                if(foundCart.quantity>0){
                    foundCart.quantity -= 1; 
                const updatedCart = {
                    ...cartByIds,
                    [itmId]: foundCart
                }
                return {
                    ...state,
                    cartByIds: updatedCart
                    
                }
                }
                return state;
               }

                


    }
}

export default foodReducer;