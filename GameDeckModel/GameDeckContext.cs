using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace GameDeckModel;

public partial class GameDeckContext : IdentityDbContext<GameDeckUsers>
{
    public GameDeckContext()
    {
    }

    public GameDeckContext(DbContextOptions<GameDeckContext> options)
        : base(options)
    {
    }

    public virtual DbSet<GameConsole> GameConsoles { get; set; }

    public virtual DbSet<Game> Games { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        IConfigurationBuilder configurationBuilder = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json").AddJsonFile("appsettings.Development.json", optional: true);
        IConfiguration configuration = configurationBuilder.Build();
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasOne(d => d.Platform).WithMany(p => p.Games)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Game_Console");
        });

        SeedData(modelBuilder);

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    private void SeedData(ModelBuilder modelBuilder)
    {
        // Hardcoded GameConsole data
        modelBuilder.Entity<GameConsole>().HasData(
            new GameConsole { Id = 1, Manufacturer = "Nintendo", Name = "Switch", ReleaseYear = 2017 },
            new GameConsole { Id = 2, Manufacturer = "Sony", Name = "PlayStation 5", ReleaseYear = 2020 },
            new GameConsole { Id = 3, Manufacturer = "Microsoft", Name = "Xbox Series X", ReleaseYear = 2020 },
            new GameConsole { Id = 4, Manufacturer = "Nintendo", Name = "64", ReleaseYear = 1996 },
            new GameConsole { Id = 5, Manufacturer = "Sony", Name = "PlayStation 4", ReleaseYear = 2013 },
            new GameConsole { Id = 6, Manufacturer = "Nintendo", Name = "Wii", ReleaseYear = 2006 },
            new GameConsole { Id = 7, Manufacturer = "Nintendo", Name = "GameCube", ReleaseYear = 2001 },
            new GameConsole { Id = 8, Manufacturer = "Sony", Name = "PlayStation 2", ReleaseYear = 2000 },
            new GameConsole { Id = 9, Manufacturer = "Microsoft", Name = "Xbox One", ReleaseYear = 2013 },
            new GameConsole { Id = 10, Manufacturer = "Sega", Name = "Genesis", ReleaseYear = 1988 }
        );

        // Hardcoded Game data
        modelBuilder.Entity<Game>().HasData(
            new Game 
            { 
                Id = 1, PlatformId = 1, Title = "The Legend of Zelda: Breath of the Wild", 
                ReleaseDate = new DateTime(2017, 3, 3), Genre = "Action-Adventure", 
                Developer = "Nintendo", Description = "Open-world adventure game set in Hyrule", NumPlayers = 1 
            },
            new Game 
            { 
                Id = 2, PlatformId = 2, Title = "God of War Ragnarök", 
                ReleaseDate = new DateTime(2022, 11, 9), Genre = "Action", 
                Developer = "Santa Monica Studio", Description = "Epic Norse mythology adventure", NumPlayers = 1 
            },
            new Game 
            { 
                Id = 3, PlatformId = 1, Title = "Super Mario Odyssey", 
                ReleaseDate = new DateTime(2017, 10, 27), Genre = "Platformer", 
                Developer = "Nintendo", Description = "3D platforming adventure with Cappy", NumPlayers = 2 
            },
            new Game 
            { 
                Id = 4, PlatformId = 3, Title = "Halo Infinite", 
                ReleaseDate = new DateTime(2021, 12, 8), Genre = "First-Person Shooter", 
                Developer = "343 Industries", Description = "Master Chief's latest adventure", NumPlayers = 4 
            },
            new Game 
            { 
                Id = 5, PlatformId = 4, Title = "Super Mario 64", 
                ReleaseDate = new DateTime(1996, 6, 23), Genre = "Platformer", 
                Developer = "Nintendo", Description = "Revolutionary 3D platformer", NumPlayers = 1 
            },
            new Game 
            { 
                Id = 6, PlatformId = 2, Title = "The Last of Us Part II", 
                ReleaseDate = new DateTime(2020, 6, 19), Genre = "Action-Adventure", 
                Developer = "Naughty Dog", Description = "Emotional story-driven experience", NumPlayers = 1 
            },
            new Game
            {
                Id = 7, PlatformId = 6, Title = "Wii Sports",
                ReleaseDate = new DateTime(2006, 11, 19), Genre = "Sports",
                Developer = "Nintendo", Description = "Motion-controlled sports collection.", NumPlayers = 4
            },
            new Game
            {
                Id = 8, PlatformId = 7, Title = "Super Smash Bros. Melee",
                ReleaseDate = new DateTime(2001, 11, 21), Genre = "Fighting",
                Developer = "HAL Laboratory", Description = "Fast-paced crossover party fighter.", NumPlayers = 4
            },
            new Game
            {
                Id = 9, PlatformId = 8, Title = "Shadow of the Colossus",
                ReleaseDate = new DateTime(2005, 10, 18), Genre = "Action-Adventure",
                Developer = "Team Ico", Description = "A minimalist adventure of giant colossi.", NumPlayers = 1
            },
            new Game
            {
                Id = 10, PlatformId = 9, Title = "Forza Horizon 4",
                ReleaseDate = new DateTime(2018, 10, 2), Genre = "Racing",
                Developer = "Playground Games", Description = "Open-world racing across seasonal Britain.", NumPlayers = 12
            },
            new Game
            {
                Id = 11, PlatformId = 10, Title = "Sonic the Hedgehog",
                ReleaseDate = new DateTime(1991, 6, 23), Genre = "Platformer",
                Developer = "Sega", Description = "Classic high-speed platformer.", NumPlayers = 1
            },
            new Game
            {
                Id = 12, PlatformId = 5, Title = "Bloodborne",
                ReleaseDate = new DateTime(2015, 3, 24), Genre = "Action RPG",
                Developer = "FromSoftware", Description = "Gothic action RPG set in the city of Yharnam.", NumPlayers = 2
            }
        );
    }
}

