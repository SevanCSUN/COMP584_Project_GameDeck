using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using GameDeckModel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<GameDeckContext>(options =>
{   
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")); 
});

builder.Services.AddIdentity<GameDeckUsers, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
})
.AddEntityFrameworkStores<GameDeckContext>();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(c =>
{
    c.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    c.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(c =>
{
    // Auth0-issued access tokens (RS256 via JWKS)
    c.Authority = $"https://{builder.Configuration["Auth0:Domain"]}/";
    c.Audience = builder.Configuration["Auth0:Audience"];
});

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "GameDeck API", Version = "v1" });
    OpenApiSecurityScheme securityScheme = new()
    {
        Name = "GameDeck Authentication",
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter JWT Bearer token **_only_**",
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = JwtBearerDefaults.AuthenticationScheme

        }
    };
    c.AddSecurityDefinition(JwtBearerDefaults.AuthenticationScheme, securityScheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { securityScheme, Array.Empty<string>() }
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "GameDeck API V1");

});
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors(options => options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
