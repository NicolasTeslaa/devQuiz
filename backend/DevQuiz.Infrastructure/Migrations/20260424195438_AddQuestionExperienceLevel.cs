using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DevQuiz.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddQuestionExperienceLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExperienceLevel",
                table: "questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_questions_ExperienceLevel",
                table: "questions",
                column: "ExperienceLevel");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_questions_ExperienceLevel",
                table: "questions");

            migrationBuilder.DropColumn(
                name: "ExperienceLevel",
                table: "questions");
        }
    }
}
