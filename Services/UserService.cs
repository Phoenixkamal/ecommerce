
using BAKERBAZZAR.API.Entities;
using System;
using static System.Collections.Specialized.BitVector32;

namespace BAKERBAZZAR.API.Services
{
    public interface IUserService
    {
        Task<User?> VerifyUser(LoginRequest loginPayload);
        Task<bool> SetUserAccessToken(string id, string accessToken, string refreshToken);
        //Task<User?> GetUserByRefreshToken(TokenRequest tokenRequest);
        Task<List<Category>?> GetCategory(string keyword = "");
        //Task<List<SetUser>?> GetUsers(string keyword = "");
        //Task<List<SetUser>?> GetUser(string keyword = "");
        //Task<List<Roles>?> GetRoles();
        //Task<List<Units>?> GetUnits();
        //Task<List<clsWarehouse>?> GetWarehouse();
        Task<List<Product>?> GetProduct(string categoryid = "", string keyword = ""); 
        Task<List<Product>?> GetWishlist(string action, string userid, int productid);
        Task<ProductDetails?> GetProductDetails(string productid = "");
        Task<MyOrders?> GetMyOrders(string userdisplayid, string keyword = "", string code = "");
        Task<OrderDetails?> GetOrderDetails(string displayid = "");
        Task<bool> AddToCart(AddToCartRequest cartRequest);
        Task<bool> CreateOrder(string displayid, int addressid);
        Task<List<Quote>?> GetActiveQuote(string sessionid = "");
        Task<CartDetails?> GetCartDetails(string sessionid = "");
        Task<bool> DeleteCartItem(string cartdisplayid = "", int recordid = -999);
        Task<bool> UpdateItemQty(int linerid, int qty);
        Task<List<clsAddress>?> GetAddress(string userdisplayid);
        Task<bool> UpsetAddress(SetAddress addrs);
        //Task<bool> UpsetProduct(Product product);
        //Task<bool> UpsetCategory(EditCategory addrs);
        Task<SetAddress?> GetUserAddress(int recordid);
        //Task<Category?> GetCategoryById(int recordid);
        Task<bool> UpdateDefaultAddress(string displayid, int recordid);
        Task<bool> UpdateProfile(clsProfile profile,string fileurl);
        //Task<bool> UpdateProduct(ProductDetails product);
        Task<Dashboard?> GetDashboardDetails(string userdisplayid);
        Task<MyOrders?> GetDeliveryAgentOrders(string displayid, string keyword = "", string code = "");

    }

    public class UserService : IUserService
    {
        public async Task<User?> VerifyUser(LoginRequest loginPayload)
        {
            SqlParameter[] param = {
                new SqlParameter("@UserName",loginPayload.username),
                new SqlParameter("@Password",loginPayload.password)
            };

            //var result = await Task.Run(() => SqlUtility.ExecuteProcedureReturnObject<User>("BB_VerifyLogin", param));
            //return result?.Count > 0 ? result[0] : null;
            return  await Task.Run(() => JsonConvert.DeserializeObject<User?>(SqlUtility.ExecuteProcedureReturnString("BB_VerifyLogin", param)));


        }

