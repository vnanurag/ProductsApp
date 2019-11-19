using Products.DataAccess.Repos.Interfaces;
using Products.Services.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Products.Services.Services
{
    public class ProductsService : IProductsService
    {
        private readonly IProductsDynamoDbRepo _dynamoDbRepo;

        public ProductsService(IProductsDynamoDbRepo dynamoDbRepo)
        {
            _dynamoDbRepo = dynamoDbRepo;
        }
    }
}
