import { fireEvent, render, screen } from "@testing-library/react";
import Cart from "../components/cart";
import "@testing-library/jest-dom";
import Product from "../components/product";

test("displays all items in the cart", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 29.99 },
        { id: 3, name: "Product 3", price: 39.99 },
    ];

    render(<Cart cartItems={mockCartItems} />);

    mockCartItems.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
    });
});

test("displays the correct total price of all items in the cart", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 29.99 },
        { id: 3, name: "Product 3", price: 39.99 },
    ];

    render(<Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />);

    const totalPrice = mockCartItems.reduce((total, item) => total + item.price, 0);

    expect(screen.getByText(`Total: $${totalPrice}`)).toBeInTheDocument();
});

test("removes an item from the cart when the remove button is clicked", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99},
    ];

    const mockRemoveFromCart = jest.fn();

    render(<Cart cartItems={mockCartItems} onRemoveFromCart={mockRemoveFromCart} />);

    fireEvent.click(screen.getByText(/remove/i));

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
});