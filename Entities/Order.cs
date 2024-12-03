namespace BAKERBAZZAR.API.Entities
{
    [Serializable]
    public class OrderDetails
    {
        public Order? Header { get; set; }
        public List<clsOrderLine>? Lines { get; set; }
        public clsAddress? Address { get; set; }
        public List<clsStatus>? Status { get; set; }
        public List<clsWarehouse>? Warehouse { get; set; }
        public List<User>? Deliveryagents { get; set; }

    }
    [Serializable]
    public class MyOrders
    {
        public List<clsOrders>? Header { get; set; }        

    }
    [Serializable]
    public class Order
    {
        [Key]
        public int? RecordId { get; set; }
        public string? OrderNo { get; set; }
        public Guid? SessionId { get; set; } = Guid.Empty;
        public int? ShipToId { get; set; }
        public int? BillToId { get; set; }
        public string? ContactName { get; set; }
        public string? ContactNo { get; set; }
        public string? ContactEmail { get; set; }
        public double SubTotal { get; set; }
        public double Discount { get; set; }
        public double TaxAmount { get; set; }
        public double RecycleFee { get; set; }
        public double Shipping { get; set; }
        public double Total { get; set; }
        public string? Status { get; set; }
        public string? PaymentMethod { get; set; }
        public string? PaymentStatus { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? LastModified { get; set; }
        public string? ExpectedDeliveryDate { get; set; }
        public string? PlacedOn { get; set; }
    }

    [Serializable]
    public class clsOrderLine
    {
        [Key]
        public int? RecordId { get; set; }
        public int? OrderHeaderId { get; set; }
        public string? SessionId { get; set; }
        public string? Supplier { get; set; }
        public string? Category { get; set; }
        public string? ProductId { get; set; }
        public int? Qty { get; set; }
        public string? ProductName { get; set; }
        public double Price { get; set; }
        public double ExtPrice { get; set; }
        public string? InEnglish { get; set; }
        public string? InTamil { get; set; }
        public double MRP { get; set; }
        public double PurchasePrice { get; set; }
        public int Tax { get; set; }
        public double NetPurchasePrice { get; set; }
        public int PurchasePercentage { get; set; }
        public int NetPurchasePercentage { get; set; }
        public string? HSNSAC { get; set; }
        public int SellingProfitPercentage { get; set; }
        public double SellingPrice { get; set; }
        public int? SellingPercentage { get; set; }
        public int? ClassicProfitPercentage { get; set; }
        public double ClassicPrice { get; set; }
        public int? ClassicPercentage { get; set; }
        public int? QuantityPerBox { get; set; }
        public double RetailPrice { get; set; }
        public string? Unit { get; set; }
        public int? MinimumOrderQuantity { get; set; }
        public int? InitialStock { get; set; }
        public int? BulkQuantity { get; set; }
        public double BulkQuantityPrice { get; set; }
        public bool EnableBarCodeSticker { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastModified { get; set; }
        public string? ProductImagePath { get; set; }
        
    }
    [Serializable]
    public class clsAddress
    {

        [Key]       
        public int? RecordId { get; set; }
        public string? Username { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zipcode { get; set; }
        public string? Country { get; set; }
        public string? Email { get; set; }
        public string? PhoneNo { get; set; }
        public int? DefaultAddressId { get; set; }
        

    }
    public class clsStatus
    {

        [Key]
        public int RecordId { get; set; }
        public int OrderId { get; set; }
        public bool InProcess { get; set; }
        public bool Shipped { get; set; }
        public bool Delivered { get; set; }
        public string? LastUpdatedBy { get; set; }
        public string? TrackingCode { get; set; }
        public string? TrackingName { get; set; }
        public string? Description { get; set; }
        public int SortOrderId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastModified { get; set; }
        public string? StatusStyle { get; set; }
        public string? TimeLine  { get; set; }
        public string? StatusIcon { get; set; }
        public string? ExpectedOn { get; set; }
    }
    public class clsOrders
    {
        [Key]
        public int? RecordId { get; set; }
        public string? OrderNo { get; set; }
        public Guid? SessionId { get; set; } = Guid.Empty;
        public int? ShipToId { get; set; }
        public int? BillToId { get; set; }
        public string? ContactName { get; set; }
        public string? ContactNo { get; set; }
        public string? ContactEmail { get; set; }
        public double SubTotal { get; set; }
        public double Discount { get; set; }
        public double TaxAmount { get; set; }
        public double RecycleFee { get; set; }
        public double Shipping { get; set; }
        public double Total { get; set; }
        public string? Status { get; set; }
        public string? PaymentMethod { get; set; }
        public string? PaymentStatus { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? LastModified { get; set; }             
        public string? Name { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zipcode { get; set; }
        public string? Country { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }

    public class clsWarehouse
    {
        public int RecordId { get; set; }
        public string? DisplayId { get; set; }
        public string? WarehouseCode { get; set; }
        public string? WarehouseName { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Zipcode { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime Modifiedon { get; set; }
    }
}
