using System.Data;
using Microsoft.Extensions.Configuration;
using Npgsql;
using WebApplication1.Models;

namespace WebApplication1.Models
{
    public class AppDbContext
    {
        private readonly string _connectionString;

        public AppDbContext(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public void RegisterUser(User user)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                using (var command = new NpgsqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "INSERT INTO Users (Email, Password) VALUES (@Email, @Password)";
                    command.Parameters.AddWithValue("Email", user.Email);
                    command.Parameters.AddWithValue("Password", user.Password);

                    connection.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        public User GetUserByEmail(string email)
        {
            User existingUser = null;

            using (var connection = new NpgsqlConnection(_connectionString))
            {
                using (var command = new NpgsqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = "SELECT * FROM Users WHERE Email = @Email";
                    command.Parameters.AddWithValue("Email", email);

                    connection.Open();

                    using (var reader = command.ExecuteReader(CommandBehavior.SingleRow))
                    {
                        if (reader.Read())
                        {
                            existingUser = new User
                            {
                                Id = (int)reader["Id"],
                                Email = (string)reader["Email"],
                                Password = (string)reader["Password"]
                            };
                        }
                    }
                }
            }

            return existingUser;
        }
    }
}