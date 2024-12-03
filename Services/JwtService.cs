namespace BAKERBAZZAR.API.Services
{
    public interface IJwtService
    {
        string GenerateJwtToken(User loggedInUser);
    }

    public class JwtService : IJwtService
    {
        private readonly JwtSettings _jwtSettings;

        public JwtService(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }
        public string GenerateJwtToken(User loggedInUser)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, loggedInUser.DisplayId.ToString()),
                new Claim(ClaimTypes.GivenName, loggedInUser.UserName),
                new Claim(ClaimTypes.Role, loggedInUser.Role),
            };

            var token = new JwtSecurityToken
            (
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddDays(90),
                notBefore: DateTime.UtcNow,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret)),
                    SecurityAlgorithms.HmacSha256)

            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
