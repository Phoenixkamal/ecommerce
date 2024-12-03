using BAKERBAZZAR.API.Models.IO_Templates;
using BAKERBAZZAR.API.Services;

namespace BAKERBAZZAR.API.Controller
{
    [Route("[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthenticationController> _logger;
        public AuthenticationController(IUserService userService, IJwtService jwtService, ILogger<AuthenticationController> logger)
        {
            _userService = userService;
            _jwtService = jwtService;
            _logger = logger;
        }

        [HttpPost("Login")]
        public async Task<ActionResult<ApiResponse>> VerifyUser([FromBody] LoginRequest _inputdata)
        {
            _logger.LogInformation("verify user execution start");

            ApiResponse _outputdata = new ApiResponse();

            try
            {
                if (!string.IsNullOrWhiteSpace(_inputdata.username) && !string.IsNullOrWhiteSpace(_inputdata.password))
                {
                    User? _userdata = await _userService.VerifyUser(_inputdata);

                    if (_userdata == null)
                    {
                        _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Verifyuser_Notfound;
                    }
                    else
                    {
                        //LoginResponse loginResponse = new LoginResponse();

                        //loginResponse.userid = _userdata.DisplayId.ToString();
                        //loginResponse.username = _userdata.UserName;
                        //loginResponse.userrole = _userdata.Role;
                        _userdata.AccessToken = _jwtService.GenerateJwtToken(_userdata);
                        _userdata.RefreshToken = Functions.GenerateRefreshToken();

                        await _userService.SetUserAccessToken(Convert.ToString(_userdata.DisplayId), _userdata.AccessToken, _userdata.RefreshToken);

                        _outputdata.responsedata = _userdata;
                    }
                }
                else
                {
                    _outputdata.code = HttpCode.BadRequest; _outputdata.status = HttpStatus.BadRequest; _outputdata.message = HttpStatusMessages.Verifyuser_BadRequest;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            _logger.LogInformation("verify user execution end");

            return StatusCode(_outputdata.code, _outputdata);
        }

    }

}
