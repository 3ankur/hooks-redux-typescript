import { MenuItemType } from "../reducers/foodReducer";
import { AppState } from "../reducers/rootReducer";
import { selectorMenu, selectorPayment } from "./"

const mockState = {
    food: {
        diet: 'all',
        menuById: {
            SN: {
                id: 'SN',
                label: 'Schezwan Noodles',
                diet: 'veg',
                description: 'Spicy Noodles soaked in Schezwan sauce and topped with exotic herbs',
                price: 8
            },
            SM: {
                id: 'SM',
                label: 'Sausage McMuffin',
                description: 'Lightly seasoned sausage patty and cheese slice on a hot toasted English muffin.',
                price: 12
            },

        },
        menuIdList: {
            all: [
                'SN',
                'SM',
            ],
            veg: [
                'SN',
            ]
        },
        cartByIds: {}
    }
};

describe('food selector test', () => {

  test('should load menu list correctly',()=>{
    const expectedState: Array<MenuItemType> = [
        {
            "description": "Spicy Noodles soaked in Schezwan sauce and topped with exotic herbs",
            "diet": "veg",
            "id": "SN",
            "label": "Schezwan Noodles",
            "price": 8,
        }
        ,
        {
            "description": "Lightly seasoned sausage patty and cheese slice on a hot toasted English muffin.",
            "id": "SM",
            "label": "Sausage McMuffin",
            "price": 12,
        },
    ];
    expect(selectorMenu(mockState)).toMatchObject(expectedState);
  });

  test('Should calculate totalpay correctly',()=>{
    const updateState : AppState  = {
        food: {
            ...mockState.food,
         cartByIds: {
              SN: {
                quantity: 3
              }
            }

        }
        
    }
    console.log(updateState)
    expect(selectorPayment(updateState)).toBe(24)
  })

})