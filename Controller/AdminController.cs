using BAKERBAZZAR.API.Entities;
using BAKERBAZZAR.API.Models.IO_Templates;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace BAKERBAZZAR.API.Controller
{
    [Route("[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly ILogger<AdminController> _logger;
        public AdminController(IAdminService adminService, ILogger<AdminController> logger)
        {
            _adminService = adminService;
            _logger = logger;
        }

        //[HttpGet("Orders")]
        //public async Task<ActionResult<ApiResponse>> Orders()
        //{
        //    ApiResponse _outputdata = new ApiResponse();

        //    return StatusCode(_outputdata.code, _outputdata);
        //}


        [HttpGet("GetEditCategory")]
        public async Task<ActionResult<ApiResponse>> GetCategoryById(string mode, int recordid = -999)
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
                    Category _userdata = await _adminService.GetCategoryById(recordid);

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
        [HttpGet("GetCategoryByWarehouse")]
        public async Task<ActionResult<ApiResponse>> GetCategoryByWarehouseId(int warehouseid)
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                    List<Category>? _userdata = await _adminService.GetCategoryByWarehouseId(warehouseid);

                    if (_userdata == null)
                    {
                        _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                    }
                    else
                    {
                        _outputdata.responsedata = _userdata;
                    }

            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }   
        
        [HttpGet("GetProductsByCridWrid")]
        public async Task<ActionResult<ApiResponse>> GetProductsByCridWrid(int categoryrid,int warhouserid)
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                    List<Product>? _userdata = await _adminService.GetProductsByCridWrid(categoryrid,warhouserid);

                    if (_userdata == null)
                    {
                        _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                    }
                    else
                    {
                        _outputdata.responsedata = _userdata;
                    }

            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpPost("CategoryImageUpload")]
        public IActionResult Upload([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(fileExtension))
                return BadRequest("Invalid file type.");

            string frontendPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "frontend", "src", "assets", "UploadedImages", "Products", "Category");

            if (!Directory.Exists(frontendPath))
            {
                Directory.CreateDirectory(frontendPath);
            }

            string originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
            string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
            string fileName = $"{originalFileName}_{timestamp}{fileExtension}";

            string filePath = Path.Combine(frontendPath, fileName);

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                string fileUrl = $"../UploadedImages/Products/Category/{fileName}";
                return Ok(new { path = fileUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost("ProductImageUpload")]
        public IActionResult ProductImageUpload([FromForm] IFormFile file, [FromForm] string categoryName)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();

            if (!allowedExtensions.Contains(fileExtension))
                return BadRequest("Invalid file type.");

            string frontendPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "frontend", "src", "assets", "UploadedImages", "Products", "Category", categoryName);

            if (!Directory.Exists(frontendPath))
            {
                Directory.CreateDirectory(frontendPath);
            }

            string originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
            string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
            string fileName = $"{originalFileName}_{timestamp}{fileExtension}";

            string filePath = Path.Combine(frontendPath, fileName);

            try
            {
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                string fileUrl = $"../UploadedImages/Products/Category/{categoryName}/{fileName}";
                return Ok(new { path = fileUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult<ApiResponse>> UserById(string displayId = "")
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<SetUser>? _userdata = await _adminService.GetUser(displayId);

                if (_userdata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _userdata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpPost("UpsetProduct")]
        public async Task<ActionResult<ApiResponse>> UpsetProduct([FromBody] Product product)
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(product.mode))
                {
                    await _adminService.UpsetProduct(product);
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

        [HttpGet("Units")]
        public async Task<ActionResult<ApiResponse>> Units()
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<Units>? _categorydata = await _adminService.GetUnits();

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

        [HttpGet("Warehouse")]
        public async Task<ActionResult<ApiResponse>> Warehouse(string keyword = "")
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<clsWarehouse>? _warehousedata = await _adminService.GetWarehouse();

                if (_warehousedata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _warehousedata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }
        [HttpGet("Roles")]
        public async Task<ActionResult<ApiResponse>> Roles()
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<Roles>? _roles = await _adminService.GetRoles   ();

                if (_roles == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _roles;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }

        [HttpPost("UpdateProduct")]
        public async Task<ActionResult<ApiResponse>> UpdateProduct([FromBody] ProductDetails setAddrs)
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(setAddrs.ProductDetail.ProductId))
                {
                    await _adminService.UpdateProduct(setAddrs);
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

        [HttpPost("UpsetCategory")]
        public async Task<ActionResult<ApiResponse>> UpsetCategory([FromBody] EditCategory setAddrs)
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(setAddrs.mode))
                {
                    await _adminService.UpsetCategory(setAddrs);
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

        [HttpGet("Inventory")]
        public async Task<ActionResult<ApiResponse>> Inventory(string categoryid = "", string keyword = "")
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<Product>? _categorydata = await _adminService.GetProduct(categoryid, keyword);

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

        //[HttpPost("AddItemToInventory")]
        [HttpPost("UpsetInventoryItem")]
        public async Task<ActionResult<ApiResponse>> UpsetInventoryItem([FromBody] InventoryItemRequest inventoryReq)
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(inventoryReq.mode))
                {
                    await _adminService.UpsetInventoryItem(inventoryReq);
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok;
                    if (inventoryReq.mode == "addnew")
                    {
                        _outputdata.message = HttpStatusMessages.CartItemAdd_Ok;
                    }
                    else
                    {
                        _outputdata.message = HttpStatusMessages.ItemUpdate_Ok;
                    }
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

        //[HttpPut("UpdateInventoryItemDetails")]
        //public async Task<ActionResult<ApiResponse>> UpdateInventoryItemDetails([FromBody] InventoryItemRequest inventoryItemRequest)
        //{
        //    ApiResponse _outputdata = new ApiResponse();

        //    return StatusCode(_outputdata.code, _outputdata);
        //}

        [HttpDelete("DeleteInventoryItem")]
        public async Task<ActionResult<ApiResponse>> DeleteInventoryItem(string itemdispalyid = "")
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(itemdispalyid))
                {
                    await _adminService.DeleteInventoryItem(itemdispalyid);
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

            return StatusCode(_outputdata.code, _outputdata);
        }
        //[HttpPut("SetUser")]
        //public async Task<ActionResult<ApiResponse>> SetUser([FromBody] SetUser setUser)
        //{
        //    ApiResponse _outputdata = new ApiResponse();
        //    try
        //    {
        //        if (!string.IsNullOrWhiteSpace(setUser.Mode))
        //        {
        //            await _adminService.UpsetUser(setUser);
        //            _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.Ok; _outputdata.message = HttpStatusMessages.Ok;

        //        }
        //        else
        //        {
        //            _outputdata.code = HttpCode.BadRequest; _outputdata.status = HttpStatus.BadRequest; _outputdata.message = HttpStatusMessages.CartItemAdd_BadRequest;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
        //    }
        //    return StatusCode(_outputdata.code, _outputdata);
        //}
        [HttpPost("UpsetUser")]
        public async Task<ActionResult<ApiResponse>> UpdateUser([FromBody] SetUser setUser)
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(setUser.Mode))
                {
                    await _adminService.UpsetUser(setUser);
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

        [HttpGet("UserList")]
        public async Task<ActionResult<ApiResponse>> UserList(string keyword = "",int role=0)
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<User>? _userdata = await _adminService.GetUserList(keyword,role);

                if (_userdata == null)
                {
                    _outputdata.code = HttpCode.Ok; _outputdata.status = HttpStatus.NotFound; _outputdata.message = HttpStatusMessages.Result_Notfound;
                }
                else
                {
                    _outputdata.responsedata = _userdata;
                }
            }
            catch (Exception ex)
            {
                _outputdata.code = HttpCode.ExpectationFailed; _outputdata.status = HttpStatus.ExpectationFailed; _outputdata.message = ex.Message;
            }

            return StatusCode(_outputdata.code, _outputdata);
        }
        [HttpGet("UserDetails")]
        public async Task<ActionResult<ApiResponse>> UserDetails(string mode = "", string displayid = "")
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
                    User? _userdata = await _adminService.GetUserDetails(displayid);

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

        [HttpDelete("DeleteUser")]
        public async Task<ActionResult<ApiResponse>> DeleteUser(string itemdispalyid = "")
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(itemdispalyid))
                {
                    await _adminService.DeleteUser(itemdispalyid);
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

            return StatusCode(_outputdata.code, _outputdata);
        }
        [HttpPost("OrderTracking")]
        public async Task<ActionResult<ApiResponse>> OrderTracking(int orderid, string trackingcode, string lastupdatedby = "")
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(trackingcode) && !string.IsNullOrWhiteSpace(Convert.ToString(orderid)))
                {
                    await _adminService.UpsetOrderStatus(orderid, trackingcode, lastupdatedby);
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

            return StatusCode(_outputdata.code, _outputdata);
        }
        [HttpPost("AssignWarehouse")]
        public async Task<ActionResult<ApiResponse>> AssignWarehouse(int orderid, int warehouseid)
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(Convert.ToString(orderid)) && !string.IsNullOrWhiteSpace(Convert.ToString(warehouseid)))
                {
                    await _adminService.SetWarehouse(orderid, warehouseid);
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

            return StatusCode(_outputdata.code, _outputdata);
        }
        [HttpPost("AssignDeliveryAgent")]
        public async Task<ActionResult<ApiResponse>> AssignDeliveryAgent(int orderid, int agentrid)
        {
            ApiResponse _outputdata = new ApiResponse();
            try
            {
                if (!string.IsNullOrWhiteSpace(Convert.ToString(orderid)) && !string.IsNullOrWhiteSpace(Convert.ToString(agentrid)))
                {
                    await _adminService.SetDeliveryAgent(orderid, agentrid);
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

            return StatusCode(_outputdata.code, _outputdata);
        }
    }
}
