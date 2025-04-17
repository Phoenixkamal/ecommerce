using System.Reflection;

namespace BAKERBAZZAR.API.Services
{
    public interface IAdminService
    {
        Task<List<Product>?> GetProduct(string categoryid = "", string keyword = "");
        Task<bool> UpsetInventoryItem(InventoryItemRequest inventoryReq);
        Task<bool> DeleteInventoryItem(string itemdispalyid = "");
        Task<bool> UpsetUser(SetUser user);
        Task<List<User>?> GetUserList(string keyword = "",int role=0);
        Task<User?> GetUserDetails(string displayid = "");
        Task<bool> DeleteUser(string dispalyid = "");
        Task<bool> UpsetOrderStatus(int orderid, string trackingcode, string lastupdatedby = "");
        Task<bool> SetWarehouse(int orderid, int Warehouseid);
        Task<bool> SetDeliveryAgent(int orderid, int agentrid);
        Task<Category?> GetCategoryById(int recordid);
        Task<List<Category>?> GetCategoryByWarehouseId(int warehouseid);
        Task<List<Product>?> GetProductsByCridWrid(int cartegoryrid,int warehouserid);
        Task<bool> UpsetCategory(EditCategory addrs);
        Task<List<Roles>?> GetRoles();
        Task<List<Units>?> GetUnits();
        Task<List<clsWarehouse>?> GetWarehouse();
        Task<bool> UpsetProduct(Product product);
        Task<bool> UpdateProduct(ProductDetails product);
        Task<List<SetUser>?> GetUser(string keyword = "");
        Task<List<SetUser>?> GetUsers(string keyword = "");

    }

    public class AdminService : IAdminService
    {
        public async Task<bool> UpsetCategory(EditCategory addrs)
        {

            SqlParameter[] param = {
                new SqlParameter("@Mode",addrs.mode),
                new SqlParameter("@RecordId",addrs.RecordId),
                new SqlParameter("@categoryName",addrs.CategoryName),
                new SqlParameter("@categoryImage",addrs.CategoryImage),
            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpsetCategory", param));
        }
        public async Task<Category?> GetCategoryById(int recordid)
        {
            SqlParameter[] param = {
                new SqlParameter("@recordid",recordid)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<Category?>(SqlUtility.ExecuteProcedureReturnString("BB_GetCategoryById", param)));

        }      
        public async Task<List<Category>?> GetCategoryByWarehouseId(int warehouseid)
        {
            SqlParameter[] param = {
                new SqlParameter("@Warehouseid",warehouseid)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<Category>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetCategoryByWid", param)));

        }   
        public async Task<List<Product>?> GetProductsByCridWrid(int categoryrid,int warehouserid)
        {
            SqlParameter[] param = {
                new SqlParameter("@categoryrid",categoryrid),
                new SqlParameter("@warehouserid",warehouserid)
            };
            string jsonString = SqlUtility.ExecuteProcedureReturnString("BB_GetProductsByCidWid", param);
            Console.WriteLine(jsonString);

            return await Task.Run(() => JsonConvert.DeserializeObject<List<Product>?>(jsonString));

        }
        public async Task<List<Product>?> GetProduct(string categoryid = "", string keyword = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",categoryid),
                new SqlParameter("@Keyword",keyword)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<Product>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetProducts", param)));

        }

        public async Task<List<SetUser>?> GetUser(string displayId = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@userDisplayId",displayId)
            };

            return await Task.Run(() =>
            {
                var user = JsonConvert.DeserializeObject<SetUser?>(SqlUtility.ExecuteProcedureReturnString("BB_GetUserDetailByDisplayId", param));
                return user != null ? new List<SetUser> { user } : new List<SetUser>();
            });
        }



        public async Task<List<Units>?> GetUnits()
        {
            return await Task.Run(() => JsonConvert.DeserializeObject<List<Units>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetAllUnits")));
        }
        public async Task<List<Roles>?> GetRoles()
        {
            return await Task.Run(() => JsonConvert.DeserializeObject<List<Roles>?>(SqlUtility.ExecuteProcedureReturnString("GetAllRoles")));
        }

        public async Task<List<clsWarehouse>?> GetWarehouse()
        {

            return await Task.Run(() => JsonConvert.DeserializeObject<List<clsWarehouse>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetWarhousDetails")));
        }

        public async Task<List<SetUser>?> GetUsers(string keyword = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@Keyword",keyword)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<SetUser>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetUserList", param)));
        }

