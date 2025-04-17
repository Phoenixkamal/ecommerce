namespace BAKERBAZZAR.API.Models.IO_Templates
{
    [Serializable]
    public class SetAddress
    {        
        public string? mode { get; set; }
        public Guid? displayid { get; set; } = Guid.Empty;
        public int recordid { get; set; }
        public string? name { get; set; }
        public string? phoneno { get; set; }
        public string? address1 { get; set; }
        public string? address2 { get; set; }
        public string? address3 { get; set; }
        public string? city { get; set; }
        public string? state { get; set; }
        public string? zipcode { get; set; }
        public string? type { get; set; }
   
}
    public class EditCategory
    {
        public string mode { get; set; }
        public int? RecordId { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryImage { get; set; }
        //public DateTime? LastModified { get; set; }
    }
}
