using System.Reflection;

namespace BAKERBAZZAR.API.Services
{
    public interface IAdminService
    {
        Task<List<Product>?> GetProduct(string categoryid = "", string keyword = "");
        Task<bool> UpsetInventoryItem(InventoryItemRequest inventoryReq);
        Task<bool> DeleteInventoryItem(string itemdispalyid = "");
        Task<bool> UpsetUser(SetUser user);
        Task<List<User>?> GetUserList(string keyword = "");
        Task<User?> GetUserDetails(string displayid = "");
        Task<bool> DeleteUser(string dispalyid = "");
        Task<bool> UpsetOrderStatus(int orderid, string trackingcode, string lastupdatedby = "");
        Task<bool> SetWarehouse(int orderid, int Warehouseid);
        Task<bool> SetDeliveryAgent(int orderid, int agentrid);

    }

    public class AdminService : IAdminService
    {
        public async Task<List<Product>?> GetProduct(string categoryid = "", string keyword = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",categoryid),
                new SqlParameter("@Keyword",keyword)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<Product>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetProducts", param)));

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
        public async Task<List<User>?> GetUserList(string keyword = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@Keyword",keyword)
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
