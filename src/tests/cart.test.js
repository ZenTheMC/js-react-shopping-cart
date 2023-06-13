import { fireEvent, render, screen } from "@testing-library/react";
import Cart from "../components/cart";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

test("displays all items in the cart", () => {
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
        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 29.99 },
        { id: 3, name: "Product 3", price: 39.99 },
    ];

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />
        </MemoryRouter>
    );

    const totalPrice = mockCartItems.reduce((total, item) => total + item.price, 0);

    expect(screen.getByText(`Total: $${totalPrice}`)).toBeInTheDocument();
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

test("renders an input field for each item in the cart", () => {
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

test("initial value of each input field is 1", () => {
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
        expect(quantityInput.value).toBe('1');
    });
});

test("when the value of an input field changes, the total price is updated accordingly", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99 },
    ];

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />
        </MemoryRouter>
    );

    const quantityInput = screen.getByTestId(`quantity-${mockCartItems[0].id}`);
    fireEvent.change(quantityInput, { target: { value: '2' } });

    const totalPrice = mockCartItems[0].price * 2;
    expect(screen.getByText(`Total: $${totalPrice}`)).toBeInTheDocument();
});

test("when an item is removed from the cart, its quantity is reset to 1", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 19.99},
    ];

    const mockRemoveFromCart = jest.fn();

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={mockRemoveFromCart} />
        </MemoryRouter>
    );

    const quantityInput = screen.getByTestId(`quantity-${mockCartItems[0].id}`);
    fireEvent.change(quantityInput, { target: { value: '2' } });

    fireEvent.click(screen.getByText(/remove/i));

    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
    expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);

    expect(quantityInput.value).toBe('1');
});

test("total price is rounded to two decimal places", () => {
    const mockCartItems = [
        { id: 1, name: "Product 1", price: 66.65 },
        { id: 2, name: "Product 2", price: 66.65 },
    ];

    render(
        <MemoryRouter>
            <Cart cartItems={mockCartItems} onRemoveFromCart={() => {}} />
        </MemoryRouter>
    );

    const totalPrice = parseFloat(mockCartItems.reduce((total, item) => total + item.price, 0).toFixed(2));

    expect(screen.getByText(`Total: $${totalPrice}`)).toBeInTheDocument();
});