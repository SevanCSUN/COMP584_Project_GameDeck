using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GameDeckModel.Migrations
{
    /// <inheritdoc />
    public partial class FixSeedGenresAndEnsureConsoleGames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Game",
                keyColumn: "id",
                keyValue: 3,
                column: "genre",
                value: "Platformer");

            migrationBuilder.UpdateData(
                table: "Game",
                keyColumn: "id",
                keyValue: 5,
                column: "genre",
                value: "Platformer");

            migrationBuilder.UpdateData(
                table: "Game",
                keyColumn: "id",
                keyValue: 11,
                column: "genre",
                value: "Platformer");

            migrationBuilder.InsertData(
                table: "Game",
                columns: new[] { "id", "description", "developer", "genre", "num_players", "platform_id", "release_date", "title" },
                values: new object[] { 12, "Gothic action RPG set in the city of Yharnam.", "FromSoftware", "Action RPG", 2, 5, new DateTime(2015, 3, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "Bloodborne" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "id",
                keyValue: 12);

            migrationBuilder.UpdateData(
                table: "Game",
                keyColumn: "id",
                keyValue: 3,
                column: "genre",
                value: "Platform");

            migrationBuilder.UpdateData(
                table: "Game",
                keyColumn: "id",
                keyValue: 5,
                column: "genre",
                value: "Platform");

            migrationBuilder.UpdateData(
                table: "Game",
                keyColumn: "id",
                keyValue: 11,
                column: "genre",
                value: "Platform");
        }
    }
}
