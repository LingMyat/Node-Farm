module.exports = {
    getProductWithSlug : (slug,products) => {
        const words = slug.split('-');
        const capitalizedWordsArr = words.map(word => word.charAt(0) + word.slice(1));
        const capitalizedWords    = capitalizedWordsArr.join(' ');
        return products.find((product) => {
            return product.productName.toLowerCase() == capitalizedWords
        });
    }
}