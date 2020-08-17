using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SoftwareEstimation.Migrations
{
    public partial class addFPoint : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FPoints",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    PlanId = table.Column<Guid>(nullable: false),
                    FP = table.Column<float>(nullable: false),
                    UFP = table.Column<float>(nullable: false),
                    CAF = table.Column<float>(nullable: false),
                    u11 = table.Column<int>(nullable: false),
                    u12 = table.Column<int>(nullable: false),
                    u13 = table.Column<int>(nullable: false),
                    u21 = table.Column<int>(nullable: false),
                    u22 = table.Column<int>(nullable: false),
                    u23 = table.Column<int>(nullable: false),
                    u31 = table.Column<int>(nullable: false),
                    u32 = table.Column<int>(nullable: false),
                    u33 = table.Column<int>(nullable: false),
                    u41 = table.Column<int>(nullable: false),
                    u42 = table.Column<int>(nullable: false),
                    u43 = table.Column<int>(nullable: false),
                    u51 = table.Column<int>(nullable: false),
                    u52 = table.Column<int>(nullable: false),
                    u53 = table.Column<int>(nullable: false),
                    c1 = table.Column<int>(nullable: false),
                    c2 = table.Column<int>(nullable: false),
                    c3 = table.Column<int>(nullable: false),
                    c4 = table.Column<int>(nullable: false),
                    c5 = table.Column<int>(nullable: false),
                    c6 = table.Column<int>(nullable: false),
                    c7 = table.Column<int>(nullable: false),
                    c8 = table.Column<int>(nullable: false),
                    c9 = table.Column<int>(nullable: false),
                    c10 = table.Column<int>(nullable: false),
                    c11 = table.Column<int>(nullable: false),
                    c12 = table.Column<int>(nullable: false),
                    c13 = table.Column<int>(nullable: false),
                    c14 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FPoints", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FPoints");
        }
    }
}
