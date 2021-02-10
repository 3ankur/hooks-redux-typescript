import React from "react";
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import * as utills from "../utills";
import { renderApp } from "../App.test";

const foodData = [
  {
    id: 'SM',
    label: 'Sausage McMuffin',
    description: 'Description of McMuffin',
    price: 12,
  },
  {
    id: 'MP',
    label: 'Mushroom Pizza',
    diet: 'veg',
    description: 'Description of Pizza',
    price: 20,
  },
];
jest.mock('../utills', () => ({
  LoadFoodData: () => (Promise.resolve(foodData))
}));


afterAll(() => {
  jest.resetModules();
})


describe('FoodAppContainer', () => {

  test('should render list of foods', async () => {
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
    expect(screen.getByTestId('foodapp')).toBeDefined();
    expect(screen.getByRole('checkbox')).toBeDefined();
    foodData.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    })
  })

  test('should filter the veg item', async () => {
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i))
    //filter veg items
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByText('Sausage McMuffin')).toBe(null);
    expect(screen.getByText(/Mushroom Pizza/i)).toBeInTheDocument();

    //filter non veg items
    fireEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByText('/Mushroom Pizza/i')).toBe(null);
    expect(screen.getByText(/Sausage McMuffin/i)).toBeInTheDocument();
  });

  test('should item add to cart and remove from cart correctly', async () => {
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
    fireEvent.click(screen.getByRole('checkbox'));
    //adding to cart
    fireEvent.click(screen.getByRole('addItemToCart'));
    expect(screen.getByTestId('totalpay').textContent).toEqual('Total $20');
    // removing from cart
    fireEvent.click(screen.getByRole('decQty'));
    expect(screen.getByTestId('totalpay').textContent).toEqual('Total $0');
  });

});
