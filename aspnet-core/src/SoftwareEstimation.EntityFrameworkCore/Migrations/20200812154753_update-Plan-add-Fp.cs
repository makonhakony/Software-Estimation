using Microsoft.EntityFrameworkCore.Migrations;

namespace SoftwareEstimation.Migrations
{
    public partial class updatePlanaddFp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FPoint",
                table: "AppPlans");

            migrationBuilder.AddColumn<int>(
                name: "FpLatestId",
                table: "AppPlans",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_FPoints_PlanId",
                table: "FPoints",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPlans_FpLatestId",
                table: "AppPlans",
                column: "FpLatestId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPlans_FPoints_FpLatestId",
                table: "AppPlans",
                column: "FpLatestId",
                principalTable: "FPoints",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FPoints_AppPlans_PlanId",
                table: "FPoints",
                column: "PlanId",
                principalTable: "AppPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppPlans_FPoints_FpLatestId",
                table: "AppPlans");

            migrationBuilder.DropForeignKey(
                name: "FK_FPoints_AppPlans_PlanId",
                table: "FPoints");

            migrationBuilder.DropIndex(
                name: "IX_FPoints_PlanId",
                table: "FPoints");

            migrationBuilder.DropIndex(
                name: "IX_AppPlans_FpLatestId",
                table: "AppPlans");

            migrationBuilder.DropColumn(
                name: "FpLatestId",
                table: "AppPlans");

            migrationBuilder.AddColumn<float>(
                name: "FPoint",
                table: "AppPlans",
                nullable: false,
                defaultValue: 0f);
        }
    }
}
