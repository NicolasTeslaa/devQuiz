using System.Text;
using DevQuiz.Application.Interfaces;
using DevQuiz.Infrastructure.Auth;
using DevQuiz.Infrastructure.Data;
using DevQuiz.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace DevQuiz.Infrastructure.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("MySql")
            ?? "server=localhost;port=3306;database=devquiz;user=root;password=root";

        services.AddDbContext<AppDbContext>(options =>
            options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<ITechnologyService, TechnologyService>();
        services.AddScoped<IQuizService, QuizService>();
        services.AddSingleton<IPasswordHasher, BCryptPasswordHasher>();
        services.AddSingleton<ITokenService, JwtTokenService>();

        var key = configuration["Jwt:Key"] ?? "super-secret-jwt-key-change-this-in-production";
        var issuer = configuration["Jwt:Issuer"] ?? "DevQuiz";
        var audience = configuration["Jwt:Audience"] ?? "DevQuiz.Frontend";

        services
            .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = issuer,
                    ValidAudience = audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
                };
            });

        services.AddAuthorization();

        return services;
    }
}
