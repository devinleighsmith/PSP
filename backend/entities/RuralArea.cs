namespace Pims.Dal.Entities
{
    /// <summary>
    /// RuralArea class, provides an entity for the datamodel to manage a list of rural areas.
    /// </summary>
    public class RuralArea : LookupEntity<int>
    {
        #region Properties
        /// <summary>
        /// get/set - Whether this purpose is generally visible.
        /// </summary>
        public bool IsVisible { get; set; }
        #endregion

        #region Constructors
        /// <summary>
        /// Create a new instance of a RuralArea class.
        /// </summary>
        public RuralArea() { }

        /// <summary>
        /// Create a new instance of a RuralArea class.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="isVisible"></param>
        public RuralArea(int id, string name, bool isVisible = true) : base(id, name)
        {
            this.IsVisible = isVisible;
        }
        #endregion
    }
}
