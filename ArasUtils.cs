using Innovator.Client;
using Innovator.Client.QueryModel;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System.Runtime.CompilerServices;
using System.Security.Cryptography;
using System.Text;
using System.Web.Helpers;

namespace ArasMicroService
{
    public class ArasUtils
    {
        public string salt { get; } = "892a155fbdb54f329d22a797615a9705"; // random salt
        public static string EncryptString(string password)
        {
            // Convert the plaintext string to a byte array
            byte[] plaintextBytes = System.Text.Encoding.UTF8.GetBytes(password);

            // Derive a new password using the PBKDF2 algorithm and a random salt
            Rfc2898DeriveBytes passwordBytes = new Rfc2898DeriveBytes(ArasUtils.Instance.salt, 20);

            // Use the password to encrypt the plaintext
            Aes encryptor = Aes.Create();
            encryptor.Key = passwordBytes.GetBytes(32);
            encryptor.IV = passwordBytes.GetBytes(16);
            using (MemoryStream ms = new MemoryStream())
            {
                using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(plaintextBytes, 0, plaintextBytes.Length);
                }
                return Convert.ToBase64String(ms.ToArray());
            }
        }
        public static string DecryptString(string encryptedpassword)
        {
            // Convert the encrypted string to a byte array
            byte[] encryptedBytes = Convert.FromBase64String(encryptedpassword);

            // Derive the password using the PBKDF2 algorithm
            Rfc2898DeriveBytes passwordBytes = new Rfc2898DeriveBytes(ArasUtils.Instance.salt,20);

            // Use the password to decrypt the encrypted string
            Aes encryptor = Aes.Create();
            encryptor.Key = passwordBytes.GetBytes(32);
            encryptor.IV = passwordBytes.GetBytes(16);
            using (MemoryStream ms = new MemoryStream())
            {
                using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(encryptedBytes, 0, encryptedBytes.Length);
                }
                return System.Text.Encoding.UTF8.GetString(ms.ToArray());
            }
        }

        public static ArasUtils Instance { get; } = new ArasUtils();
        public IDistributedCache _redisCache { get; set; } = null;
        public IRemoteConnection getLoginConnection(string username, string password, string hostname, string database,string connection)
        {
            
            IRemoteConnection conn = null;

           
            UserConnnection userConnnection = new UserConnnection();
            userConnnection.hostname = hostname;
            userConnnection.database = database;
            userConnnection.connection = connection;
            userConnnection.password = password;
            userConnnection.username = username;

            string key = username;
            string userDetails = String.Empty;
            UserConnnection details = null;
            byte[] value = this._redisCache.Get(key);
            if (value == null)
            {
                string usrcon = JsonConvert.SerializeObject(userConnnection);

                this._redisCache.Set(key, Encoding.UTF8.GetBytes(usrcon));
                details = userConnnection;
            }
            else
            {
                userDetails = Encoding.UTF8.GetString(value);
                
                details = JsonConvert.DeserializeObject<UserConnnection>(userDetails);
            }
          
            

          
            try
            {
                conn = Factory.GetConnection($"http://{details.hostname}/InnovatorServer/Server/InnovatorServer.aspx", details.connection);

                conn.Login(new ExplicitCredentials(details.database, details.username, details.password));

            }
            catch (Exception e)
            {
                throw e;

            }
            return conn;
        }
        public IRemoteConnection GetRemoteConnection(string username)
        {
            UserConnnection details =  this.GetUserConnectionFromRedis(username);
            IRemoteConnection conn = null;

            try
            {
                conn = Factory.GetConnection($"http://{details.hostname}/InnovatorServer/Server/InnovatorServer.aspx", details.connection);

                conn.Login(new ExplicitCredentials(details.database, details.username, details.password));

            }
            catch (Exception e)
            {
                throw e;

            }
            return conn; 
        }
        private UserConnnection GetUserConnectionFromRedis(string username)
        {
            UserConnnection connection = null;


            string key = username;

            string userDetails = String.Empty;

            UserConnnection details = null;

            byte[] value = this._redisCache.Get(key);
            if (value == null)
            {
                connection = null;
            }
            else
            {
                userDetails = Encoding.UTF8.GetString(value);
                connection = JsonConvert.DeserializeObject<UserConnnection>(userDetails);
            }

            return connection;
        }

    }
}
