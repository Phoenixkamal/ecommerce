namespace BAKERBAZZAR.API.Models.IO_Templates
{

    [Serializable]
    public class TokenRequest
    {
        public string? userid { get; set; }
        public string? refreshtoken { get; set; }

        public TokenRequest()
        {
            userid = "";
            refreshtoken = "";
        }

    }
}
