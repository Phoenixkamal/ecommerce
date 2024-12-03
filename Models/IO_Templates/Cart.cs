namespace BAKERBAZZAR.API.Models.IO_Templates
{
    [Serializable]
    public class AddToCartRequest
    {
        public Guid cartdisplayid { get; set; } = Guid.Empty;
        public int quantity { get; set; }
        public int productrid { get; set; }
        public Guid userdisplayid { get; set; } = Guid.Empty;

        //public LoginRequest()
        //{
        //    username = "Deepa";
        //    password = "adn@123";
        //}
    }
}
