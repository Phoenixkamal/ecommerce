namespace BAKERBAZZAR.API.Models.IO_Templates
{
    public class InventoryItemRequest
    {
        public string? mode { get; set; }
        public string? supplier { get; set; }
        public int? categoryrid { get; set; }
        public string? productid { get; set; }
        public string? productname { get; set; }
        public string? printenglish { get; set; }
        public string? printtamil { get; set; }
        public double mrp { get; set; }
        public double purchaseprice { get; set; }
        public string? tax { get; set; }
        public double netpurchaseprice { get; set; }
        public double purchasepercentage { get; set; }
        public double netpurchaseperc { get; set; }
        public string? hsnsac { get; set; }
        public double sellingprofitperc { get; set; }
        public double sellingprice { get; set; }
        public double sellingperc { get; set; }
        public double classicprofitperc { get; set; }
        public double classicprice { get; set; }
        public double classicperc { get; set; }
        public int quantityperbox { get; set; }
        public double retailprice { get; set; }
        public string? unit { get; set; }
        public int mnmorderqty { get; set; }
        public int initialstock { get; set; }
        public int bulkqty { get; set; }
        public double bulkqtyprice { get; set; }
        public bool enablebarcode { get; set; }
    }
}
