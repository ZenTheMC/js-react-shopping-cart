import { fireEvent, render, screen } from "@testing-library/react";
import Cart from "../components/cart";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

test("displays all unique items in the cart", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 29.99 },
        { id: 3, name: "Product 3", price: 39.99 },
    ];

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />
        </MemoryRouter>
    );

    mockCartItems.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
    });
});

test("displays the correct total price of all items in the cart", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99, quantity: 1 },
        { id: 2, name: "Product 2", price: 29.99, quantity: 1 },
        { id: 3, name: "Product 3", price: 39.99, quantity: 1 },
    ];

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />
        </MemoryRouter>
    );

    const totalPrice = mockCartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    expect(screen.getByText(`Total: $${totalPrice.toFixed(2)}`)).toBeInTheDocument();
});

test("removes an item from the cart when the remove button is clicked", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99},
    ];

    const mockRemoveFromCart = jest.fn();

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={mockRemoveFromCart} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/remove/i));

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
});

test("renders an input field for each unique item in the cart", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 29.99 },
        { id: 3, name: "Product 3", price: 39.99 },
    ];

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />
        </MemoryRouter>
    );

    mockCartItems.forEach(item => {
        const quantityInput = screen.getByTestId(`quantity-${item.id}`);
        expect(quantityInput).toBeInTheDocument();
    });
});

test("initial value of each input field is the quantity of that item in the cart", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
        { id: 2, name: "Product 2", price: 29.99, quantity: 3 },
        { id: 3, name: "Product 3", price: 39.99, quantity: 1 },
    ];

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />
        </MemoryRouter>
    );

    mockCartItems.forEach(item => {
        const quantityInput = screen.getByTestId(`quantity-${item.id}`);
        expect(quantityInput.value).toBe(item.quantity.toString());
    });
});

test("when the value of an input field changes, the total price is updated accordingly", async () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99, quantity: 1 },
    ];
      
    const mockSetCartItems = jest.fn();
    
    render(
        <Router>
          <Cart cartItems={mockCartItems} setCartItems={mockSetCartItems} />
        </Router>
    );

    const quantityInput = screen.getByTestId(`quantity-${mockCartItems[0].id}`);
    fireEvent.change(quantityInput, { target: { value: '2' } });

    const totalPrice = mockCartItems[0].price * 2;
    const totalPriceElement = await screen.findByText(`Total: $${totalPrice.toFixed(2)}`);
    expect(totalPriceElement).toBeInTheDocument();
});

test("when an item is removed from the cart, its quantity is not reset", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99, quantity: 2 },
    ];

    const mockRemoveFromCart = jest.fn();

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={mockRemoveFromCart} />
        </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/remove/i));

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
});

test("total price is rounded to two decimal places", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 66.65, quantity: 1 },
        { id: 2, name: "Product 2", price: 66.65, quantity: 1 },
    ];

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />
        </MemoryRouter>
    );

    const totalPrice = mockCartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    expect(screen.getByText(`Total: $${totalPrice}`)).toBeInTheDocument();
});