using Products.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Products.DataAccess.Repos.Interfaces
{
    public interface IProductsDynamoDbRepo
    {
        ProductInfo[] GetProducts();
        ProductInfo GetProductById(int id);
        void AddProduct(ProductInfo product);
        ProductInfo UpdateProduct(int id);
        void DeleteProduct(int id);

    }
}
