using System.Collections.Generic;
using Entity = Pims.Dal.Entities;

namespace Pims.Core.Test
{
    /// <summary>
    /// EntityHelper static class, provides helper methods to create test entities.
    /// </summary>
    public static partial class EntityHelper
    {
        /// <summary>
        /// Create a new instance of a Purpose.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        /// <returns></returns>
        public static Entity.Purpose CreatePurpose(int id, string name, bool isVisible = true)
        {
            return new Entity.Purpose(id, name, isVisible) { RowVersion = new byte[] { 12, 13, 14 } };
        }

        /// <summary>
        /// Create a new instance of a Purpose.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        /// <returns></returns>
        public static Entity.Purpose CreatePurpose(string name, bool isVisible = true)
        {
            return new Entity.Purpose(1, name, isVisible) { RowVersion = new byte[] { 12, 13, 14 } };
        }

        /// <summary>
        /// Creates a default list of Purpose.
        /// </summary>
        /// <returns></returns>
        public static List<Entity.Purpose> CreateDefaultPurpose()
        {
            return new List<Entity.Purpose>()
            {
                new Entity.Purpose(0, "Partial Acquisition") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(1, "Total Acquisition") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(2, "Licenses, Leases, and Statutory' Rights-of-way [SRW]") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(3, "Licenses") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(4, "Stockpile License", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(5, "Slope License", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(6, "License for Construction", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(7, "Gravel Pit Leases", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(8, "Other Leases", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.Purpose(9, "Statutory Rights-of-Way", false) { RowVersion = new byte[] { 12, 13, 14 } }
            };
        }
    }
}
