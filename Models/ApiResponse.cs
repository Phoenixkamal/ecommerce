namespace BAKERBAZZAR.API.Models
{
    [Serializable]
    public class ApiResponse
    {
        public int code { get; set; } = HttpCode.Ok;
        public string status { get; set; } = HttpStatus.Ok;
        public string message { get; set; } = HttpStatusMessages.Ok;
        public string errordetails { get; set; } = string.Empty;
        public dynamic? responsedata { get; set; }
    }
}
