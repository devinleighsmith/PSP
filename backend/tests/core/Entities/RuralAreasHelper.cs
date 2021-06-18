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
        /// Create a new instance of a RuralArea.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        /// <returns></returns>
        public static Entity.RuralArea CreateRuralArea(int id, string name, bool isVisible = true)
        {
            return new Entity.RuralArea(id, name, isVisible) { RowVersion = new byte[] { 12, 13, 14 } };
        }

        /// <summary>
        /// Create a new instance of a RuralArea.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        /// <returns></returns>
        public static Entity.RuralArea CreateRuralArea(string name, bool isVisible = true)
        {
            return new Entity.RuralArea(1, name, isVisible) { RowVersion = new byte[] { 12, 13, 14 } };
        }

        /// <summary>
        /// Creates a default list of RuralArea.
        /// </summary>
        /// <returns></returns>
        public static List<Entity.RuralArea> CreateDefaultRuralArea()
        {
            return new List<Entity.RuralArea>()
            {
                new Entity.RuralArea(0, "Alberni Rural") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(1, "Ashcroft Rural") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(2, "Bella Coola Rural") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(3, "Campbell River Rural") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(4, "Central Okanagan Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(5, "Chilliwack Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(6, "Courtenay Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(7, "Cranbrook Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(8, "Creston Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(9, "Dawson Creek Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(10, "Duncan Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(11, "Fernie Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(12, "Fort Nelson Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(13, "Fort St. John Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(14, "Golden Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(15, "Grand Forks Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(16, "Gulf Islands Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(17, "Invermere Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(18, "Kamloops Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(19, "Lillooet Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(20, "Lower Mainland Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(21, "Maple Ridge Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(22, "Merritt Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(23, "Nakusp Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(24, "Nanaimo Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(25, "Nelson Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(26, "Oliver Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(27, "Penticton Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(28, "Port Hardy Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(29, "Powell River Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(30, "Prince George Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(31, "Prince Rupert Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(32, "Princeton Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(33, "Queen Charlotte Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(34, "Quesnel Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(35, "Revelstoke Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(36, "Salmon Arm Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(37, "Sechelt Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(38, "Smithers Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(39, "Squamish Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(40, "Terrace Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(41, "Trail Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(42, "Vanderhoof Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(43, "Vernon Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(44, "Victoria Rural", false) { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.RuralArea(45, "Williams Lake Rural", false) { RowVersion = new byte[] { 12, 13, 14 } }
            };
        }
    }
}
