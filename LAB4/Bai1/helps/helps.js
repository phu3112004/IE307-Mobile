export const getAllProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};
export const getProductById = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data = await response.json();
  return data;
};
export const getProductsByCategory = async (category) => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const data = await response.json();
  return data;
};
export const getCartByUser = async (userId) => {
  const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
  const data = await response.json();
  return data;
};
export const addToCart = async (id, newData) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/carts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add to cart: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
