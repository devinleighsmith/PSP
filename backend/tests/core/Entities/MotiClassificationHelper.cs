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
        /// Create a new instance of a MotiClassification.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        /// <returns></returns>
        public static Entity.MotiClassification CreateMotiClassification(int id, string name, bool isVisible = true)
        {
            return new Entity.MotiClassification(id, name, isVisible) { RowVersion = new byte[] { 12, 13, 14 } };
        }

        /// <summary>
        /// Create a new instance of a MotiClassification.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        /// <returns></returns>
        public static Entity.MotiClassification CreateMotiClassification(string name, bool isVisible = true)
        {
            return new Entity.MotiClassification(1, name, isVisible) { RowVersion = new byte[] { 12, 13, 14 } };
        }

        /// <summary>
        /// Creates a default list of MotiClassification.
        /// </summary>
        /// <returns></returns>
        public static List<Entity.MotiClassification> CreateDefaultMotiClassification()
        {
            return new List<Entity.MotiClassification>()
            {
                new Entity.MotiClassification(0, "Absol Fee") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(1, "Crown - Fed") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(2, "Crown - Prov") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(3, "Easement") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(4, "Fee Simple", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(5, "Forest Service Rd", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(6, "Land Act (Tube) Plan", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(7, "Lease", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(8, "Licence", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(9, "Map Reserve", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(10, "Muni Road", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(11, "Other", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(12, "Park", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(13, "Park Reserve", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(14, "Pp Hwy", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(15, "Private Rd", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(16, "Public Rd", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(17, "Registered Interest", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(18, "Restrictive Covenant", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(19, "Sec 12", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(20, "Sec 14 (Repealed 2015)", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(21, "Sec 16", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(22, "Sec 16 - Ferry Terminal", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(23, "Sec 16 - Gravel Pit", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(24, "Sec 16 - Road", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(25, "Sec 17", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(26, "Sec 17 Sec 12", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(27, "Srw", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(28, "Strata", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(29, "Treaty", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(30, "Unregistered Interest", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(31, "Volumetric", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(32, "Water Lot", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiClassification(33, "Water Rights", false) { RowVersion = new byte[] { 12, 13, 14 } }
            };
        }
    }
}
