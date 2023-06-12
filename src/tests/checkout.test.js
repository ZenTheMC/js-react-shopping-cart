import { fireEvent, render, screen } from "@testing-library/react";
import Checkout from "../pages/checkout";
import "@testing-library/jest-dom";

test("renders correctly", () => {
    const mockSetCartItems = jest.fn();

    render(<Checkout setCartItems={mockSetCartItems} />);

    expect(screen.getByText("Checkout")).toBeInTheDocument();
    expect(screen.getByText("Confirm Order")).toBeInTheDocument();
});

test("calls setCartItems with an empty array when Confirm Order button is clicked", () => {
    const mockSetCartItems = jest.fn();

    render(<Checkout setCartItems={mockSetCartItems} />);

    fireEvent.click(screen.getByText("Confirm Order"));

    expect(mockSetCartItems).toHaveBeenCalledWith([]);
});

test("displays a thank you message when Confirm Order button is clicked", () => {
    const mockSetCartItems = jest.fn();

    render(<Checkout setCartItems={mockSetCartItems} />);

    fireEvent.click(screen.getByText(/Confirm Order/i));

    expect(screen.getByText(/thank you for your order/i)).toBeInTheDocument();
});