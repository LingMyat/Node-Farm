const slugify = require('slugify');
/**
 * Replaces placeholders in a template with corresponding values from a product object.
 *
 * @param {string} temp - The template string containing placeholders.
 * @param {object} product - The product object containing values to replace placeholders.
 * @return {string} The modified template string with placeholders replaced by corresponding values.
 */
module.exports = (temp, product) => {
    const replacements = {
        "{%PRODUCT_NAME%}": product.productName,
        "{%IMAGE%}": product.image,
        "{%PRODUCT_PRICE%}": product.price,
        "{%PRODUCT_ID%}": product.id,
        "{%QUANTITY%}": product.quantity,
        "{%NOT_ORGANIC%}": product.organic ? '' : 'not-organic',
        "{%PRODUCT_DESCRIPTION%}": product.description,
        "{%PRODUCT_FROM%}": product.from,
        "{%PRODUCT_NUTRIENTS%}": product.nutrients,
        "{%PRODUCT_SLUG%}": slugify(
            product.productName, 
            { lower: true }
        ),
    };
    
    let output = temp;
    for (const [key, value] of Object.entries(replacements)) {
        output = output.replace(new RegExp(key, "g"), value);
    }
    
    return output;
}
