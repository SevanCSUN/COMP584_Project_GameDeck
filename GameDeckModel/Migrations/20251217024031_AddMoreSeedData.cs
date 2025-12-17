using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace GameDeckModel.Migrations
{
    /// <inheritdoc />
    public partial class AddMoreSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Game",
                keyColumn: "id",
                keyValue: 1,
                column: "developer",
                value: "Nintendo");

            migrationBuilder.UpdateData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 1,
                column: "name",
                value: "Switch");

            migrationBuilder.UpdateData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 4,
                column: "name",
                value: "64");

            migrationBuilder.InsertData(
                table: "GameConsole",
                columns: new[] { "id", "manufacturer", "name", "release_year" },
                values: new object[,]
                {
                    { 6, "Nintendo", "Wii", 2006 },
                    { 7, "Nintendo", "GameCube", 2001 },
                    { 8, "Sony", "PlayStation 2", 2000 },
                    { 9, "Microsoft", "Xbox One", 2013 },
                    { 10, "Sega", "Genesis", 1988 }
                });

            migrationBuilder.InsertData(
                table: "Game",
                columns: new[] { "id", "description", "developer", "genre", "num_players", "platform_id", "release_date", "title" },
                values: new object[,]
                {
                    { 7, "Motion-controlled sports collection.", "Nintendo", "Sports", 4, 6, new DateTime(2006, 11, 19, 0, 0, 0, 0, DateTimeKind.Unspecified), "Wii Sports" },
                    { 8, "Fast-paced crossover party fighter.", "HAL Laboratory", "Fighting", 4, 7, new DateTime(2001, 11, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), "Super Smash Bros. Melee" },
                    { 9, "A minimalist adventure of giant colossi.", "Team Ico", "Action-Adventure", 1, 8, new DateTime(2005, 10, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), "Shadow of the Colossus" },
                    { 10, "Open-world racing across seasonal Britain.", "Playground Games", "Racing", 12, 9, new DateTime(2018, 10, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Forza Horizon 4" },
                    { 11, "Classic high-speed platformer.", "Sega", "Platform", 1, 10, new DateTime(1991, 6, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), "Sonic the Hedgehog" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Game",
                keyColumn: "id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 10);

            migrationBuilder.UpdateData(
                table: "Game",
                keyColumn: "id",
                keyValue: 1,
                column: "developer",
                value: "Nintendo EPD");

            migrationBuilder.UpdateData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 1,
                column: "name",
                value: "Nintendo Switch");

            migrationBuilder.UpdateData(
                table: "GameConsole",
                keyColumn: "id",
                keyValue: 4,
                column: "name",
                value: "Nintendo 64");
        }
    }
}
