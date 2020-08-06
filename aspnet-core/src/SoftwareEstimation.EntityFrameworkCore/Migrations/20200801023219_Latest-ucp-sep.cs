using Microsoft.EntityFrameworkCore.Migrations;

namespace SoftwareEstimation.Migrations
{
    public partial class Latestucpsep : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SepLatestId",
                table: "AppPlans",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UcpLatestId",
                table: "AppPlans",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppPlans_SepLatestId",
                table: "AppPlans",
                column: "SepLatestId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPlans_UcpLatestId",
                table: "AppPlans",
                column: "UcpLatestId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPlans_SEPoints_SepLatestId",
                table: "AppPlans",
                column: "SepLatestId",
                principalTable: "SEPoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppPlans_UCPoints_UcpLatestId",
                table: "AppPlans",
                column: "UcpLatestId",
                principalTable: "UCPoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppPlans_SEPoints_SepLatestId",
                table: "AppPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPlans_UCPoints_UcpLatestId",
                table: "AppPlans");

            migrationBuilder.DropIndex(
                name: "IX_AppPlans_SepLatestId",
                table: "AppPlans");

            migrationBuilder.DropIndex(
                name: "IX_AppPlans_UcpLatestId",
                table: "AppPlans");

            migrationBuilder.DropColumn(
                name: "SepLatestId",
                table: "AppPlans");

            migrationBuilder.DropColumn(
                name: "UcpLatestId",
                table: "AppPlans");
        }
    }
}
