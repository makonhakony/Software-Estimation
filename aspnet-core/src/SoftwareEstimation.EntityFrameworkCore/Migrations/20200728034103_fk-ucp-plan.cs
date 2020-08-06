using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SoftwareEstimation.Migrations
{
    public partial class fkucpplan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PlanId",
                table: "UCPoints",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_UCPoints_PlanId",
                table: "UCPoints",
                column: "PlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_UCPoints_AppPlans_PlanId",
                table: "UCPoints",
                column: "PlanId",
                principalTable: "AppPlans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UCPoints_AppPlans_PlanId",
                table: "UCPoints");

            migrationBuilder.DropIndex(
                name: "IX_UCPoints_PlanId",
                table: "UCPoints");

            migrationBuilder.DropColumn(
                name: "PlanId",
                table: "UCPoints");
        }
    }
}
