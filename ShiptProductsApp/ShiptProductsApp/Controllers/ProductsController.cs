using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Products.Domain.Models;
using Products.Services.Services.Interfaces;

namespace ProductsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductsService _productsService;

        public ProductsController(IProductsService productsService)
        {
            _productsService = productsService;
        }

        // GET: api/Products

        /// <summary>
        /// Gets all the products
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<ProductInfo>> Get()
        {
            try
            {
                var products = await _productsService.GetProducts();
                return products.ToArray();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // GET: api/Products/5

        /// <summary>
        /// Gets the details of a particular product
        /// </summary>
        /// <param name="id">ProductId of the product to be retrieved</param>
        /// <returns>Product Details</returns>
        [HttpGet("{id}")]
        public async Task<ProductInfo> Get(int id)
        {
            try
            {
                var product = await _productsService.GetProductById(id);
                return product;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        // POST: api/Products

        /// <summary>
        /// Adds a new Product to the list
        /// </summary>
        /// <param name="value">Details of the product to be added</param>
        [HttpPost("add")]
        public void Post([FromBody] ProductInfo product)
        {
            try
            {
                var randomProductId = new Random();
                product.ProductId = randomProductId.Next();
                _productsService.AddProduct(product);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        // PUT: api/Products/5

        /// <summary>
        /// Updates the details of a particular product
        /// </summary>
        /// <param name="id">ProductId of the product to be updated</param>
        /// <param name="value">Updated details of the product</param>
        [HttpPut("{id}")]
        public async Task<ProductInfo> Put(int id, [FromBody] ProductInfo product)
        {
            try
            {
                var updatedProduct = await _productsService.UpdateProduct(id, product);
                return updatedProduct;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        // DELETE: api/ApiWithActions/5

        /// <summary>
        /// Deletes a particular product
        /// </summary>
        /// <param name="id">ProductId of the product to be deleted</param>
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            try
            {
                _productsService.DeleteProduct(id);
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