        public async Task<bool> SetUserAccessToken(string id, string accessToken, string refreshToken)
        {
            SqlParameter[] param = {
                new SqlParameter("@UserDisplayId",id),
                new SqlParameter("@JwtToken",accessToken),
                new SqlParameter("@RefreshToken",refreshToken)
            };

            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_SetUserJwtToken", param));
        }
        public async Task<List<Category>?> GetCategory(string keyword = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@Keyword",keyword)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<Category>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetCategory", param)));
            //var result = await Task.Run(() => SqlUtility.ExecuteProcedureReturnObject<Categories?> ("BB_GetCategory", param));

            //return result?.Count > 0 ? result[0] : null;
        }



        public async Task<List<Product>?> GetProduct(string categoryid = "",string keyword = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",categoryid),
                new SqlParameter("@Keyword",keyword)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<Product>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetProducts", param)));
            //var result = await Task.Run(() => SqlUtility.ExecuteProcedureReturnObject<Categories?> ("BB_GetCategory", param));

            //return result?.Count > 0 ? result[0] : null;
        }

        public async Task<List<Product>?> GetWishlist(string action, string userid, int productid)
        {
            SqlParameter[] param = {
                new SqlParameter("@action",action),
                new SqlParameter("@UserId",userid),
                new SqlParameter("@ProductId",productid)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<Product>?>(SqlUtility.ExecuteProcedureReturnString("BB_ManageWishlist", param)));
        }
        public async Task<ProductDetails?> GetProductDetails(string productid = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@ProductId",productid)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<ProductDetails?>(SqlUtility.ExecuteProcedureReturnString("BB_GetProductById", param)));

        }

        //public async Task<Product?> GetProductDetails(string productid = "")
        //{
        //    SqlParameter[] param = {
        //        new SqlParameter("@ProductId",productid)
        //    };

        //    var result = await Task.Run(() => SqlUtility.ExecuteProcedureReturnObject<Product>("BB_GetProductById", param));

        //    return result?.Count > 0 ? result[0] : null;
        //}
        public async Task<MyOrders?> GetMyOrders(string userdisplayid, string keyword = "", string code = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",userdisplayid),
                new SqlParameter("@Keyword",keyword),
                new SqlParameter("@Code",code)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<MyOrders?>(SqlUtility.ExecuteProcedureReturnString("BB_GetMyOrders", param)));

        }
        public async Task<List<clsAddress>?> GetAddress(string userdisplayid)
        {
            SqlParameter[] param = {
                new SqlParameter("@UserDisplayId",userdisplayid),
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<List<clsAddress>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetAddress", param)));

        }
        public async Task<OrderDetails?> GetOrderDetails(string displayid = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@SessionId",displayid)
            };           

            return await Task.Run(() => JsonConvert.DeserializeObject<OrderDetails>(SqlUtility.ExecuteProcedureReturnString("BB_GetOrderDetails", param)));
            
        }

        public async Task<bool> AddToCart(AddToCartRequest cartRequest)
        {
            SqlParameter[] param = {
                new SqlParameter("@SessionId",cartRequest.cartdisplayid),
                new SqlParameter("@ProductRId",cartRequest.productrid),
                new SqlParameter("@Qty",cartRequest.quantity),
                new SqlParameter("@UserDisplayId",cartRequest.userdisplayid)
            };

            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_SetQuotes", param));
        }
        public async Task<bool> CreateOrder(string displayid, int addressid)
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",displayid),
                new SqlParameter("@addressid",addressid)
            };

            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_CreateOrder", param));
        }
        public async Task<List<Quote>?> GetActiveQuote(string sessionid = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@SessionId",sessionid)
            };
            return await Task.Run(() => JsonConvert.DeserializeObject<List<Quote>?>(SqlUtility.ExecuteProcedureReturnString("BB_GetActiveQuote", param)));

        }
        public async Task<CartDetails?> GetCartDetails(string sessionid)
        {
            SqlParameter[] param = {
                new SqlParameter("@SessionId",sessionid)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<CartDetails>(SqlUtility.ExecuteProcedureReturnString("BB_GetActiveQuote", param)));
        }
        public async Task<bool> DeleteCartItem(string cartdisplayid = "", int recordid = -999)
        {
            SqlParameter[] param = {
                new SqlParameter("@SessionId",cartdisplayid),
                new SqlParameter("@RecordId",recordid)
            };

            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_DeleteCartItem", param));
        }
        public async Task<bool> UpdateItemQty(int linerid, int qty)
        {
            SqlParameter[] param = {
                new SqlParameter("@linerid",linerid),
                new SqlParameter("@qty",qty)
            };

            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpdateItemQty", param));
        }
        public async Task<bool> UpsetAddress(SetAddress addrs)
        {

            SqlParameter[] param = {
                new SqlParameter("@Mode",addrs.mode),
                new SqlParameter("@DisplayId",addrs.displayid),
                new SqlParameter("@Name",addrs.name),
                new SqlParameter("@Address1",addrs.address1),
                 new SqlParameter("@Address2",addrs.address2),
                new SqlParameter("@Address3",addrs.address3),
                new SqlParameter("@City",addrs.city),
                new SqlParameter("@State",addrs.state),
                new SqlParameter("@Zipcode",addrs.zipcode),
                new SqlParameter("@Phone",addrs.phoneno),
                new SqlParameter("@Type",addrs.type),
                new SqlParameter("@RecordId",addrs.recordid)
            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpsetAddress", param));
        } 

        public async Task<SetAddress?> GetUserAddress(int recordid)
        {
            SqlParameter[] param = {
                new SqlParameter("@recordid",recordid)                
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<SetAddress?>(SqlUtility.ExecuteProcedureReturnString("BB_GetAddressByRecordId", param)));

        }  
        public async Task<bool> UpdateDefaultAddress(string displayid, int recordid)
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",displayid),
                new SqlParameter("@RecordId",recordid)
            };

            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpdateDefaultAddress", param));
        }
        public async Task<bool> UpdateProfile(clsProfile profile,string fileurl)
        {

            SqlParameter[] param = {
                new SqlParameter("@DisplayId",profile.userdisplayid),
                new SqlParameter("@Name",profile.name),               
                new SqlParameter("@PhoneNo",profile.phoneno),
                new SqlParameter("@Email",profile.email),
                new SqlParameter("@Password",profile.password),
                new SqlParameter("@profileimage",fileurl)
            };
            return await Task.Run(() => SqlUtility.ExecuteProcedure("BB_UpdateProfile", param));
        }


        public async Task<Dashboard?> GetDashboardDetails(string userdisplayid)
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",userdisplayid)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<Dashboard?>(SqlUtility.ExecuteProcedureReturnString("BB_GetDashboardDetails", param)));

        }
        public async Task<MyOrders?> GetDeliveryAgentOrders(string displayid, string keyword = "", string code = "")
        {
            SqlParameter[] param = {
                new SqlParameter("@DisplayId",displayid),
                new SqlParameter("@Keyword",keyword),
                new SqlParameter("@Code",code)
            };

            return await Task.Run(() => JsonConvert.DeserializeObject<MyOrders?>(SqlUtility.ExecuteProcedureReturnString("BB_GetDeliveryAgentOrders", param)));

        }


    }

}
