using Products.DataAccess.Repos.Interfaces;
using Products.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Products.DataAccess.Repos
{
    public class ProductsDynamoDbRepo : IProductsDynamoDbRepo
    {
        public void AddProduct(ProductInfo product)
        {
            throw new NotImplementedException();
        }

        public void DeleteProduct(int id)
        {
            throw new NotImplementedException();
        }

        public ProductInfo GetProductById(int id)
        {
            throw new NotImplementedException();
        }

        public ProductInfo[] GetProducts()
        {
            throw new NotImplementedException();
        }

        public ProductInfo UpdateProduct(int id)
        {
            throw new NotImplementedException();
        }
    }
}
