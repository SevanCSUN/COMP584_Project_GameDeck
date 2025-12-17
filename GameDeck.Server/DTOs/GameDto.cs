namespace GameDeck.Server.DTOs
{
    public class GameDto
    {
        public required int id { get; set; }
        public required int platformId { get; set; }
        public required string platformName { get; set; }
        public required string title { get; set; }
        public required DateTime releaseDate { get; set; }
        public required string genre { get; set; }
        public required string developer { get; set; }
        public required string description { get; set; }
        public int? numPlayers { get; set; }
    }
}


