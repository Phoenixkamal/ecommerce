
using BAKERBAZZAR.API.Entities;
using Microsoft.AspNetCore.Components.Forms;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace BAKERBAZZAR.API.Controller
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;
        public UserController(IUserService userService, ILogger<UserController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet("Category")]
        public async Task<ActionResult<ApiResponse>> Category(string keyword = "")
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<Category>? _categorydata = await _userService.GetCategory(keyword);

                if (_categorydata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _categorydata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpGet("Wishlist")]
        public async Task<ActionResult<ApiResponse>> Wishlist(string action, string userid, int productid)
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<Product>? _wishlistdata = await _userService.GetWishlist(action,userid,productid);

                if (_wishlistdata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _wishlistdata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpGet("Products")]
        public async Task<ActionResult<ApiResponse>> Products(string categoryid = "", string keyword = "")
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<Product>? _categorydata = await _userService.GetProduct(categoryid, keyword);

                if (_categorydata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _categorydata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpGet("ProductDetails")]
        public async Task<ActionResult<ApiResponse>> ProductDetails(string productid = "", string mode = "")
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                ProductDetails? _productdata = await _userService.GetProductDetails(productid);

                if (_productdata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _productdata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpPost("AddToCart")]
        public async Task<ActionResult<ApiResponse>> AddToCart([FromBody] AddToCartRequest _inputdata)
        {

            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(Convert.ToString(_inputdata.cartdisplayid)) && !string.IsNullOrWhiteSpace(Convert.ToString(_inputdata.productrid)) && !string.IsNullOrWhiteSpace(Convert.ToString(_inputdata.userdisplayid)) && !string.IsNullOrWhiteSpace(Convert.ToString(_inputdata.quantity)))
                {

                    await _userService.AddToCart(_inputdata);
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok; _outputdata.message = HttpStatusMessages.CartItemAdd_Ok;

                }
                else
                {
                    _outputdata.code = HttpCode.BadRequest; _outputdata.status = HttpStatus.BadRequest; _outputdata.message = HttpStatusMessages.CartItemAdd_BadRequest;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }
            return StatusCode(_outputdata.code, _outputdata);
        }


        [HttpDelete("DeleteCartItem")]
        public async Task<ActionResult<ApiResponse>> DeleteCartItem(string cartdisplayid, int cartrid)
        {

            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(cartdisplayid))
                {
                    await _userService.DeleteCartItem(cartdisplayid, cartrid);
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok; _outputdata.message = HttpStatusMessages.Ok;

                }
                else
                {
                    _outputdata.code = HttpCode.BadRequest; _outputdata.status = HttpStatus.BadRequest; _outputdata.message = HttpStatusMessages.UpsetInventory_BadRequest;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }
            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpGet("MyOrders")]
        public async Task<ActionResult<ApiResponse>> MyOrders(string displayid, string keyword = "", string code = "")
        {

            ApiResponse _outputdata = new ApiResponse();

            try
            {
                MyOrders _orderdata = await _userService.GetMyOrders(displayid, keyword, code);
                //List<Order>? _orderdata = await _userService.GetMyOrders(displayid, keyword);

                if (_orderdata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _orderdata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);

        }

        [HttpGet("OrderDetails")]
        public async Task<ActionResult<ApiResponse>> OrderDetails(string displayid, string status = "getorder", int addressid = -999)
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                if (!string.IsNullOrWhiteSpace(displayid))
                {
                    if (status == "placeorder")
                    {
                        await _userService.CreateOrder(displayid, addressid);
                    }
                    OrderDetails _orderdata = await _userService.GetOrderDetails(displayid);

                    if (_orderdata == null)
                    {
                        _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                    }
                    else
                    {
                        _outputdata.responsedata = _orderdata;
                    }
                }
                else
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }
        [HttpGet("CartDetails")]
        public async Task<ActionResult<ApiResponse>> CartDetails(string displayid)
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                if (!string.IsNullOrWhiteSpace(displayid))
                {
                    CartDetails _cartdata = await _userService.GetCartDetails(displayid);
                    //List<Quote>? _cartdata = await _userService.GetActiveQuote(displayid);

                    if (_cartdata == null)
                    {
                        _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                    }
                    else
                    {
                        _outputdata.responsedata = _cartdata;
                    }
                }
                else
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpPut("UpdateCartItem")]
        public async Task<ActionResult<ApiResponse>> UpdateCartItem(int linerid, int qty)
        {

            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(Convert.ToString(linerid)) && !string.IsNullOrWhiteSpace(Convert.ToString(qty)))
                {
                    await _userService.UpdateItemQty(linerid, qty);
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok; _outputdata.message = HttpStatusMessages.Ok;

                }
                else
                {
                    _outputdata.code = HttpCode.BadRequest; _outputdata.status = HttpStatus.BadRequest; _outputdata.message = HttpStatusMessages.UpsetInventory_BadRequest;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }
            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpGet("GetMyAddresses")]
        public async Task<ActionResult<ApiResponse>> GetAddress(string displayid)
        {

            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<clsAddress>? _orderdata = await _userService.GetAddress(displayid);

                if (_orderdata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _orderdata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);

        }

        [HttpPost("UpsetAddress")]
        public async Task<ActionResult<ApiResponse>> UpsetAddress([FromBody] SetAddress setAddrs)
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(setAddrs.mode))
                {
                    await _userService.UpsetAddress(setAddrs);
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok; _outputdata.message = HttpStatusMessages.Ok;

                }
                else
                {
                    _outputdata.code = HttpCode.BadRequest; _outputdata.status = HttpStatus.BadRequest; _outputdata.message = HttpStatusMessages.CartItemAdd_BadRequest;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }
            return StatusCode(_outputdata.code, _outputdata);
        } 
       

        [HttpGet("GetUserAddress")]
        public async Task<ActionResult<ApiResponse>> GetUserAddress(string mode, int recordid = -999)
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                if (mode == "addnew")
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;

                }
                else
                {
                    SetAddress _userdata = await _userService.GetUserAddress(recordid);

                    if (_userdata == null)
                    {
                        _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                    }
                    else
                    {
                        _outputdata.responsedata = _userdata;
                    }
                }

            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }



        [HttpPut("ChangeAddress")]
        public async Task<ActionResult<ApiResponse>> ChangeAddress(string displayid, int recordid)
        {

            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(displayid) && !string.IsNullOrWhiteSpace(Convert.ToString(recordid)))
                {
                    await _userService.UpdateDefaultAddress(displayid, recordid);
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok; _outputdata.message = HttpStatusMessages.Ok;

                }
                else
                {
                    _outputdata.code = HttpCode.BadRequest; _outputdata.status = HttpStatus.BadRequest; _outputdata.message = HttpStatusMessages.UpsetInventory_BadRequest;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }
            return StatusCode(_outputdata.code, _outputdata);
        }
        [HttpPost("UpdateProfile")]
        public async Task<ActionResult<ApiResponse>> UpdateProfile([FromForm] clsProfile setAddrs , [FromForm] IFormFile? file)
        {
            string filepath="";
            if (file != null)
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded.");

                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();

                if (!allowedExtensions.Contains(fileExtension))
                    return BadRequest("Invalid file type.");

                string frontendPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "frontend", "src", "assets", "UploadedImages", "Users");

                if (!Directory.Exists(frontendPath))
                {
                    Directory.CreateDirectory(frontendPath);
                }

                string originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
                string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
                string fileName = $"{originalFileName}_{timestamp}{fileExtension}";
                string filePath = Path.Combine(frontendPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                filepath = $"/assets/UploadedImages/Users/{fileName}";
            }

            ApiResponse _outputdata = new ApiResponse();
            try
            {

                if (!string.IsNullOrWhiteSpace(setAddrs.userdisplayid))
                {
                    if (file != null)
                    {
                        await _userService.UpdateProfile(setAddrs, filepath);
                        _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok; _outputdata.message = HttpStatusMessages.Ok; _outputdata.responsedata = filepath;
                    }
                    else
                    {
                        await _userService.UpdateProfile(setAddrs, setAddrs.profileImage);
                        _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok; _outputdata.message = HttpStatusMessages.Ok; _outputdata.responsedata = filepath;
                    }
                }
                else
                {
                    _outputdata.code = HttpCode.BadRequest; _outputdata.status = HttpStatus.BadRequest; _outputdata.message = HttpStatusMessages.CartItemAdd_BadRequest;
                }

            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }
            return StatusCode(_outputdata.code, _outputdata);

        }


        [HttpGet("Dashboard")]
        public async Task<ActionResult<ApiResponse>> Dashboard(string displayid)
        {

            ApiResponse _outputdata = new ApiResponse();

            try
            {
                Dashboard _orderdata = await _userService.GetDashboardDetails(displayid);
                //List<Order>? _orderdata = await _userService.GetMyOrders(displayid, keyword);

                if (_orderdata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _orderdata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);

        }
        [HttpGet("DeliveryAgentOrders")]
        public async Task<ActionResult<ApiResponse>> DeliveryAgentOrders(string displayid, string keyword = "", string code = "")
        {

            ApiResponse _outputdata = new ApiResponse();

            try
            {
                //MyOrders _orderdata = new MyOrders();
               MyOrders _orderdata = await _userService.GetDeliveryAgentOrders(displayid, keyword, code);

                if (_orderdata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _orderdata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);

        }
    }

}
