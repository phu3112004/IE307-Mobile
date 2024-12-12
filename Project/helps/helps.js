export const getAllProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

export const getAllBooks = async () => {
  const data = [];
  for (let i = 1; i <= 30; i++) {
    try {
      const response = await fetch(
        `https://www.gutenberg.org/cache/epub/${i}/pg${i}.txt`
      );
      const text = await response.text();
      const titleMatch = text.match(/Title:\s*(.+)/);
      const authorMatch = text.match(/Author:\s*(.+)/);
      const releaseDateMatch = text.match(/Release date:\s*(.+)/i);
      const languageMatch = text.match(/Language:\s*(.+)/);
      const book = {
        id: i,
        title: titleMatch ? titleMatch[1] : "Unknown",
        author: authorMatch ? authorMatch[1] : "Unknown",
        releaseDate: releaseDateMatch ? releaseDateMatch[1] : "Unknown",
        language: languageMatch ? languageMatch[1] : "Unknown",
        image: `https://www.gutenberg.org/cache/epub/${i}/pg${i}.cover.medium.jpg`,
      };
      data.push(book);
    } catch (error) {
      console.error(error);
    }
  }
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
