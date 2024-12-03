namespace BAKERBAZZAR.API.Models.IO_Templates
{
    [Serializable]
    public class LoginRequest
    {
        public string username { get; set; } = "";
        public string password { get; set; } = "";

        //public LoginRequest()
        //{
        //    username = "Deepa";
        //    password = "adn@123";
        //}
    }

    //[Serializable]
    //public class LoginResponse
    //{
    //    public string? userid { get; set; }
    //    public string? token { get; set; }
    //    public string? userrole { get; set; }
    //    public string? username { get; set; }
    //    public string? refreshToken { get; set; }


    //    public LoginResponse()
    //    {
    //        userid = "";
    //        token = "";
    //        userrole = "";
    //        username = "";
    //        refreshToken = "";
    //    }
    //}
}
