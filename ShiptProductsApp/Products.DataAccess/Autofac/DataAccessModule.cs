using Autofac;
using Products.DataAccess.Repos;
using Products.DataAccess.Repos.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Products.DataAccess.Autofac
{
    public class DataAccessModule  : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);

            // Register Services
            builder
                .RegisterType<ProductsDynamoDbRepo>()
                .As<IProductsDynamoDbRepo>();
        }
    }
}
