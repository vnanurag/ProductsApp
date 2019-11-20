using Products.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Products.Services.Services.Interfaces
{
    public interface IProductsService
    {
        Task<ProductInfo[]> GetProducts();
        Task<ProductInfo> GetProductById(int id);
        void AddProduct(ProductInfo product);
        Task<ProductInfo> UpdateProduct(int id, ProductInfo product);
        void DeleteProduct(int id);
    }
}
