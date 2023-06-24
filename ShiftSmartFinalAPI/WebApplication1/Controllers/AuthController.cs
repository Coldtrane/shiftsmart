

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Data;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace MyProjectName.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("EmployeeAppCon")))
            {
                var query = @"
                    INSERT INTO Users (Email, Password)
                    VALUES (@Email, @Password)
                ";

                var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@Password", user.Password);

                connection.Open();
                command.ExecuteNonQuery();
            }

            return Ok("Registration successful");
        }

        [HttpPost("login")]
        public IActionResult Login(User user)
        {
            using (var connection = new NpgsqlConnection(_configuration.GetConnectionString("EmployeeAppCon")))
            {
                var query = @"
                    SELECT COUNT(*) FROM Users WHERE Email = @Email AND Password = @Password
                ";

                var command = new NpgsqlCommand(query, connection);
                command.Parameters.AddWithValue("@Email", user.Email);
                command.Parameters.AddWithValue("@Password", user.Password);

                connection.Open();
                var result = Convert.ToInt32(command.ExecuteScalar());

                if (result == 1)
                {
                    return Ok("Login successful");
                }
                else
                {
                    return Unauthorized("Invalid credentials");
                }
            }
        }
    }
}