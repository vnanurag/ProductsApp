using Products.DataAccess.Repos.Interfaces;
using Products.Domain.Models;
using Products.Services.Services.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Products.Services.Services
{
    public class ProductsService : IProductsService
    {
        private readonly IProductsDynamoDbRepo _dynamoDbRepo;

        public ProductsService(
            IProductsDynamoDbRepo dynamoDbRepo)
        {
            _dynamoDbRepo = dynamoDbRepo;
        }

        public void AddProduct(ProductInfo product)
        {
            try
            {
                var dbProduct = new DataAccess.Models.ProductInfo()
                {
                    ProductId = product.ProductId,
                    Name = product.Name,
                    Price = product.Price,
                    SerialNumber = product.SerialNumber
                };

                _dynamoDbRepo.AddProduct(dbProduct);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public void DeleteProduct(int id)
        {
            try
            {
                _dynamoDbRepo.DeleteProduct(id);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<ProductInfo> GetProductById(int id)
        {
            try
            {
                var product = await _dynamoDbRepo.GetProductById(id);
                var result = new ProductInfo()
                {
                    ProductId = product.ProductId,
                    Name = product.Name,
                    Price = product.Price,
                    SerialNumber = product.SerialNumber
                };

                return result;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async Task<ProductInfo[]> GetProducts()
        {
            try
            {
                var products = await _dynamoDbRepo.GetProducts();
                var result = products
                    .Select(x => new ProductInfo
                    {
                        ProductId = x.ProductId,
                        Name = x.Name,
                        Price = x.Price,
                        SerialNumber = x.SerialNumber
                    })
                    .ToArray();

                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ProductInfo> UpdateProduct(int id, ProductInfo product)
        {
            try
            {
                var dbProduct = new DataAccess.Models.ProductInfo()
                {
                    ProductId = id,
                    Name = product.Name,
                    Price = product.Price,
                    SerialNumber = product.SerialNumber
                };

                var updatedProduct = await _dynamoDbRepo.UpdateProduct(dbProduct);

                var result = new ProductInfo()
                {
                    ProductId = updatedProduct.ProductId,
                    Name = updatedProduct.Name,
                    Price = updatedProduct.Price,
                    SerialNumber = updatedProduct.SerialNumber
                };

                return result;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}
