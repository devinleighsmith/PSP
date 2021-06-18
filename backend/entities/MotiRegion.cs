namespace Pims.Dal.Entities
{
    /// <summary>
    /// MotiRegion class, provides an entity for the datamodel to manage a list of moti regions.
    /// </summary>
    public class MotiRegion : LookupEntity<int>
    {
        #region Properties
        /// <summary>
        /// get/set - Whether this classification is generally visible.
        /// </summary>
        public bool IsVisible { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Create a new instance of a MotiRegion class.
        /// </summary>
        public MotiRegion() { }

        /// <summary>
        /// Create a new instance of a MotiRegion class.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        public MotiRegion(int id, string name, bool isVisible = true) : base(id, name)
        {
            this.IsVisible = isVisible;
        }
        #endregion
    }
}
