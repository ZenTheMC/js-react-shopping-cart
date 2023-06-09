import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "../components/product";
import "@testing-library/jest-dom";

test("renders product information", () => {
    const mockProduct = {
        id: 1,
        image: "https://example.com/image.jpg",
        name: "Test Product",
        description: "This is a test product",
        price: 19.99
    };

    render(<Product product={mockProduct} onAddToCart={() => {}} />);

    expect(screen.getByAltText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
});

test("calls onAddToCart when add to cart button is clicked", () => {
    const mockProduct = {
        id: 1,
        image: "https://example.com/image.jpg",
        name: "Test Product",
        description: "This is a test product",
        price: 19.99
    };

    const mockOnAddToCart = jest.fn();

    render(<Product product={mockProduct} onAddToCart={mockOnAddToCart} />);

    userEvent.click(screen.getByText(/add to cart/i));

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct.id);
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
});