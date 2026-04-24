using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevQuiz.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionTechnologyRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "TechnologyId",
                table: "questions",
                type: "char(36)",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_questions_TechnologyId",
                table: "questions",
                column: "TechnologyId");

            migrationBuilder.AddForeignKey(
                name: "FK_questions_technologies_TechnologyId",
                table: "questions",
                column: "TechnologyId",
                principalTable: "technologies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_questions_technologies_TechnologyId",
                table: "questions");

            migrationBuilder.DropIndex(
                name: "IX_questions_TechnologyId",
                table: "questions");

            migrationBuilder.DropColumn(
                name: "TechnologyId",
                table: "questions");
        }
    }
}
