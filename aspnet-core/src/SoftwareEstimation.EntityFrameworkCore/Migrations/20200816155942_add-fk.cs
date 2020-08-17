using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SoftwareEstimation.Migrations
{
    public partial class addfk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "SEPoints",
                nullable: true,
                defaultValue: null);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "AppProjects",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TenantId",
                table: "AppPlans",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SEPoints_ProjectId",
                table: "SEPoints",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_SEPoints_AppProjects_ProjectId",
                table: "SEPoints",
                column: "ProjectId",
                principalTable: "AppProjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SEPoints_AppProjects_ProjectId",
                table: "SEPoints");

            migrationBuilder.DropIndex(
                name: "IX_SEPoints_ProjectId",
                table: "SEPoints");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "SEPoints");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "AppProjects");

            migrationBuilder.DropColumn(
                name: "TenantId",
                table: "AppPlans");
        }
    }
}
