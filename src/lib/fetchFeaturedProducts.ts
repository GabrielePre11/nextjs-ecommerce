export async function fetchFeaturedProducts() {
  const url: string = "https://dummyjson.com/products?limit=8";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `There was an error fetching the featured products: ${response.status}`
      );
    }

    const data = await response.json();
    console.log(data);
    return data.products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
  }
}
