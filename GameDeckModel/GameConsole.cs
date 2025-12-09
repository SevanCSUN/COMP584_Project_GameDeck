using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameDeckModel;

[Table("GameConsole")]
public partial class GameConsole
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("manufacturer")]
    [StringLength(50)]
    [Unicode(false)]
    public string Manufacturer { get; set; } = null!;

    [Column("name")]
    [StringLength(100)]
    [Unicode(false)]
    public string Name { get; set; } = null!;

    [Column("release_year")]
    public int ReleaseYear { get; set; }

    [InverseProperty("Platform")]
    public virtual ICollection<Game> Games { get; set; } = new List<Game>();
}

