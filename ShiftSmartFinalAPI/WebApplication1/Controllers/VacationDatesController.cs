using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/vacationdates")]
    [ApiController]
    public class VacationDatesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public VacationDatesController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                SELECT 20 - COUNT(date) AS date
                FROM vacationdates
                WHERE user_id = 1;";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();

                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(VacationDatesModel vDates)
        {
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmployeeAppCon");

            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();

                string checkUserQuery = @"SELECT COUNT(*) FROM vacationdates WHERE user_id = 1";
                using (NpgsqlCommand checkUserCommand = new NpgsqlCommand(checkUserQuery, myCon))
                {
                    int userCount = Convert.ToInt32(checkUserCommand.ExecuteScalar());
                    if (userCount >= 20)
                    {
                        return new JsonResult("There are no more vacation days available.");
                    }
                }

                string checkDateQuery = @"SELECT COUNT(*) FROM vacationdates WHERE user_id = @user_id AND date = @date";


                using (NpgsqlCommand checkDateCommand = new NpgsqlCommand(checkDateQuery, myCon))
                {
                    checkDateCommand.Parameters.AddWithValue("@date", vDates.date);
                    checkDateCommand.Parameters.AddWithValue("@user_id", vDates.user_id);

                    int dateCount = Convert.ToInt32(checkDateCommand.ExecuteScalar());
                    if (dateCount > 0)
                    {
                        return new JsonResult("That vacation date is not available to be scheduled.");
                    }
                }

                string insertQuery = @"INSERT INTO vacationdates (user_id, date, reason)
                                VALUES (@user_id, @date, @reason)";
                using (NpgsqlCommand myCommand = new NpgsqlCommand(insertQuery, myCon))
                {
                    myCommand.Parameters.AddWithValue("@user_id", vDates.user_id);
                    myCommand.Parameters.AddWithValue("@date", vDates.date);
                    myCommand.Parameters.AddWithValue("@reason", vDates.reason);

                    myCommand.ExecuteNonQuery();
                }
            }

            return new JsonResult("Added Successfully");
        }
    }
}
