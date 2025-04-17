namespace BAKERBAZZAR.API.Models.IO_Templates
{
    [Serializable]
    public class SetUser
    {
        [Key]
        public string? Mode { get; set; }
        public int? RecordId { get; set; }
        public Guid? DisplayId { get; set; } = Guid.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? PhoneNo { get; set; }
        public int RoleId { get; set; }
        public string? Gender { get; set; }        
        public string? Role { get; set; }        
        public string? CustomerType { get; set; }
        public string? profileImage { get; set; }
        
    }
}
