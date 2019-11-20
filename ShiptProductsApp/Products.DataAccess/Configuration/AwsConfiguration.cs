using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Products.DataAccess.Configuration
{
    public class AwsConfiguration
    {
        public string Region { get; set; }
        public string AccessKey { get; set; }
        public string SecretKey { get; set; }
    }
}
