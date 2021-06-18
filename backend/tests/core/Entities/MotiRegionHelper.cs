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
        /// Create a new instance of a MotiRegion.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        /// <returns></returns>
        public static Entity.MotiRegion CreateMotiRegion(int id, string name, bool isVisible = true)
        {
            return new Entity.MotiRegion(id, name, isVisible) { RowVersion = new byte[] { 12, 13, 14 } };
        }

        /// <summary>
        /// Create a new instance of a MotiRegion.
        /// </summary>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        /// <returns></returns>
        public static Entity.MotiRegion CreateMotiRegion(string name, bool isVisible = true)
        {
            return new Entity.MotiRegion(1, name, isVisible) { RowVersion = new byte[] { 12, 13, 14 } };
        }

        /// <summary>
        /// Creates a default list of MotiRegion.
        /// </summary>
        /// <returns></returns>
        public static List<Entity.MotiRegion> CreateDefaultMotiRegion()
        {
            return new List<Entity.MotiRegion>()
            {
                new Entity.MotiRegion(0, "Southern Interior") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiRegion(1, "Northern") { RowVersion = new byte[] { 12, 13, 14 } },
                new Entity.MotiRegion(2, "South Coast") { RowVersion = new byte[] { 12, 13, 14 } },
            };
        }
    }
}
