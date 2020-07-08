using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SoftwareEstimation.Migrations
{
    public partial class editentitysignificant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserID",
                table: "AppProjects");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "AppPlans");

            migrationBuilder.AddColumn<bool>(
                name: "isEvaluated",
                table: "AppPlans",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "UCPoints",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    PlanId = table.Column<string>(nullable: true),
                    u0 = table.Column<int>(nullable: false),
                    u1 = table.Column<int>(nullable: false),
                    u2 = table.Column<int>(nullable: false),
                    u3 = table.Column<int>(nullable: false),
                    u4 = table.Column<int>(nullable: false),
                    u5 = table.Column<int>(nullable: false),
                    t0 = table.Column<int>(nullable: false),
                    t1 = table.Column<int>(nullable: false),
                    t2 = table.Column<int>(nullable: false),
                    t3 = table.Column<int>(nullable: false),
                    t4 = table.Column<int>(nullable: false),
                    t5 = table.Column<int>(nullable: false),
                    t6 = table.Column<int>(nullable: false),
                    t7 = table.Column<int>(nullable: false),
                    t8 = table.Column<int>(nullable: false),
                    t9 = table.Column<int>(nullable: false),
                    t10 = table.Column<int>(nullable: false),
                    t11 = table.Column<int>(nullable: false),
                    t12 = table.Column<int>(nullable: false),
                    e0 = table.Column<int>(nullable: false),
                    e1 = table.Column<int>(nullable: false),
                    e2 = table.Column<int>(nullable: false),
                    e3 = table.Column<int>(nullable: false),
                    e4 = table.Column<int>(nullable: false),
                    e5 = table.Column<int>(nullable: false),
                    e6 = table.Column<int>(nullable: false),
                    e7 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UCPoints", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UCPoints");

            migrationBuilder.DropColumn(
                name: "isEvaluated",
                table: "AppPlans");

            migrationBuilder.AddColumn<long>(
                name: "UserID",
                table: "AppProjects",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "UserID",
                table: "AppPlans",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
