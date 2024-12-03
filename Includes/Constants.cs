namespace BAKERBAZZAR.API.Includes
{
    public static class HttpCode
    {
        public const int Ok = 200;
        public const int BadRequest = 400;
        public const int ExpectationFailed = 417;
        public const int FailedDependency = 424;
    }
    public static class HttpStatus
    {
        public const string Ok = "OK";
        public const string BadRequest = "Bad Request";
        public const string ExpectationFailed = "Expectation Failed";
        public const string FailedDependency = "Failed Dependency";
        public const string Created = "Created";
        public const string Deleted = "Deleted";
        public const string Updated = "Updated";
        public const string NotFound = "Data Not Found";
    }

    public static class HttpStatusMessages
    {
        public const string Ok = "the request processed successfully.";
        public const string Verifyuser_BadRequest = "please enter valid username, password and branch no";
        public const string Verifyuser_Notfound = "invalid username or password";
        public const string RefreshToken_BadRequest = "please enter valid userid and refresh token";
        public const string RefreshToken_Notfound = "invalid userid or refresh token / the token has been expired";

        public const string Result_Notfound = "No data found.";


        public const string Category_FailedDependency = "the order deletion failed";

        public const string OrderDelete_BadRequest = "please enter valid orderid";
        public const string OrderDelete_FailedDependency = "the order deletion failed";
        public const string OrderDelete_Ok = "the order has been deleted successfully";

        public const string OrderUpdate_BadRequest = "please enter valid orderid or order data";
        public const string OrderUpdate_FailedDependency = "the order updation failed";
        public const string OrderUpdate_Ok = "the order has been updated successfully";

        public const string OrderCreate_BadRequest = "please enter valid order data";
        public const string OrderCreate_FailedDependency = "the order creation failed";
        public const string OrderCreate_Ok = "the order has been created successfully";

        public const string OrderById_BadRequest = "please enter valid orderid";

        public const string InventoryItem_BadRequest = "please enter valid keyword";
        public const string UpsetInventory_BadRequest = "invalid details";

        public const string CartItemAdd_Ok = "the item has been added successfully";        
        public const string CartItemAdd_BadRequest = "please enter valid quantity";

        public const string ItemUpdate_Ok = "the item updated successfully";

    }
}
