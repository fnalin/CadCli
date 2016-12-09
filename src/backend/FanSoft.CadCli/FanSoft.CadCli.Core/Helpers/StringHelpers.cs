namespace FanSoft.CadCli.Core.Helpers
{
    public class StringHelpers
    {
        public static string Encrypt(string texto)
        {
            if (string.IsNullOrEmpty(texto))
                return "";

            texto += "|cf27eb87-1204-407e-b76c-7a865832f842";
            var md5 = System.Security.Cryptography.MD5.Create();
            var data = md5.ComputeHash(System.Text.Encoding.GetEncoding(0).GetBytes(texto));
            var sbString = new System.Text.StringBuilder();
            for (int i = 0; i < data.Length; i++)
                sbString.Append(data[i].ToString("x2"));
            return sbString.ToString();
        }

    }
}
