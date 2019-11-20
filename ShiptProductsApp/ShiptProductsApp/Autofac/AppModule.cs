using Autofac;
using Products.Services.Autofac;
using Products.Services.Services;
using Products.Services.Services.Interfaces;
using ProductsApp.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Products.App.Autofac
{
    public class AppModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            base.Load(builder);
        }
    }
}
