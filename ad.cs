using System;
using System.Collections.Generic;
using System.DirectoryServices;

class ActiveDirectorySearch
{
    public static List<Dictionary<string, string>> GetADUsers(string ldapFilter, string[] attributes)
    {
        // Set the domain path (this could be your LDAP path)
        string domainPath = "LDAP://yourdomain.com";
        var users = new List<Dictionary<string, string>>();

        using (DirectoryEntry entry = new DirectoryEntry(domainPath))
        {
            try
            {
                using (DirectorySearcher searcher = new DirectorySearcher(entry))
                {
                    searcher.Filter = ldapFilter;

                    // Add specified attributes to load
                    foreach (string attribute in attributes)
                    {
                        searcher.PropertiesToLoad.Add(attribute);
                    }

                    // Execute the search
                    SearchResultCollection results = searcher.FindAll();

                    // Iterate through the results and populate the list of user objects
                    foreach (SearchResult result in results)
                    {
                        var userObject = new Dictionary<string, string>();

                        foreach (string attribute in attributes)
                        {
                            userObject[attribute] = GetProperty(result, attribute);
                        }

                        users.Add(userObject);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }

        return users;
    }

    // Helper function to get property value safely
    private static string GetProperty(SearchResult searchResult, string propertyName)
    {
        if (searchResult.Properties.Contains(propertyName) && searchResult.Properties[propertyName].Count > 0)
        {
            return searchResult.Properties[propertyName][0].ToString();
        }
        return string.Empty;
    }

    static void Main(string[] args)
    {
        // Example usage
        string ldapFilter = "(&(objectClass=user)(sAMAccountName=j*))";
        string[] attributes = { "sAMAccountName", "displayName", "mail" };

        List<Dictionary<string, string>> users = GetADUsers(ldapFilter, attributes);

        // Print results
        foreach (var user in users)
        {
            foreach (var attribute in user)
            {
                Console.WriteLine($"{attribute.Key}: {attribute.Value}");
            }
            Console.WriteLine("----------------------------------");
        }
    }
}