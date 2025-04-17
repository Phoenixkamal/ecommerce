namespace BAKERBAZZAR.API.Entities
{
    [Serializable]
    public partial class User
    {
        [Key]
        public int? RecordId { get; set; }
        public Guid? DisplayId { get; set; } = Guid.Empty;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? PhoneNo { get; set; }
        public bool? IsActive { get; set; } = false;
        public DateTime? ModifiedOn { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? Gender { get; set; }
        public string? ProfileImage { get; set; }
        public string? CustomerType { get; set; }
        public string? AccessToken { get; set; }
        public string? Role { get; set; }
        public string? RefreshToken { get; set; }
        public Guid? CartDisplayId { get; set; } = Guid.Empty;
        public int? DefaultAddressId { get; set; }
        public string? CustomerTypeDisplay { get; set; }        
    }
    [Serializable]
    public class Dashboard
    {
        public List<Category>? Category { get; set; }
        public List<clsOrders>? Orders { get; set; }        
        public List<clsQuoteLine>? Cart { get; set; }
        public int? ItemCount { get; set; }

    }
    [Serializable]
    public class clsProfile
    {

        [Key]
        public string? userdisplayid { get; set; }
        public string? name { get; set; }      
        public string? email { get; set; }
        public string? phoneno { get; set; }
        public string? password { get; set; }
        public string? profileImage { get; set; }
    }

    public class Roles
    {
        public int RecordId { get; set; }
        public int UserCount { get; set; }
        public string? Role { get; set; }
    }

}
