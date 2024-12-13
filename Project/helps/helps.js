export const getAllProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

export const getAllBooks = async () => {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    try {
      const response = await fetch(
        `https://www.gutenberg.org/cache/epub/${i}/pg${i}.txt`
      );
      const text = await response.text();

      // Tìm các phần thông tin meta
      const titleMatch = text.match(/Title:\s*(.+)/);
      const authorMatch = text.match(/Author:\s*(.+)/);
      const releaseDateMatch = text.match(/Most recently updated:\s*(.+)/i);
      const languageMatch = text.match(/Language:\s*(.+)/);

      // Tìm dấu phân cách "*** START OF THE PROJECT GUTENBERG EBOOK"
      const contentStartIndex = text.indexOf("*** START OF THE PROJECT GUTENBERG EBOOK");

      if (contentStartIndex !== -1) {
        // Lấy phần nội dung sau dấu "*** START OF THE PROJECT GUTENBERG EBOOK"
        const contentAfterStart = text.slice(contentStartIndex + "*** START OF THE PROJECT GUTENBERG EBOOK".length).trim();

        // Tìm tên sách in hoa và dấu "***"
        const bookTitleMatch = contentAfterStart.match(/^([A-Z\s]+)\s*\*{3}/);
        const bookTitle = bookTitleMatch ? bookTitleMatch[1].trim() : "Unknown";

        // Loại bỏ tên sách và dấu "***" khỏi nội dung
        const content = contentAfterStart.replace(bookTitle + " ***", "").trim();

        const book = {
          id: i,
          title: titleMatch ? titleMatch[1] : bookTitle, // Nếu metadata có tiêu đề, dùng tiêu đề đó, nếu không dùng tên sách
          author: authorMatch ? authorMatch[1] : "Unknown",
          releaseDate: releaseDateMatch ? releaseDateMatch[1] : "Unknown",
          language: languageMatch ? languageMatch[1] : "Unknown",
          image: `https://www.gutenberg.org/cache/epub/${i}/pg${i}.cover.medium.jpg`,
          content: content, // Nội dung bắt đầu sau tên sách và dấu "***"
        };

        data.push(book);
      }
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
