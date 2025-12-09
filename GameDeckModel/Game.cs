using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace GameDeckModel;

[Table("Game")]
public partial class Game
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("platform_id")]
    public int PlatformId { get; set; }

    [Column("title")]
    [StringLength(200)]
    [Unicode(false)]
    public string Title { get; set; } = null!;

    [Column("release_date")]
    [DataType(DataType.Date)]
    public DateTime ReleaseDate { get; set; }

    [Column("genre")]
    [StringLength(50)]
    [Unicode(false)]
    public string Genre { get; set; } = null!;

    [Column("developer")]
    [StringLength(100)]
    [Unicode(false)]
    public string Developer { get; set; } = null!;

    [Column("description")]
    [StringLength(1000)]
    [Unicode(false)]
    public string Description { get; set; } = null!;

    [Column("num_players")]
    public int? NumPlayers { get; set; }

    [ForeignKey("PlatformId")]
    [InverseProperty("Games")]
    public virtual GameConsole Platform { get; set; } = null!;
}

