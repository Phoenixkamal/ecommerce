namespace BAKERBAZZAR.API.Models
{
    public class JwtSettings
    {
        public string Audience { get; set; }
        public string Issuer { get; set; }
        public string Secret { get; set; }

        public JwtSettings()
        {
            Issuer = "";
            Audience = "";
            Secret = "";
        }
    }
}
