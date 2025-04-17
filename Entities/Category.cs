namespace BAKERBAZZAR.API.Entities
{
    [Serializable]
    public partial class Category
    {
        [Key]
        public int? RecordId { get; set; }
        public int? CategoryRId { get; set; }
        public int? WarehouseRid { get; set; }
        public Guid? DisplayId { get; set; } = Guid.Empty;
        public string? CategoryCode { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public string? CategoryImage { get; set; }
        public int? ItemCount { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? LastModified { get; set; }
    }

    public class Units
    {
        public string[]? units { get; set; }
    }

}
