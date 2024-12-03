namespace BAKERBAZZAR.API.Entities
{
    [Serializable]
    public class ProductDetails
    {

        public Product? ProductDetail { get; set; }      
        public List<clsVarient>? Varients { get; set; }
    }
    [Serializable]
    public class Product
    {
        [Key]
        public int RecordId { get; set; }
        public Guid? DisplayId { get; set; } = Guid.Empty;
        public string? Supplier { get; set; }
        public string? Category { get; set; }
        public string? ProductId { get; set; }
        public string? ProductName { get; set; }
        public string? InEnglish { get; set; }
        public string? InTamil { get; set; }
        public double MRP { get; set; }
        public double PurchasePrice { get; set; }
        public string? Tax { get; set; }
        public double NetPurchasePrice { get; set; }
        public double PurchasePercentage { get; set; }
        public double NetPurchasePercentage { get; set; }
        public string? HSNSAC { get; set; }
        public double SellingProfitPercentage { get; set; }
        public double SellingPrice { get; set; }
        public double SellingPercentage { get; set; }
        public double ClassicProfitPercentage { get; set; }
        public double ClassicPrice { get; set; }
        public double ClassicPercentage { get; set; }
        public int QuantityPerBox { get; set; }
        public double RetailPrice { get; set; }
        public string? Unit { get; set; }
        public int MinimumOrderQuantity { get; set; }
        public int InitialStock { get; set; }
        public int BulkQuantity { get; set; }
        public double BulkQuantityPrice { get; set; }
        public bool EnableBarCodeSticker { get; set; }
        public string? ProductImagePath { get; set; }

        //public List<clsVarient>? Varients { get; set; }
    }
    [Serializable]
    public class clsVarient
    {

        [Key]
        public int RecordId { get; set; }
        public int Varient { get; set; }
        public string? Unit { get; set; }
        public double? SellingPrice { get; set; }     
    }
}
