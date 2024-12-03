namespace BAKERBAZZAR.API.Includes
{
    public static class SqlUtility
    {
        public static string DatabaseConnection = string.Empty;
        public static string ExecuteProcedureReturnString(string procName, params SqlParameter[] paramters)
        {
            string result = "";
            try
            {
                DateTime startime = DateTime.Now;
                using (var sqlConnection = new SqlConnection(DatabaseConnection))
                {
                    using (var command = sqlConnection.CreateCommand())
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.CommandText = procName;
                        if (paramters != null)
                        {
                            command.Parameters.AddRange(paramters);
                        }
                        sqlConnection.Open();
                        var ret = command.ExecuteScalar();
                        if (ret != null)
                            result = Convert.ToString(ret);
                        sqlConnection.Close();
                    }
                }
                var diff = DateTime.Now - startime;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return result;
        }

        public static DataTable ExecuteProcedureReturnTable(string procName, params SqlParameter[] paramters)
        {
            DataTable ReturnTbl = new DataTable();
            try
            {
                using (var sqlConnection = new SqlConnection(DatabaseConnection))
                {
                    using (var command = sqlConnection.CreateCommand())
                    {
                        command.CommandType = CommandType.StoredProcedure;
                        command.CommandText = procName;
                        if (paramters != null)
                        {
                            command.Parameters.AddRange(paramters);
                        }
                        sqlConnection.Open();
                        SqlDataAdapter da = new SqlDataAdapter();
                        da.SelectCommand = command;
                        da.Fill(ReturnTbl);
                        sqlConnection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return ReturnTbl;
        }

        public static List<T> ExecuteProcedureReturnObject<T>(string procName, params SqlParameter[] paramters)
        {
            DataTable ReturnTbl = new DataTable();
            try
            {
                ReturnTbl = ExecuteProcedureReturnTable(procName, paramters);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return ConvertToList<T>(ReturnTbl);
        }

        public static bool ExecuteProcedure(string procName,
           params SqlParameter[] paramters)
        {
            bool result = false;
            try
            {
                using (var sqlConnection = new SqlConnection(DatabaseConnection))
                {
                    using (var command = sqlConnection.CreateCommand())
                    {
                        command.CommandType = System.Data.CommandType.StoredProcedure;
                        command.CommandText = procName;
                        if (paramters != null)
                        {
                            command.Parameters.AddRange(paramters);
                        }
                        sqlConnection.Open();
                        int rows = command.ExecuteNonQuery();
                        result = rows > 0;
                        sqlConnection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return result;
        }

        public static TData ExecuteProcedureReturnData<TData>(string procName, Func<SqlDataReader, TData> translator, params SqlParameter[] parameters)
        {
            try
            {
                using (var sqlConnection = new SqlConnection(DatabaseConnection))
                {
                    using (var sqlCommand = sqlConnection.CreateCommand())
                    {
                        sqlCommand.CommandType = CommandType.StoredProcedure;
                        sqlCommand.CommandText = procName;
                        if (parameters != null)
                        {
                            sqlCommand.Parameters.AddRange(parameters);
                        }
                        sqlConnection.Open();
                        using (var reader = sqlCommand.ExecuteReader())
                        {
                            TData elements;
                            try
                            {
                                elements = translator(reader);
                            }
                            finally
                            {
                                while (reader.NextResult())
                                { }
                            }
                            return elements;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        static List<T> ConvertToList<T>(DataTable dt)
        {
            try
            {
                var columnNames = dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName.ToLower()).ToList();
                var properties = typeof(T).GetProperties();
                return dt.AsEnumerable().Select(row =>
                {
                    var objT = Activator.CreateInstance<T>();
                    foreach (var pro in properties)
                    {
                        if (columnNames.Contains(pro.Name.ToLower()))
                        {
                            try
                            {
                                pro.SetValue(objT, row[pro.Name]);
                            }
                            catch (Exception) { }
                        }
                    }
                    return objT;
                }).ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        static T? ConvertToModel<T>(DataTable dt)
        {
            try
            {
                var columnNames = dt.Columns.Cast<DataColumn>().Select(c => c.ColumnName.ToLower()).ToList();
                var properties = typeof(T).GetProperties();
                return dt.AsEnumerable().Select(row =>
                {
                    var objT = Activator.CreateInstance<T>();
                    foreach (var pro in properties)
                    {
                        if (columnNames.Contains(pro.Name.ToLower()))
                        {
                            try
                            {
                                pro.SetValue(objT, row[pro.Name]);
                            }
                            catch (Exception) { }
                        }
                    }
                    return objT;
                }).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public static string? GetNullableString(SqlDataReader reader, string colName)
        {
            return reader.IsDBNull(reader.GetOrdinal(colName)) ? null : Convert.ToString(reader[colName]);
        }

        public static int GetNullableInt32(SqlDataReader reader, string colName)
        {
            return reader.IsDBNull(reader.GetOrdinal(colName)) ? 0 : Convert.ToInt32(reader[colName]);
        }

        public static bool GetBoolean(SqlDataReader reader, string colName)
        {
            return reader.IsDBNull(reader.GetOrdinal(colName)) ? default(bool) : Convert.ToBoolean(reader[colName]);
        }

        public static bool IsColumnExists(this System.Data.IDataRecord dr, string colName)
        {
            try
            {
                return (dr.GetOrdinal(colName) >= 0);
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
