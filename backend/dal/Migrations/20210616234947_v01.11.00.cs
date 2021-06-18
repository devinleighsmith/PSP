using System;
using Pims.Dal.Helpers.Migrations;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Pims.Dal.Migrations
{
    public partial class v011100 : SeedMigration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            PreUp(migrationBuilder);
            migrationBuilder.CreateTable(
                name: "MotiClassifications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "DATETIME2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedOn = table.Column<DateTime>(type: "DATETIME2", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MotiClassifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MotiClassifications_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MotiClassifications_Users_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "MotiRegions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "DATETIME2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedOn = table.Column<DateTime>(type: "DATETIME2", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MotiRegions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MotiRegions_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MotiRegions_Users_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Purposes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "DATETIME2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedOn = table.Column<DateTime>(type: "DATETIME2", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Purposes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Purposes_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Purposes_Users_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RuralAreas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    IsVisible = table.Column<bool>(type: "bit", nullable: false),
                    CreatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedOn = table.Column<DateTime>(type: "DATETIME2", nullable: false, defaultValueSql: "GETUTCDATE()"),
                    UpdatedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UpdatedOn = table.Column<DateTime>(type: "DATETIME2", nullable: true),
                    RowVersion = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    IsDisabled = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RuralAreas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RuralAreas_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RuralAreas_Users_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MotiClassifications_CreatedById",
                table: "MotiClassifications",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_MotiClassifications_IsDisabled_Name",
                table: "MotiClassifications",
                columns: new[] { "IsDisabled", "Name" });

            migrationBuilder.CreateIndex(
                name: "IX_MotiClassifications_Name",
                table: "MotiClassifications",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MotiClassifications_UpdatedById",
                table: "MotiClassifications",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_MotiRegions_CreatedById",
                table: "MotiRegions",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_MotiRegions_IsDisabled_Name",
                table: "MotiRegions",
                columns: new[] { "IsDisabled", "Name" });

            migrationBuilder.CreateIndex(
                name: "IX_MotiRegions_Name",
                table: "MotiRegions",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MotiRegions_UpdatedById",
                table: "MotiRegions",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Purposes_CreatedById",
                table: "Purposes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Purposes_IsDisabled_Name",
                table: "Purposes",
                columns: new[] { "IsDisabled", "Name" });

            migrationBuilder.CreateIndex(
                name: "IX_Purposes_Name",
                table: "Purposes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Purposes_UpdatedById",
                table: "Purposes",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_RuralAreas_CreatedById",
                table: "RuralAreas",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_RuralAreas_IsDisabled_Name",
                table: "RuralAreas",
                columns: new[] { "IsDisabled", "Name" });

            migrationBuilder.CreateIndex(
                name: "IX_RuralAreas_Name",
                table: "RuralAreas",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RuralAreas_UpdatedById",
                table: "RuralAreas",
                column: "UpdatedById");
            PostUp(migrationBuilder);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            PreDown(migrationBuilder);
            migrationBuilder.DropTable(
                name: "MotiClassifications");

            migrationBuilder.DropTable(
                name: "MotiRegions");

            migrationBuilder.DropTable(
                name: "Purposes");

            migrationBuilder.DropTable(
                name: "RuralAreas");
            PostDown(migrationBuilder);
        }
    }
}
