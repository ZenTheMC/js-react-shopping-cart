/*
import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Product from "../components/product";
import "@testing-library/jest-dom";

// Broke after I started implementation process in products component, and in app component in products section
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

// Broke after I started implementation process in products component, and in app component in products section
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

    // click event wasn't working for this second test, because of conventiional userEvent, but worked with older fireEvent
    // userEvent.click(screen.getByText(/add to cart/i));
    fireEvent.click(screen.getByText(/add to cart/i));

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct.id);
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
});
*/

import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Product from "../components/product";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";

test("renders product information", () => {
    const mockProducts = [
        {
            id: 1,
            image: "https://example.com/image.jpg",
            name: "Test Product",
            description: "This is a test product",
            price: 19.99
        }
    ];

    render(
        <MemoryRouter initialEntries={["/product/1"]}>
            <Routes>
                <Route path="/product/:id" element={<Product products={mockProducts} onAddToCart={() => {}} />} />
            </Routes>
        </MemoryRouter>
    );

    const product = mockProducts[0];

    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
});

test("calls onAddToCart when add to cart button is clicked", () => {
    const mockProducts = [
        {
            id: 1,
            image: "https://example.com/image.jpg",
            name: "Test Product",
            description: "This is a test product",
            price: 19.99
        }
    ];

    const mockOnAddToCart = jest.fn();

    render(
        <MemoryRouter initialEntries={["/product/1"]}>
            <Routes>
                <Route path="/product/:id" element={<Product products={mockProducts} onAddToCart={mockOnAddToCart} />} />
            </Routes>
        </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/add to cart/i));

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[0].id);
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
});