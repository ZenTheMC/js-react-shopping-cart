import { render, screen, fireEvent } from "@testing-library/react";
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

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[0].id, 1);
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
});

test("increments quantity when + button is clicked", () => {
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

    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('Add to Cart'));

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[0].id, 2);
});

test("decrements quantity when - button is clicked", () => {
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

    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('-'));
    fireEvent.click(screen.getByText('Add to Cart'));

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[0].id, 2);
});

test("changes quantity when a number is typed into the input", () => {
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

    fireEvent.change(screen.getByDisplayValue('1'), { target: { value: '3' } });
    fireEvent.click(screen.getByText('Add to Cart'));

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProducts[0].id, 3);
});