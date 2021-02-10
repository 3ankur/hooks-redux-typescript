
import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import useLoadFoodData from "../hook/useLoadFoodData";
import { ACTIONS } from "../redux/actions/constant";
import { AppState } from "../redux/reducers/rootReducer";
import { selectorMenu, selectorPayment } from "../redux/selector";
import { MenuItemType } from "../redux/reducers/foodReducer"
// interface itemQty  {
//     quantity: number
// }
type cartItemType = {
    [key: string]: unknown;
}

function FoodAppContainer() {

    const apiLoadState = useLoadFoodData();
    const diet = useSelector((state: AppState) => state.food.diet)
    const menuList:Array<MenuItemType> = useSelector(selectorMenu, shallowEqual);
    const cartList: any = useSelector((state: AppState) => state.food.cartByIds)
    const totolPayable  = useSelector(selectorPayment);
    const dispatch = useDispatch();

    function handleVegToggle() {
        dispatch({
            type: ACTIONS.CHANGE_DIET
        })
    }

    function addItemToCartHandler(itemId: string) {
        dispatch({
            type: ACTIONS.ADD_TO_CART,
            payload: itemId
        })
    }

    function removeItemFromCartHandler(itemId: string) {
        dispatch({
            type: ACTIONS.REMOVE_FROM_CART,
            payload: itemId
        })
    }


    // useEffect(()=>{

    // },[menuList])

    switch (apiLoadState) {

        case 'error':
            return <p>Api Failed to load data</p>
        case 'success':
            return (
                <>
                    <div className="food-app" data-testid="foodapp">
                        <header>
                            <h2>Food Order</h2>
                            <label>
                                <span>{diet}</span> <input type="checkbox" role="checkbox" name="type-checkbox" value={diet} onChange={handleVegToggle} />
                            </label>
                        </header>
                    </div>
                    <div>
                        {
                            menuList.map(({ label, id, description }) => {
                                return (
                                    <div key={id} title={label}>
                                        <h5 >{label}</h5>
                                        <p>{description}</p>
                                        {
                                            cartList[id] && cartList[id]['quantity'] ? (
                                                <div>
                                                    <button role="decQty" onClick={()=>removeItemFromCartHandler(id)}>-</button><span>{cartList[id]['quantity']} </span><button role="IncQty" onClick={() => addItemToCartHandler(id)}>+</button>
                                                </div>
                                            ) : <button role="addItemToCart" onClick={() => addItemToCartHandler(id)}><span>Add</span></button>
                                        }
                                    </div>
                                )
                            })
                        }
                        <div role="totalpay" >
                            <span data-testid="totalpay">Total ${totolPayable}</span>
                        </div>
                    </div>
                </>
            )
        default:
            return <h3>Loading...</h3>

    }


}
export default FoodAppContainer;