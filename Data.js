import { Agriculture, Electronics, Fashion, Mobile, Product1,  Product2, Product3, Product4, Product5, Product6 } from "./src/assets";

export const ProductsData = [
    {
      id: 1,
      name: "Apple iPhone 15 Pro Max",
      price: 1299.99,
      stock: 20,
      image: Product1,
      description: "Apple iPhone 15 Pro Max with A17 Bionic chip and 256GB storage.",
    },
    {
      id: 2,
      name: "Samsung 65-inch  4K TV",
      price: 899.99,
      stock: 15,
      image: Product2,
      description: "Samsung  4K Smart TV with ultra-HD resolution and HDR.",
    },
    {
      id: 3,
      name: "Men's Leather Jacket",
      category: "Fashion",
      price: 79.99,
      currency: "USD",
      stock: 50,
      image: Product3,
      description: "Premium quality men's leather jacket for casual and formal wear.",
      rating: 4.5,
      reviews: 85,
      brand: "Zara"
    },
    {
      id: 4,
      name: "Nike Air Max Sneakers",
      category: "Fashion",
      price: 129.99,
      currency: "USD",
      stock: 30,
      image: Product4,
      description: "Comfortable and stylish Nike Air Max sneakers for daily wear.",
      rating: 4.6,
      reviews: 140,
      brand: "Nike"
    },
    {
      id: 5,
      name: "Organic Almonds - 1kg",
      category: "Groceries",
      price: 15.99,
      currency: "USD",
      stock: 100,
      image: Product5,
      description: "Fresh organic almonds packed in a 1kg resealable bag.",
      rating: 4.9,
      reviews: 200,
      brand: "Healthy Foods"
    },
    {
      id: 6,
      name: "Office Ergonomic Chair",
      category: "Home Essentials",
      price: 249.99,
      currency: "USD",
      stock: 10,
      image: Product6,
      description: "Comfortable ergonomic chair with adjustable height and lumbar support.",
      rating: 4.7,
      reviews: 75,
      brand: "HomeOffice"
    }
]
  export const Categories= [
    {
      name: "Electronics",
      image: Electronics
    },
    {
      name: "Fashion",
      image: Fashion
    },
    {
      name: "Mobile",
      image: Mobile
    },
    {
      name: "Agriculture",
      image: Agriculture
    }
  ]


export const CompanyName = "BeccaStore"

export const FormatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount); // Replace € with E
};

// }).format(amount).replace("#", " "); // Replace € with E
// 
