namespace BAKERBAZZAR.API.Includes
{
    public static class Functions
    {
        public static string ToJson(this object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }

        public static T? FromJson<T>(this string rawJson)
        {
            return JsonConvert.DeserializeObject<T>(rawJson);
        }

        public static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

    }
}
