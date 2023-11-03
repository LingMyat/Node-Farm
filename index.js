import fs from 'fs';
import url from 'url';
import http from 'http';
import { getProductWithSlug } from './utils/helper';
import replaceTemplate from './utils/replace-template';

//Html template
const overView     = fs.readFileSync(`${__dirname}/templates/overview.html`,'utf-8');
const productHtml  = fs.readFileSync(`${__dirname}/templates/product.html`,'utf-8');
const card         = fs.readFileSync(`${__dirname}/templates/card.html`,'utf-8');

//Data from json
const productsJSON = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const products = JSON.parse(productsJSON);

//Create Server and Replace template
const server = http.createServer((req, res)=>{
    const {query, pathname} = url.parse(req.url, true);

    if (pathname === '/') {
        res.writeHead(200, {
            'content-type': 'text/html',
        })

        const cardsHtml = products.map(product => replaceTemplate(card, product)).join('');
        const output    = overView.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

        res.end(output)
    } else if (pathname === '/product') {
        res.writeHead(200, {
            'content-type': 'text/html',
        })

        const product = getProductWithSlug(query.slug, products);
        const output  = replaceTemplate(productHtml, product);
        
        res.end(output);
    } else if (pathname === '/api/products') {
        res.end(productsJSON);
    } else {
        res.writeHead(404, {
            'content-type': 'text/html',
        });
        res.end('<h1>Page not found</h1>');
    }
})

//Listen Server at localhost:8000
server.listen(8000, '127.0.0.1', ()=>{
    console.log(`Listening at http://127.0.0.1:8000`);
})