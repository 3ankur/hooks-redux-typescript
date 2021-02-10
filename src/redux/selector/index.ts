import { AppState }  from "../reducers/rootReducer";
import { MenuItemType } from "../reducers/foodReducer";

export const selectorMenu = (state:AppState ) : Array<MenuItemType>=>{
    const {diet , menuIdList, menuById } = state.food;
    const menuIds = menuIdList[diet];
    const menuList :  Array<MenuItemType>  = [];
    menuIds.forEach((id:string)=>{
        menuList.push(menuById[id]);
    });

    return menuList
}

export const getKeyValue = <T extends object, U extends keyof T>(key: U) => (obj: T) => obj[key];

export const selectorPayment = (state: AppState) : Number =>{
    const {menuIdList,cartByIds, menuById} = state.food;
    let total = 0;
     const cartItemList = Object.keys(cartByIds);
     cartItemList.forEach((item:string)=>{
            const {price} = menuById[item];
            const {quantity} = cartByIds[item];
            total+=price * quantity;
     }) 
     return total;
}