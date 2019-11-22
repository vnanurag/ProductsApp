using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DataModel;
using Amazon.Runtime;
using Microsoft.Extensions.Options;
using Products.DataAccess.Configuration;
using Products.DataAccess.Models;
using Products.DataAccess.Repos.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProductsTable = Products.DataAccess.Tables.Products;

namespace Products.DataAccess.Repos
{
    public class ProductsDynamoDbRepo : IProductsDynamoDbRepo
    {
        private readonly AwsConfiguration _configuration;
        private readonly IAmazonDynamoDB _dynamoDBClient;
        private readonly IDynamoDBContext _context;
        private readonly string AccessKey;
        private readonly string SecretKey;
        private readonly string Region;

        public ProductsDynamoDbRepo(
            IOptions<AwsConfiguration> configuration,
            IAmazonDynamoDB dynamoDBClient,
            IDynamoDBContext context)
        {
            _configuration = configuration.Value;
            _dynamoDBClient = dynamoDBClient;
            _context = context;
            AccessKey = _configuration.AccessKey;
            SecretKey = _configuration.SecretKey;
            Region = _configuration.Region;

            var credentials = new BasicAWSCredentials(AccessKey, SecretKey);
            _dynamoDBClient = new AmazonDynamoDBClient(credentials, RegionEndpoint.USEast2);
            _context = new DynamoDBContext(_dynamoDBClient);
        }

        public async Task<ProductInfo[]> AddProduct(ProductInfo product)
        {
            try
            {
                var newProduct = new ProductsTable
                {
                    ProductId = product.ProductId,
                    Name = product.Name,
                    Price = product.Price,
                    SerialNumber = product.SerialNumber
                };

                await _context.SaveAsync(newProduct);
                var result = await GetProducts();
                return result;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public async void DeleteProduct(int id)
        {
            try
            {
                await _context.DeleteAsync<ProductsTable>(id);
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
                var product = await _context.LoadAsync<ProductsTable>(id);
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
                var condition = new List<ScanCondition>();
                var products = await _context.ScanAsync<ProductsTable>(condition).GetRemainingAsync();
                var result = products
                    .Select(x => new ProductInfo
                    {
                        ProductId = x.ProductId,
                        Name = x.Name,
                        Price = x.Price,
                        SerialNumber = x.SerialNumber
                    })
                    .OrderByDescending(x => x.Price)
                    .ToArray();

                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<ProductInfo> UpdateProduct(ProductInfo product)
        {
            try
            {
                var existingProduct = await _context.LoadAsync<ProductsTable>(product.ProductId);
                if (existingProduct != null)
                {
                    var updatedProduct = new ProductInfo()
                    {
                        ProductId = product.ProductId,
                        Name = product.Name,
                        Price = product.Price,
                        SerialNumber = product.SerialNumber
                    };
                    await _context.SaveAsync(updatedProduct);

                    return updatedProduct;
                }
                else
                {
                    await _context.SaveAsync(product);

                    return product;
                }
                
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    }
}