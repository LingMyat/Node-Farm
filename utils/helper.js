module.exports = {
    /**
     * Finds a product with a given slug.
     *
     * @param {string} slug - The slug of the product.
     * @param {Array} products - The array of products to search from.
     * @return {Object} - The product object matching the slug.
     */
    getProductWithSlug: (slug, products) => {
        const words = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return products.find(product => product.productName.toLowerCase() === words.toLowerCase());
    }
}