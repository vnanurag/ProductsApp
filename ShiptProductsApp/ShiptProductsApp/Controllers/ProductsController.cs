using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Products.Services.Services.Interfaces;

namespace ProductsApp.Controllers
{
    [EnableCors("AllOrigins")]
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
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Products/5

        /// <summary>
        /// Gets the details of a particular product
        /// </summary>
        /// <param name="id">ProductId of the product to be retrieved</param>
        /// <returns>Product Details</returns>
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Products

        /// <summary>
        /// Adds a new Product to the list
        /// </summary>
        /// <param name="value">Details of the product to be added</param>
        [HttpPost("add")]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Products/5

        /// <summary>
        /// Updates the details of a particular product
        /// </summary>
        /// <param name="id">ProductId of the product to be updated</param>
        /// <param name="value">Updated details of the product</param>
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5

        /// <summary>
        /// Deletes a particular product
        /// </summary>
        /// <param name="id">ProductId of the product to be deleted</param>
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
