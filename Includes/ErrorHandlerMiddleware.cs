namespace BAKERBAZZAR.API.Includes
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception error)
            {
                var response = httpContext.Response;
                response.ContentType = "application/json";

                ApiResponse output = new ApiResponse();
                output.code = 417;
                output.status = "Expectation Failed";
                output.message = error.Message;
                output.responsedata = null;

                await response.WriteAsync(output.ToJson());
            }
        }
    }
}
