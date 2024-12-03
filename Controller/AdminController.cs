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
        public async Task<ActionResult<ApiResponse>> UserList(string keyword = "")
        {
            ApiResponse _outputdata = new ApiResponse();

            try
            {
                List<User>? _userdata = await _adminService.GetUserList(keyword);

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