        public async Task<bool> UpsetProduct(Product product)
        {

            SqlParameter[] param = new SqlParameter[]
            {
                 new SqlParameter("@Mode", SqlDbType.NVarChar, 50) { Value = (object)product.mode ?? DBNull.Value },
                new SqlParameter("@ProductId", SqlDbType.NVarChar, 100) { Value = (object)product.ProductId ?? DBNull.Value },
                new SqlParameter("@ProductName", SqlDbType.NVarChar, 100) { Value = (object)product.ProductName ?? DBNull.Value },
                new SqlParameter("@ProductImage", SqlDbType.NVarChar, 255) { Value = (object)product.ProductImagePath ?? DBNull.Value },
                new SqlParameter("@CategoryRId", SqlDbType.Int) { Value = product.CategoryRId ?? (object)DBNull.Value },
                new SqlParameter("@WarehouseId", SqlDbType.Int) { Value = product.WarehouseId ?? (object)DBNull.Value },
                new SqlParameter("@Varient", SqlDbType.Int) { Value = product.VarientName ?? (object)DBNull.Value },
                new SqlParameter("@Unit", SqlDbType.NVarChar, 50) { Value = (object)product.Unit ?? DBNull.Value },
                new SqlParameter("@SellingPrice", SqlDbType.Decimal) { Value = product.SellingPrice },
                new SqlParameter("@RetailPrice", SqlDbType.Decimal) { Value = product.RetailPrice },
                new SqlParameter("@IsDefaultVarient", SqlDbType.Int) { Value = product.IsDefaultVarient ?? (object)DBNull.Value }

            };

            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpsetProduct", param));
        }
        public async Task<bool> UpsetInventoryItem(InventoryItemRequest inventoryReq)
        {

            SqlParameter[] param = {
                new SqlParameter("@Mode",inventoryReq.mode),
                new SqlParameter("@Supplier",inventoryReq.supplier),
                new SqlParameter("@CategoryRId",inventoryReq.categoryrid),
                new SqlParameter("@ProductId",inventoryReq.productid),
                new SqlParameter("@ProductName",inventoryReq.productname),
                new SqlParameter("@InEnglish",inventoryReq.printenglish),
                new SqlParameter("@InTamil",inventoryReq.printtamil),
                new SqlParameter("@MRP",inventoryReq.mrp),
                new SqlParameter("@PurchasePrice",inventoryReq.purchaseprice),
                new SqlParameter("@Tax",inventoryReq.tax),
                new SqlParameter("@NetPurchasePrice",inventoryReq.netpurchaseprice),
                new SqlParameter("@PurchasePercentage",inventoryReq.purchasepercentage),
                new SqlParameter("@NetPurchasePercentage",inventoryReq.netpurchaseperc),
                new SqlParameter("@HSNSAC",inventoryReq.hsnsac),
                new SqlParameter("@SellingProfitPercentage",inventoryReq.sellingprofitperc),
                new SqlParameter("@SellingPrice",inventoryReq.sellingprice),
                new SqlParameter("@SellingPercentage",inventoryReq.sellingperc),
                new SqlParameter("@ClassicProfitPercentage",inventoryReq.classicprofitperc),
                new SqlParameter("@ClassicPrice",inventoryReq.classicprice),
                new SqlParameter("@ClassicPercentage",inventoryReq.classicperc),
                new SqlParameter("@QuantityPerBox",inventoryReq.quantityperbox),
                new SqlParameter("@RetailPrice",inventoryReq.retailprice),
                new SqlParameter("@Unit",inventoryReq.unit),
                new SqlParameter("@MinimumOrderQuantity",inventoryReq.mnmorderqty),
                new SqlParameter("@InitialStock",inventoryReq.initialstock),
                new SqlParameter("@BulkQuantity",inventoryReq.bulkqty),
                new SqlParameter("@BulkQuantityPrice",inventoryReq.bulkqtyprice),
                new SqlParameter("@EnableBarCodeSticker",inventoryReq.enablebarcode)

            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpsetProduct", param));
        }
        public async Task<bool> UpdateProduct(ProductDetails product)
        {
            SqlParameter[] param1 = {
        new SqlParameter("@productImage", product.ProductDetail.ProductImagePath ?? (object)DBNull.Value),
        new SqlParameter("@productName", product.ProductDetail.ProductName ?? (object)DBNull.Value),
        new SqlParameter("@categoryId", product.ProductDetail.CategoryRId),
        new SqlParameter("@categoryName", product.ProductDetail.Category ?? (object)DBNull.Value),
        new SqlParameter("@warehouseId", product.ProductDetail.WarehouseId),
        new SqlParameter("@productId", product.ProductDetail.ProductId)
    };

            List<Task<bool>> tasks = new List<Task<bool>>();

            tasks.Add(Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpdateProductCommon", param1)));

            foreach (var variant in product.Varients)
            {
                SqlParameter[] param2 = {
            new SqlParameter("@sellingPrice", variant.SellingPrice ?? (object)DBNull.Value),
            new SqlParameter("@unit", variant.Unit ?? (object)DBNull.Value),
            new SqlParameter("@retailPrice", variant.RetailPrice),
            new SqlParameter("@defaultVarient", variant.IsDefaultVarient ?? (object)DBNull.Value),
            new SqlParameter("@varient", variant.Varient),
            new SqlParameter("@recordId", variant.RecordId),
            new SqlParameter("@productId", product.ProductDetail.ProductId)
        };

                tasks.Add(Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpdateProductDifferent", param2)));
            }

            var results = await Task.WhenAll(tasks);
            return results.All(result => result);
        }
        public async Task<bool> DeleteInventoryItem(string itemdispalyid = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",itemdispalyid),

            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_DeleteProduct", param));
        }
        public async Task<bool> UpsetUser(SetUser user)
        {

            SqlParameter[] param = {
                new SqlParameter("@Mode",user.Mode),
                new SqlParameter("@DisplayId",user.DisplayId),
                new SqlParameter("@FirstName",user.FirstName),
                new SqlParameter("@LastName",user.LastName),
                new SqlParameter("@UserName",user.UserName),
                new SqlParameter("@Email",user.Email),
                new SqlParameter("@Password",user.Password),
                new SqlParameter("@PhoneNo",user.PhoneNo),
                new SqlParameter("@RoleId",user.RoleId),
                new SqlParameter("@Gender",user.Gender),
                new SqlParameter("@CustomerType",user.CustomerType)
            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpsetUser", param));
        }
        public async Task<List<User>?> GetUserList(string keyword = "", int role = 0)
        {
            SqlParameter[] param = {
                new SqlParameter("@Keyword",keyword),
                new SqlParameter("@RoleId",role)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<User>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetUserList", param)));

        }
        public async Task<User?> GetUserDetails(string displayid = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@userDisplayId",displayid)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<User?>(SqlUtility.ExecuteProcedureReturnString("BB_GetUserDetailByDisplayId", param)));

        }
        public async Task<bool> DeleteUser(string dispalyid = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",dispalyid),

            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_DeleteUser", param));
        }
        public async Task<bool> UpsetOrderStatus(int orderid, string trackingcode, string lastupdatedby= "")
        {
            SqlParameter[] param = {
                new SqlParameter("@OrderId",orderid),
                new SqlParameter("@TrackingCode",trackingcode),
                new SqlParameter("@LastUpdatedBy",lastupdatedby)
            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpsetOrderStatus", param));
        }
        public async Task<bool> SetWarehouse(int orderid, int Warehouseid)
        {
            SqlParameter[] param = {
                new SqlParameter("@OrderId",orderid),
                new SqlParameter("@WarehouseId",Warehouseid)
            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_SetWarehouse", param));
        }
        public async Task<bool> SetDeliveryAgent(int orderid, int agentrid)
        {
            SqlParameter[] param = {
                new SqlParameter("@OrderId",orderid),
                new SqlParameter("@AgentRId",agentrid)
            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_SetDeliveryAgent", param));
        }
    }
}
