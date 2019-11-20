using Products.DataAccess.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Products.DataAccess.Repos.Interfaces
{
    public interface IProductsDynamoDbRepo
    {
        Task<ProductInfo[]> GetProducts();
        Task<ProductInfo> GetProductById(int id);
        void AddProduct(ProductInfo product);
        Task<ProductInfo> UpdateProduct(ProductInfo product);
        void DeleteProduct(int id);

    }
}
