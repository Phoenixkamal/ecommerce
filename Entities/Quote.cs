namespace BAKERBAZZAR.API.Entities
{
    [Serializable]
    public class CartDetails
    {
        public Quote? Header { get; set; }
        public List<clsQuoteLine>? Lines { get; set; }
        public clsAddress? Address { get; set; }

    }    

    [Serializable]
    public class Quote
    {
        [Key]
        public int? RecordId { get; set; }
        public string? QuoteNo { get; set; }
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
    }

    [Serializable]
    public class clsQuoteLine
    {
        [Key]
        public int? RecordId { get; set; }
        public int? QuoteHeaderId { get; set; }
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

    
}
